// Gemeinsamer Rahmen der beiden E-Mails aus dem Probestunden-Formular:
// Bestaetigung an die Eltern (bestaetigung.ts) und Benachrichtigung an
// info@ (benachrichtigung.ts). Angelegt am 28. September 2026.
//
// WARUM HIER FREIE WERTE STEHEN
// E-Mail-Programme sind ein Fremdsystem im Sinne von tokens.css: Gmail
// und Outlook verwerfen CSS-Variablen, und <style> im Kopf wird nicht
// ueberall gelesen. Jede Angabe steht deshalb inline am Element. Die
// Werte sind aus src/styles/tokens.css abgeschrieben und tragen den
// Namen ihrer Rolle. Aendert sich dort ein Wert, hier nachziehen.
//
// SCHRIFTEN
// Six Hands Marker darf nur ueber das Adobe-Kit auf der Website laufen,
// nicht in E-Mails. Webfonts laedt ohnehin kaum ein Mailprogramm. Die
// Ueberschriften stehen deshalb in einer kraeftigen Systemschrift; das
// Logo nimmt wie auf der Seite Comic Neue, sonst die verwandte
// Comic Sans MS bzw. Chalkboard SE (iPhone), die dort vorinstalliert sind.
//
// LOGO
// Als Text nachgebaut statt als Bild: Viele Mailprogramme blockieren
// Bilder, bis man sie freigibt, und SVG zeigen Gmail und Outlook gar
// nicht. So ist das Logo sofort da — wie im Header der Seite.

export type Anfrage = {
  fach: string;
  klasse: string;
  vorname: string;
  telefon: string;
  mail: string;
  erreichbar: string[];
};

export const SEITE = "https://lernstabil.de";

// Aus tokens.css, Name der Rolle als Schluessel.
export const color = {
  surfaceInverseMuted: "#efeeec",
  surfaceInverse: "#ffffff",
  surfaceDefault: "#1a1a1a",
  textInverse: "#1a1a1a",
  textInverseSubtle: "#6b6b6b",
  textSubtle: "#b0b0b0",
  textDefault: "#ffffff",
  brand: "#d00000",
  action: "#1f4e98",
};

export const fontSize = { xs: 13, sm: 15, md: 17, lg: 21, "2xl": 32 };
export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 6: 24, 8: 32, 12: 48 };
export const radius = { sm: 4, md: 10, full: 999 };

// Einfache Anfuehrungszeichen in den Schriftlisten: Sie stehen in
// style="…" und wuerden das Attribut sonst vorzeitig beenden.
const fontBody = "'Source Sans 3', 'Segoe UI', Helvetica, Arial, sans-serif";
const fontLogo = "'Comic Neue', 'Comic Sans MS', 'Chalkboard SE', cursive";

// Breite der Mail. 600 px ist der uebliche Wert, den alle Programme
// ohne Querscrollen zeigen.
const BREITE = 600;

/** Maskiert Eingaben aus dem Formular fuer HTML. */
export function esc(wert: string): string {
  return wert
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** tel:-Link aus einer eingetippten Nummer — nur Ziffern und +. */
export function telHref(nummer: string): string {
  const roh = nummer.replace(/[^\d+]/g, "");
  return `tel:${roh.startsWith("0") && !roh.startsWith("00") ? "+49" + roh.slice(1) : roh}`;
}

/** „Vormittags", „Abends" → „vormittags oder abends". */
export function zeitenImSatz(zeiten: string[]): string {
  const klein = zeiten.map((z) => z.toLowerCase());
  if (klein.length < 2) return klein.join("");
  return `${klein.slice(0, -1).join(", ")} oder ${klein.at(-1)}`;
}

// --- Bausteine -------------------------------------------------------

export function kicker(text: string): string {
  return `<p style="margin:0 0 ${space[2]}px;font-size:${fontSize.xs}px;line-height:1.25;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${color.brand};">${text}</p>`;
}

export function titel(text: string): string {
  return `<h1 style="margin:0 0 ${space[4]}px;font-size:${fontSize["2xl"]}px;line-height:1.15;font-weight:700;color:${color.textInverse};">${text}</h1>`;
}

export function zwischentitel(text: string): string {
  return `<h2 style="margin:${space[8]}px 0 ${space[4]}px;font-size:${fontSize.lg}px;line-height:1.25;font-weight:700;color:${color.textInverse};">${text}</h2>`;
}

export function absatz(html: string, extra = ""): string {
  return `<p style="margin:0 0 ${space[4]}px;font-size:${fontSize.md}px;line-height:1.5;color:${color.textInverse};${extra}">${html}</p>`;
}

export function hervorgehoben(text: string): string {
  return `<strong style="color:${color.brand};font-weight:700;">${text}</strong>`;
}

/** Knopf, der auch in Outlook als Flaeche erscheint (Farbe an der Zelle). */
export function knopf(href: string, text: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0;"><tr><td bgcolor="${color.action}" style="background:${color.action};border-radius:${radius.full}px;">
<a href="${href}" style="display:inline-block;padding:${space[3]}px ${space[6]}px;min-height:20px;font-family:${fontBody};font-size:${fontSize.md}px;line-height:20px;font-weight:700;color:${color.textDefault};text-decoration:none;border-radius:${radius.full}px;">${text}</a>
</td></tr></table>`;
}

/** Karte mit Angaben, zweispaltig: Bezeichnung links, Wert rechts. */
export function angaben(ueberschrift: string, zeilen: [string, string][]): string {
  const reihen = zeilen
    .map(
      ([name, wert], i) => `<tr>
<td valign="top" style="padding:${space[2]}px ${space[4]}px ${space[2]}px 0;width:120px;font-size:${fontSize.sm}px;line-height:1.5;color:${color.textInverseSubtle};${i ? `border-top:1px solid ${color.surfaceInverse};` : ""}">${name}</td>
<td valign="top" style="padding:${space[2]}px 0;font-size:${fontSize.md}px;line-height:1.5;font-weight:600;color:${color.textInverse};${i ? `border-top:1px solid ${color.surfaceInverse};` : ""}">${wert}</td>
</tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 ${space[4]}px;background:${color.surfaceInverseMuted};border-radius:${radius.md}px;">
<tr><td style="padding:${space[4]}px ${space[6]}px ${space[3]}px;">
<p style="margin:0 0 ${space[1]}px;font-size:${fontSize.xs}px;line-height:1.25;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${color.textInverseSubtle};">${ueberschrift}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${reihen}</table>
</td></tr></table>`;
}

// --- Rahmen ----------------------------------------------------------

type Rahmen = {
  /** <title>, sehen manche Programme in der Vorschau. */
  titel: string;
  /** Unsichtbarer Vorschautext, den Postfaecher neben dem Betreff zeigen. */
  vorschau: string;
  inhalt: string;
  fuss: string;
};

export function rahmen({ titel, vorschau, inhalt, fuss }: Rahmen): string {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(titel)}</title>
<style>
  @media (max-width: 620px) {
    .innen { padding-left: 20px !important; padding-right: 20px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${color.surfaceInverseMuted};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(vorschau)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${color.surfaceInverseMuted}" style="background:${color.surfaceInverseMuted};">
<tr><td align="center" style="padding:${space[6]}px ${space[2]}px ${space[12]}px;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:${BREITE}px;font-family:${fontBody};">

${kopf()}

<tr><td class="innen" bgcolor="${color.surfaceInverse}" style="background:${color.surfaceInverse};padding:${space[8]}px ${space[8]}px ${space[8]}px;">
${inhalt}
</td></tr>

<tr><td class="innen" bgcolor="${color.surfaceDefault}" style="background:${color.surfaceDefault};padding:${space[6]}px ${space[8]}px;border-radius:0 0 ${radius.md}px ${radius.md}px;font-size:${fontSize.xs}px;line-height:1.6;color:${color.textSubtle};">
${fuss}
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

/** Blaue Leiste mit dem roten Logoblock, wie der Header der Seite: Der
 *  Block sitzt buendig an der Oberkante und ist nur unten gerundet. */
function kopf(): string {
  // Schriftgroessen des Logos aus dem Verhaeltnis in public/bilder/logo.svg
  // (Schriftzug 0,187 : Claim 0,068 der Blockbreite), wie in Header.astro.
  const wort = 30;
  const claim = 11;
  return `<tr><td class="innen" bgcolor="${color.action}" style="background:${color.action};padding:0 ${space[8]}px ${space[4]}px;border-radius:${radius.md}px ${radius.md}px 0 0;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td bgcolor="${color.brand}" style="background:${color.brand};padding:${space[3]}px ${space[3]}px ${space[2]}px;border-radius:0 0 ${radius.sm}px ${radius.sm}px;">
<a href="${SEITE}" style="text-decoration:none;color:${color.textDefault};">
<span style="display:block;font-family:${fontLogo};font-size:${wort}px;line-height:1;font-weight:700;letter-spacing:-0.02em;color:${color.textDefault};">#Lernstabil</span>
<span style="display:block;margin-top:${space[1]}px;font-family:${fontLogo};font-size:${claim}px;line-height:1;font-weight:700;color:${color.textDefault};">Nachhilfe bequem von zu Hause!</span>
</a>
</td>
</tr></table>
</td></tr>`;
}

/** Links im dunklen Fuss. */
export function fussLink(href: string, text: string): string {
  return `<a href="${href}" style="color:${color.textDefault};text-decoration:underline;">${text}</a>`;
}
