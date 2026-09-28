// Nimmt Anfragen aus dem Probestunden-Formular an und schickt sie per
// E-Mail an info@lernstabil.de. Die einzige Adresse der Seite, die auf
// dem Server laeuft (siehe astro.config.mjs).
//
// Zwei Arten von Aufrufen:
// - Mit JavaScript schickt das Formular per fetch und will JSON zurueck
//   (Accept: application/json). Fehler je Feld kommen als JSON.
// - Ohne JavaScript ist es ein normales Absenden. Dann leitet die
//   Adresse weiter: bei Erfolg auf /danke, sonst auf /anfrage-fehler —
//   die Browser-Pruefung (required, type=tel) faengt das meiste vorher
//   ab.
//
// SPAM-SCHUTZ ohne Captcha (jede Huerde kostet Anfragen):
// - Honigtopf: Das Feld „website" ist fuer Menschen unsichtbar. Wer es
//   fuellt, ist ein Bot.
// - Zeitpruefung: Das Formular-Skript setzt beim Oeffnen einen
//   Zeitstempel. Unter drei Sekunden bis zum Absenden schafft kein
//   Mensch drei Schritte. Ohne JavaScript fehlt der Stempel, dann
//   entfaellt die Pruefung.
// - Mengenbegrenzung: hoechstens 5 Anfragen je IP in 10 Minuten. Die IP
//   liegt dafuer nur im Arbeitsspeicher und verfaellt nach 10 Minuten
//   (steht so in der Datenschutzerklaerung, Abschnitt 3 b).
// Bots bekommen eine Erfolgsmeldung, damit sie nicht nachbessern.

import type { APIRoute } from "astro";
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from "astro:env/server";
import nodemailer from "nodemailer";
import { email } from "../../data/kontakt";
import { alleFaecher, klassen, zeiten } from "../../data/probestunde";

export const prerender = false;

const MINDESTZEIT_MS = 3000;
const LIMIT = 5;
const FENSTER_MS = 10 * 60 * 1000;

const zugriffe = new Map<string, number[]>();

function zuVieleAnfragen(ip: string): boolean {
  const jetzt = Date.now();
  const frisch = (zugriffe.get(ip) ?? []).filter((t) => jetzt - t < FENSTER_MS);
  frisch.push(jetzt);
  zugriffe.set(ip, frisch);
  // Aufraeumen, damit die Liste nicht waechst: abgelaufene IPs raus.
  if (zugriffe.size > 1000) {
    for (const [schluessel, zeitpunkte] of zugriffe) {
      if (zeitpunkte.every((t) => jetzt - t >= FENSTER_MS)) zugriffe.delete(schluessel);
    }
  }
  return frisch.length > LIMIT;
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

  const telefon = einzeilig(daten.get("telefon"), 30);
  const ziffern = telefon.replace(/\D/g, "").length;
  if (!/^[0-9+()/.\s-]+$/.test(telefon) || ziffern < 6) {
    fehler.telefon = "Bitte geben Sie eine Telefonnummer an, unter der wir Sie erreichen.";
  }

  const mail = einzeilig(daten.get("email"), 120);
  if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
    fehler.email = "Diese E-Mail-Adresse sieht nicht vollständig aus.";
  }

  const erreichbar = daten
    .getAll("zeiten")
    .map((z) => String(z))
    .filter((z) => zeiten.includes(z));

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
  const start = Number(daten.get("t"));
  if (start && Date.now() - start < MINDESTZEIT_MS) return antwort(request, 200);

  // Hinter dem Proxy steht die Besucher-IP in X-Forwarded-For.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || clientAddress;
  if (zuVieleAnfragen(ip)) {
    return antwort(request, 429, {
      formular: "Es kamen gerade sehr viele Anfragen. Bitte rufen Sie uns an.",
    });
  }

  const { fehler, werte } = pruefen(daten);
  if (Object.keys(fehler).length) return antwort(request, 400, fehler);

  const betreff = `Probestunde: ${werte.fach}, ${werte.klasse} – ${werte.vorname}`;
  const text = [
    "Neue Anfrage für eine Gratis-Probestunde über lernstabil.de",
    "",
    `Fach:        ${werte.fach}`,
    `Klasse:      ${werte.klasse}`,
    "",
    `Vorname:     ${werte.vorname}`,
    `Telefon:     ${werte.telefon}`,
    `E-Mail:      ${werte.mail || "–"}`,
    `Erreichbar:  ${werte.erreichbar.join(", ") || "keine Angabe"}`,
    "",
    "Zugesagt auf der Website: Wir melden uns innerhalb von 24 Stunden.",
  ].join("\n");

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    if (import.meta.env.DEV) {
      console.log(`\n[anfrage] Kein SMTP eingerichtet — nur Ausgabe:\n${betreff}\n\n${text}\n`);
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

  try {
    await transport.sendMail({
      from: `"#Lernstabil Website" <${SMTP_USER}>`,
      to: email.anzeige,
      replyTo: werte.mail || undefined,
      subject: betreff,
      text,
    });
  } catch (e) {
    console.error("[anfrage] Versand fehlgeschlagen:", e);
    return antwort(request, 500, { formular: "versand" });
  }

  return antwort(request, 200);
};
