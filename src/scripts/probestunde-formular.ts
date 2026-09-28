/**
 * Macht aus dem Probestunden-Formular (components/ProbestundeFormular.astro)
 * drei Schritte, prueft die Eingaben und schickt per fetch an
 * /api/anfrage. Ohne dieses Skript funktioniert das Formular trotzdem —
 * dann als ein langes Formular mit normalem Absenden.
 *
 * Nach erfolgreichem Versand feuert das Formular das Ereignis
 * „probestunde:gesendet" auf document. Daran haengt sich spaeter das
 * Conversion-Tracking fuer Google Ads, ohne dieses Skript anzufassen.
 */

const LETZTER_SCHRITT = 3;

// Dieselben Regeln wie in pages/api/anfrage.ts — der Server prueft
// ohnehin noch einmal, hier geht es nur um schnelle Rueckmeldung.
const TELEFON_ZEICHEN = /^[0-9+()/.\s-]+$/;
const EMAIL_FORM = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Fehler = Record<string, string>;

function einrichten(wurzel: HTMLElement) {
  const form = wurzel.querySelector<HTMLFormElement>("[data-probestunde-formular]");
  const erfolg = wurzel.querySelector<HTMLElement>("[data-erfolg]");
  if (!form || !erfolg) return;

  form.noValidate = true;
  form.dataset.mehrstufig = "";

  // required ist nur fuer den Weg ohne Skript da. Chrome meldet leere
  // Pflichtfelder Screenreadern sonst sofort als „ungueltig" — noch
  // bevor jemand etwas eingegeben hat, auch mit noValidate. Die Pruefung
  // uebernimmt ab hier pruefe(). Textfelder behalten die Auskunft
  // „erforderlich" ueber aria-required; bei Radios erlaubt ARIA das nur
  // an einer radiogroup, dort sagt es die Frage selbst.
  for (const el of form.querySelectorAll<HTMLInputElement>("[required]")) {
    el.required = false;
    if (el.type !== "radio") el.setAttribute("aria-required", "true");
  }

  const schritte = [...form.querySelectorAll<HTMLFieldSetElement>("[data-schritt]")];
  const nummer = form.querySelector<HTMLElement>("[data-schritt-nr]");
  const balken = form.querySelector<HTMLElement>("[data-balken]");
  const anderes = form.querySelector<HTMLElement>("[data-anderes]");
  const zeit = form.querySelector<HTMLInputElement>("[data-zeit]");
  const senden = form.querySelector<HTMLButtonElement>("[data-senden]");
  const versandFehler = form.querySelector<HTMLElement>("[data-versand-fehler]");
  const sendenText = senden?.textContent ?? "";
  let aktuell = 1;

  const feld = (name: string) =>
    form.elements.namedItem(name) as HTMLInputElement | RadioNodeList | null;
  const wert = (name: string) => {
    const f = feld(name);
    return f ? String(f.value ?? "").trim() : "";
  };

  function zeigeSchritt(n: number, fokus = true) {
    aktuell = n;
    for (const s of schritte) s.toggleAttribute("data-aktiv", Number(s.dataset.schritt) === n);
    if (nummer) nummer.textContent = String(n);
    balken?.style.setProperty("--anteil", String(n / LETZTER_SCHRITT));
    if (fokus) schritte[n - 1]?.querySelector<HTMLElement>(".frage")?.focus();
  }

  // Fehler anzeigen ------------------------------------------------------
  function fehlerSetzen(fehler: Fehler) {
    for (const p of form.querySelectorAll<HTMLElement>("[data-fehler]")) {
      p.textContent = fehler[p.dataset.fehler ?? ""] ?? "";
    }
    for (const name of ["vorname", "telefon", "email", "fach_anderes"]) {
      const f = feld(name);
      if (f instanceof HTMLElement) {
        const schluessel = name === "fach_anderes" ? "fach" : name;
        if (fehler[schluessel]) f.setAttribute("aria-invalid", "true");
        else f.removeAttribute("aria-invalid");
      }
    }
  }

  function pruefe(schritt: number): Fehler {
    const fehler: Fehler = {};
    if (schritt === 1) {
      const fach = wert("fach");
      if (!fach) fehler.fach = "Bitte wählen Sie ein Fach.";
      else if (fach === "Anderes Fach" && !wert("fach_anderes")) {
        fehler.fach = "Bitte wählen Sie das Fach aus der Liste.";
      }
    }
    if (schritt === 2 && !wert("klasse")) {
      fehler.klasse = "Bitte wählen Sie die Klasse.";
    }
    if (schritt === 3) {
      if (!wert("vorname")) fehler.vorname = "Bitte geben Sie Ihren Vornamen an.";
      const tel = wert("telefon");
      if (!TELEFON_ZEICHEN.test(tel) || tel.replace(/\D/g, "").length < 6) {
        fehler.telefon = "Bitte geben Sie eine Telefonnummer an, unter der wir Sie erreichen.";
      }
      const mail = wert("email");
      if (mail && !EMAIL_FORM.test(mail)) {
        fehler.email = "Diese E-Mail-Adresse sieht nicht vollständig aus.";
      }
    }
    return fehler;
  }

  // Zum ersten Feld mit Fehler, damit man ihn nicht suchen muss.
  function fokusAufFehler(fehler: Fehler) {
    const reihenfolge = ["fach", "klasse", "vorname", "telefon", "email"];
    const erster = reihenfolge.find((n) => fehler[n]);
    if (!erster) return;
    const f = feld(erster === "fach" && wert("fach") === "Anderes Fach" ? "fach_anderes" : erster);
    const ziel = f instanceof RadioNodeList ? (f[0] as HTMLElement) : f;
    ziel?.focus();
  }

  function weiter() {
    const fehler = pruefe(aktuell);
    fehlerSetzen(fehler);
    if (Object.keys(fehler).length) {
      fokusAufFehler(fehler);
      return;
    }
    if (aktuell < LETZTER_SCHRITT) zeigeSchritt(aktuell + 1);
  }

  // Bedienung ------------------------------------------------------------
  form.addEventListener("click", (e) => {
    const ziel = e.target as HTMLElement;
    if (ziel.closest("[data-weiter]")) weiter();
    if (ziel.closest("[data-zurueck]")) {
      fehlerSetzen({});
      zeigeSchritt(Math.max(1, aktuell - 1));
    }
  });

  form.addEventListener("change", (e) => {
    const ziel = e.target as HTMLInputElement;
    if (ziel.name === "fach") {
      const offen = ziel.value === "Anderes Fach";
      anderes?.toggleAttribute("data-offen", offen);
      if (offen) form.querySelector<HTMLSelectElement>("[name=fach_anderes]")?.focus();
    }
    // Ein ausgebesserter Fehler verschwindet sofort, nicht erst beim
    // naechsten Weiter.
    if (form.querySelector(`[data-fehler]:not(:empty)`)) fehlerSetzen({});
  });

  // Ein Tipp auf eine Kachel genuegt: Das Formular springt selbst weiter.
  // Nur bei Maus und Finger. Der Klick landet dabei auf der Kachel (dem
  // Label) mit detail > 0 — das Radio darin ist unsichtbar und nimmt
  // keine Zeigerereignisse an. Tastatur (Leertaste, Pfeiltasten) klickt
  // das Radio selbst an, mit detail 0: Dort wuerde das Weiterspringen
  // jede Auswahl sofort abschliessen. Tastatur und Screenreader nehmen
  // „Weiter".
  form.addEventListener("click", (e) => {
    const ziel = e.target as HTMLElement;
    const kachel = ziel.closest(".kachel");
    if (!kachel || ziel instanceof HTMLInputElement || e.detail === 0) return;
    const radio = kachel.querySelector("input");
    if (radio?.type !== "radio" || radio.value === "Anderes Fach") return;
    // Kurz stehen lassen, damit man die Auswahl aufleuchten sieht. Bis
    // dahin hat der Browser das Radio auch angehakt.
    window.setTimeout(weiter, 180);
  });

  // Enter in einem Feld der ersten Schritte heisst „Weiter", nicht
  // „Absenden".
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (aktuell < LETZTER_SCHRITT) {
      weiter();
      return;
    }

    const fehler = pruefe(3);
    fehlerSetzen(fehler);
    if (Object.keys(fehler).length) {
      fokusAufFehler(fehler);
      return;
    }

    if (senden) {
      senden.disabled = true;
      senden.textContent = "Wird gesendet …";
    }
    if (versandFehler) versandFehler.hidden = true;

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      const daten = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        fehler?: Fehler;
      };

      if (res.ok && daten.ok) {
        gesendet();
        return;
      }

      const serverFehler = daten.fehler ?? {};
      if (serverFehler.formular === "versand" || !Object.keys(serverFehler).length) {
        if (versandFehler) versandFehler.hidden = false;
      } else {
        fehlerSetzen(serverFehler);
        // Zurueck in den Schritt, in dem der erste Fehler steckt.
        const schritt = serverFehler.fach ? 1 : serverFehler.klasse ? 2 : 3;
        zeigeSchritt(schritt, false);
        fokusAufFehler(serverFehler);
      }
    } catch {
      if (versandFehler) versandFehler.hidden = false;
    } finally {
      if (senden) {
        senden.disabled = false;
        senden.textContent = sendenText;
      }
    }
  });

  function gesendet() {
    const name = wert("vorname");
    const nameFeld = erfolg!.querySelector("[data-erfolg-name]");
    if (nameFeld) nameFeld.textContent = name ? `, ${name}` : "";
    form!.hidden = true;
    erfolg!.hidden = false;
    erfolg!.querySelector<HTMLElement>("[data-erfolg-titel]")?.focus();
    document.dispatchEvent(new CustomEvent("probestunde:gesendet"));
  }

  // Von aussen aufrufbar: Der Dialog setzt das Formular beim Oeffnen
  // zurueck, wenn es schon abgeschickt war, und startet die Zeitmessung
  // neu.
  function neuStarten() {
    if (!form!.hidden) {
      if (zeit) zeit.value = String(Date.now());
      zeigeSchritt(aktuell, false);
      return;
    }
    form!.reset();
    anderes?.removeAttribute("data-offen");
    fehlerSetzen({});
    form!.hidden = false;
    erfolg!.hidden = true;
    if (zeit) zeit.value = String(Date.now());
    zeigeSchritt(1, false);
  }

  wurzel.addEventListener("probestunde:start", neuStarten);

  if (zeit) zeit.value = String(Date.now());
  zeigeSchritt(1, false);
}

for (const wurzel of document.querySelectorAll<HTMLElement>("[data-probestunde]")) {
  einrichten(wurzel);
}
