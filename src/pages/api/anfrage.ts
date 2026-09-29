// Nimmt Anfragen aus dem Probestunden-Formular an und schickt sie per
// E-Mail an info@lernstabil.de. Die Eltern bekommen an ihre
// E-Mail-Adresse (Pflichtfeld) eine Eingangsbestaetigung (Vorlagen in
// src/mail/). Die einzige Adresse der Seite, die auf dem Server laeuft
// (siehe astro.config.mjs).
//
// Zwei Arten von Aufrufen:
// - Mit JavaScript schickt das Formular per fetch und will JSON zurueck
//   (Accept: application/json). Fehler je Feld kommen als JSON.
// - Ohne JavaScript ist es ein normales Absenden. Dann leitet die
//   Adresse weiter: bei Erfolg auf /danke, sonst auf /anfrage-fehler —
//   die Browser-Pruefung (required, type=tel) faengt das meiste vorher
//   ab.
//
// SPAM-SCHUTZ ohne Captcha (jede Huerde kostet Anfragen). Am
// 28. September 2026 nach einer Sicherheitspruefung verschaerft:
// - Honigtopf: Das Feld „website" ist fuer Menschen unsichtbar. Wer es
//   fuellt, ist ein Bot.
// - Zeitpruefung: Das Formular-Skript setzt beim Oeffnen einen
//   Zeitstempel. Mit JavaScript (Accept: application/json) muss er da
//   sein und zwischen 3 Sekunden und 24 Stunden alt sein — vorher liess
//   er sich durch Weglassen umgehen. Ohne JavaScript fehlt er; die
//   Anfrage kommt trotzdem an, nur ohne Eingangsbestaetigung.
// - Mengenbegrenzung: hoechstens 5 gueltige Anfragen je IP in 10
//   Minuten. Die IP liegt dafuer nur im Arbeitsspeicher und verfaellt
//   nach 10 Minuten (steht so in der Datenschutzerklaerung, 3 b).
// - Obergrenzen fuer alle zusammen: hoechstens 30 Benachrichtigungen und
//   20 Bestaetigungen je Stunde, dieselbe Adresse hoechstens eine
//   Bestaetigung in 24 Stunden. Sonst liesse sich ueber das Formular
//   fremde Postfaecher mit Mails von info@ fluten — das schadet dem Ruf
//   der Domain bei den Mailanbietern.
// - Vorname nur aus Buchstaben, Leerzeichen, Bindestrich, Apostroph,
//   Punkt: Er steht in Betreff und Bestaetigung und darf keinen Link
//   oder HTML transportieren.
// Bots bekommen eine Erfolgsmeldung, damit sie nicht nachbessern.

import type { APIRoute } from "astro";
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from "astro:env/server";
import nodemailer from "nodemailer";
import { email } from "../../data/kontakt";
import { alleFaecher, klassen, zeiten } from "../../data/probestunde";
import { benachrichtigung } from "../../mail/benachrichtigung";
import { bestaetigung } from "../../mail/bestaetigung";

export const prerender = false;

const MINDESTZEIT_MS = 3000;
const HOECHSTALTER_MS = 24 * 60 * 60 * 1000;
const LIMIT = 5;
const FENSTER_MS = 10 * 60 * 1000;
const STUNDE_MS = 60 * 60 * 1000;
const MAX_BENACHRICHTIGUNGEN_JE_STUNDE = 30;
const MAX_BESTAETIGUNGEN_JE_STUNDE = 20;
// Obergrenze fuer die Tabellen im Arbeitsspeicher. Mit gefaelschten
// Adressen liessen sie sich sonst beliebig fuellen.
const MAX_EINTRAEGE = 5000;

const zugriffe = new Map<string, number[]>();
const benachrichtigt: number[] = [];
const bestaetigt: number[] = [];
const bestaetigtAn = new Map<string, number>();

// Die Besucher-IP haengt der Proxy von mittwald als LETZTEN Eintrag an
// X-Forwarded-For an. Den ersten Eintrag setzt der Absender selbst —
// wer ihn bei jeder Anfrage aendert, umginge sonst die Begrenzung.
function besucherIp(request: Request, clientAddress: string): string {
  const kette = (request.headers.get("x-forwarded-for") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return (kette.at(-1) || clientAddress).slice(0, 45);
}

function zuVieleAnfragen(ip: string): boolean {
  const jetzt = Date.now();
  const frisch = (zugriffe.get(ip) ?? []).filter((t) => jetzt - t < FENSTER_MS);
  frisch.push(jetzt);
  zugriffe.set(ip, frisch);
  // Aufraeumen: abgelaufene IPs raus, und nie mehr als MAX_EINTRAEGE.
  if (zugriffe.size > MAX_EINTRAEGE) {
    for (const [schluessel, zeitpunkte] of zugriffe) {
      if (zeitpunkte.every((t) => jetzt - t >= FENSTER_MS)) zugriffe.delete(schluessel);
    }
    if (zugriffe.size > MAX_EINTRAEGE) zugriffe.clear();
  }
  return frisch.length > LIMIT;
}

/** Zaehlt einen Versand in einem Stundenfenster; false, wenn voll. */
function imStundenlimit(liste: number[], max: number): boolean {
  const jetzt = Date.now();
  while (liste.length && jetzt - liste[0] > STUNDE_MS) liste.shift();
  if (liste.length >= max) return false;
  liste.push(jetzt);
  return true;
}

/** Hoechstens eine Bestaetigung je Adresse in 24 Stunden. */
function adresseFrei(mail: string): boolean {
  const jetzt = Date.now();
  const schluessel = mail.toLowerCase();
  if (jetzt - (bestaetigtAn.get(schluessel) ?? 0) < HOECHSTALTER_MS) return false;
  if (bestaetigtAn.size > MAX_EINTRAEGE) bestaetigtAn.clear();
  bestaetigtAn.set(schluessel, jetzt);
  return true;
}

type Fehler = Record<string, string>;

function antwort(request: Request, status: number, fehler?: Fehler): Response {
  const willJson = request.headers.get("accept")?.includes("application/json");
  if (willJson) {
    return Response.json(fehler ? { ok: false, fehler } : { ok: true }, { status });
  }
  // Relative Weiterleitung: Hinter dem Proxy von mittwald kennt der
  // Server seinen oeffentlichen Hostnamen nicht zuverlaessig.
  return new Response(null, {
    status: 303,
    headers: { Location: fehler ? "/anfrage-fehler" : "/danke" },
  });
}

// Zeilenumbrueche raus: Die Werte landen im Betreff einer E-Mail.
function einzeilig(wert: FormDataEntryValue | null, max: number): string {
  return String(wert ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

// Buchstaben aller Sprachen, Leerzeichen, Bindestrich, Apostroph, Punkt.
const VORNAME = /^\p{L}[\p{L}\p{M} .'’-]*$/u;
// Streng: keine Anzeigenamen („Text <adresse>"), genau eine Adresse.
const EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function pruefen(daten: FormData) {
  const fehler: Fehler = {};

  const fach = einzeilig(daten.get("fach"), 60);
  const fachAnderes = einzeilig(daten.get("fach_anderes"), 60);
  const gewaehltesFach = fach === "Anderes Fach" ? fachAnderes : fach;
  if (!alleFaecher.includes(gewaehltesFach)) fehler.fach = "Bitte wählen Sie ein Fach.";

  const klasse = einzeilig(daten.get("klasse"), 40);
  if (!klassen.some((k) => k.wert === klasse)) fehler.klasse = "Bitte wählen Sie die Klasse.";

  const vorname = einzeilig(daten.get("vorname"), 60);
  if (!vorname) fehler.vorname = "Bitte geben Sie Ihren Vornamen an.";
  else if (!VORNAME.test(vorname)) {
    fehler.vorname = "Bitte geben Sie nur Ihren Vornamen an, ohne Ziffern oder Zeichen.";
  }

  // E-Mail Pflicht, Telefon freiwillig (seit 29. September 2026).
  const mail = einzeilig(daten.get("email"), 120);
  if (!mail) fehler.email = "Bitte geben Sie Ihre E-Mail-Adresse an.";
  else if (!EMAIL.test(mail)) {
    fehler.email = "Diese E-Mail-Adresse sieht nicht vollständig aus.";
  }

  const telefon = einzeilig(daten.get("telefon"), 30);
  const ziffern = telefon.replace(/\D/g, "").length;
  if (telefon && (!/^[0-9+()/.\s-]+$/.test(telefon) || ziffern < 6)) {
    fehler.telefon = "Diese Telefonnummer sieht nicht vollständig aus.";
  }

  // Doppelte raus: Sonst liesse sich die Mail mit Wiederholungen aufblaehen.
  const erreichbar = [
    ...new Set(
      daten
        .getAll("zeiten")
        .map((z) => String(z))
        .filter((z) => zeiten.includes(z)),
    ),
  ];

  return { fehler, werte: { fach: gewaehltesFach, klasse, vorname, telefon, mail, erreichbar } };
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let daten: FormData;
  try {
    daten = await request.formData();
  } catch {
    return antwort(request, 400, { formular: "Die Anfrage war unvollständig." });
  }

  // Honigtopf und Zeitpruefung: still „Erfolg" melden.
  if (einzeilig(daten.get("website"), 200)) return antwort(request, 200);
  const mitSkript = request.headers.get("accept")?.includes("application/json") ?? false;
  const start = Number(daten.get("t"));
  const alter = Date.now() - start;
  const zeitGueltig = Number.isFinite(start) && alter >= MINDESTZEIT_MS && alter <= HOECHSTALTER_MS;
  if (mitSkript && !zeitGueltig) return antwort(request, 200);
  if (start && alter < MINDESTZEIT_MS) return antwort(request, 200);

  const { fehler, werte } = pruefen(daten);
  if (Object.keys(fehler).length) return antwort(request, 400, fehler);

  // Erst nach der Pruefung zaehlen: Wer ohne Skript ein paar Mal ein
  // Feld falsch ausfuellt, soll dadurch nicht gesperrt werden.
  if (zuVieleAnfragen(besucherIp(request, clientAddress))) {
    return antwort(request, 429, {
      formular: "Es kamen gerade sehr viele Anfragen. Bitte rufen Sie uns an.",
    });
  }
  if (!imStundenlimit(benachrichtigt, MAX_BENACHRICHTIGUNGEN_JE_STUNDE)) {
    console.error("[anfrage] Stundenlimit fuer Benachrichtigungen erreicht.");
    return antwort(request, 429, {
      formular: "Es kamen gerade sehr viele Anfragen. Bitte rufen Sie uns an.",
    });
  }

  const intern = benachrichtigung(werte, new Date());
  // Bestaetigung nur mit gueltigem Zeitstempel (also mit Skript), nur
  // einmal je Adresse in 24 Stunden und innerhalb der Stundengrenze.
  const eltern =
    werte.mail &&
    zeitGueltig &&
    adresseFrei(werte.mail) &&
    imStundenlimit(bestaetigt, MAX_BESTAETIGUNGEN_JE_STUNDE)
      ? bestaetigung(werte)
      : null;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    if (import.meta.env.DEV) {
      console.log(
        `\n[anfrage] Kein SMTP eingerichtet — nur Ausgabe:\n${intern.betreff}\n\n${intern.text}\n` +
          (eltern ? `\n[anfrage] Bestätigung an ${werte.mail}:\n${eltern.betreff}\n` : ""),
      );
      return antwort(request, 200);
    }
    console.error("[anfrage] SMTP_HOST, SMTP_USER oder SMTP_PASS fehlt.");
    return antwort(request, 500, { formular: "versand" });
  }

  const port = Number(SMTP_PORT) || 465;
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  // Erst die Benachrichtigung an uns: Scheitert sie, darf keine
  // Bestaetigung rausgehen — sonst glauben die Eltern, die Anfrage sei
  // angekommen, und wir wissen nichts davon.
  try {
    await transport.sendMail({
      from: `"#Lernstabil Website" <${SMTP_USER}>`,
      to: email.anzeige,
      replyTo: werte.mail || undefined,
      subject: intern.betreff,
      text: intern.text,
      html: intern.html,
    });
  } catch (e) {
    console.error("[anfrage] Versand fehlgeschlagen:", e);
    return antwort(request, 500, { formular: "versand" });
  }

  // Die Bestaetigung ist ein Zusatz. Scheitert sie (etwa an einer
  // vertippten Adresse), ist die Anfrage trotzdem bei uns — also Erfolg
  // melden und den Fehler nur protokollieren.
  if (eltern) {
    try {
      await transport.sendMail({
        from: `"#Lernstabil" <${SMTP_USER}>`,
        to: werte.mail,
        subject: eltern.betreff,
        text: eltern.text,
        html: eltern.html,
      });
    } catch (e) {
      console.error("[anfrage] Bestätigung an die Eltern fehlgeschlagen:", e);
    }
  }

  return antwort(request, 200);
};
