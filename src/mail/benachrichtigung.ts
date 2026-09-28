// Benachrichtigung an info@ ueber eine neue Anfrage. Angelegt am
// 28. September 2026 (vorher reiner Text).
//
// Gebaut fuers Handy: Oben steht, wer angerufen werden will und bis wann —
// auf der Seite ist ein Rueckruf innerhalb von 24 Stunden zugesagt —,
// darunter der Knopf zum Anrufen. Der Betreff bleibt knapp und
// gleich aufgebaut, damit sich Anfragen im Postfach ueberfliegen lassen.

import {
  type Anfrage,
  absatz,
  angaben,
  color,
  esc,
  fontSize,
  kicker,
  knopf,
  radius,
  rahmen,
  space,
  telHref,
  titel,
} from "./rahmen";

const ZEITZONE = "Europe/Berlin";

function datum(d: Date, mitWochentag: boolean): string {
  const tag = d.toLocaleDateString("de-DE", {
    timeZone: ZEITZONE,
    ...(mitWochentag ? { weekday: "long" } : {}),
    day: "numeric",
    month: "long",
  });
  const zeit = d.toLocaleTimeString("de-DE", {
    timeZone: ZEITZONE,
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${tag}, ${zeit} Uhr`;
}

export function benachrichtigung(a: Anfrage, eingang: Date) {
  const betreff = `Probestunde: ${a.fach}, ${a.klasse} – ${a.vorname}`;
  const frist = datum(new Date(eingang.getTime() + 24 * 60 * 60 * 1000), true);
  const bestaetigt = a.mail
    ? `Die Eltern bekommen automatisch eine Eingangsbestätigung an ${esc(a.mail)}. „Antworten“ geht direkt an sie.`
    : "Keine E-Mail-Adresse angegeben – die Eltern haben keine schriftliche Bestätigung bekommen.";

  const inhalt = `
${kicker("Neue Anfrage · Gratis-Probestunde")}
${titel(esc(a.vorname))}
${absatz(`<strong style="font-weight:700;">${esc(a.fach)}</strong> &nbsp;·&nbsp; ${esc(a.klasse)}`, `font-size:${fontSize.lg}px;line-height:1.4;margin-bottom:${space[6]}px;`)}

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 ${space[6]}px;">
<tr><td style="padding:${space[4]}px ${space[6]}px;background:${color.surfaceInverseMuted};border-radius:${radius.md}px;font-size:${fontSize.md}px;line-height:1.5;color:${color.textInverse};">
Zugesagt ist ein Rückruf innerhalb von 24&nbsp;Stunden –<br>also bis <strong style="font-weight:700;color:${color.brand};">${frist}</strong>.
</td></tr></table>

<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 ${space[6]}px;"><tr><td>
${knopf(telHref(a.telefon), `${esc(a.telefon)} anrufen`)}
</td></tr></table>

${angaben("Angaben", [
  ["Telefon", esc(a.telefon)],
  [
    "E-Mail",
    a.mail
      ? `<a href="mailto:${esc(a.mail)}" style="color:${color.action};">${esc(a.mail)}</a>`
      : `<span style="color:${color.textInverseSubtle};font-weight:400;">nicht angegeben</span>`,
  ],
  [
    "Erreichbar",
    a.erreichbar.length
      ? esc(a.erreichbar.join(", "))
      : `<span style="color:${color.textInverseSubtle};font-weight:400;">keine Angabe</span>`,
  ],
  ["Eingegangen", datum(eingang, false)],
])}
${absatz(bestaetigt, `font-size:${fontSize.sm}px;color:${color.textInverseSubtle};margin:0;`)}
`;

  const fuss = `<p style="margin:0;">Verschickt vom Probestunden-Formular auf lernstabil.de.</p>`;

  const html = rahmen({
    titel: betreff,
    vorschau: `${a.fach}, ${a.klasse} – Rückruf bis ${frist}`,
    inhalt,
    fuss,
  });

  const text = [
    "Neue Anfrage für eine Gratis-Probestunde über lernstabil.de",
    "",
    `Fach:        ${a.fach}`,
    `Klasse:      ${a.klasse}`,
    "",
    `Vorname:     ${a.vorname}`,
    `Telefon:     ${a.telefon}`,
    `E-Mail:      ${a.mail || "–"}`,
    `Erreichbar:  ${a.erreichbar.join(", ") || "keine Angabe"}`,
    `Eingegangen: ${datum(eingang, false)}`,
    "",
    `Zugesagt ist ein Rückruf innerhalb von 24 Stunden – also bis ${frist}.`,
    a.mail
      ? `Die Eltern bekommen automatisch eine Eingangsbestätigung an ${a.mail}.`
      : "Keine E-Mail-Adresse angegeben – die Eltern haben keine schriftliche Bestätigung bekommen.",
  ].join("\n");

  return { betreff, html, text };
}
