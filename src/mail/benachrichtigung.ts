// Benachrichtigung an info@ ueber eine neue Anfrage. Angelegt am
// 28. September 2026 (vorher reiner Text).
//
// Gebaut fuers Handy: Oben steht, wer eine Antwort erwartet und bis
// wann (zugesagt sind 24 Stunden), darunter der Knopf zum Antworten per
// E-Mail. Seit 29. September 2026 ist die E-Mail Pflicht und das
// Telefon freiwillig; der Anrufen-Knopf steht nur da, wenn eine Nummer
// angegeben ist. Der Betreff bleibt knapp und gleich aufgebaut, damit
// sich Anfragen im Postfach ueberfliegen lassen.

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
  const bestaetigt = `Die Eltern bekommen automatisch eine Eingangsbestätigung an ${esc(a.mail)}. „Antworten“ geht direkt an sie.`;
  const nicht = (text: string) =>
    `<span style="color:${color.textInverseSubtle};font-weight:400;">${text}</span>`;
  const antworten = `mailto:${esc(a.mail)}?subject=${encodeURIComponent(`Ihre Gratis-Probestunde bei #Lernstabil`)}`;

  const inhalt = `
${kicker("Neue Anfrage · Gratis-Probestunde")}
${titel(esc(a.vorname))}
${absatz(`<strong style="font-weight:700;">${esc(a.fach)}</strong> &nbsp;·&nbsp; ${esc(a.klasse)}`, `font-size:${fontSize.lg}px;line-height:1.4;margin-bottom:${space[6]}px;`)}

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 ${space[6]}px;">
<tr><td style="padding:${space[4]}px ${space[6]}px;background:${color.surfaceInverseMuted};border-radius:${radius.md}px;font-size:${fontSize.md}px;line-height:1.5;color:${color.textInverse};">
Zugesagt ist eine Antwort innerhalb von 24&nbsp;Stunden,<br>also bis <strong style="font-weight:700;color:${color.brand};">${frist}</strong>.
</td></tr></table>

<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 ${space[6]}px;"><tr><td style="padding:0 0 ${space[3]}px;">
${knopf(antworten, "Per E-Mail antworten")}
</td></tr>${
    a.telefon
      ? `<tr><td>
${knopf(telHref(a.telefon), `${esc(a.telefon)} anrufen`)}
</td></tr>`
      : ""
  }</table>

${angaben("Angaben", [
  ["E-Mail", `<a href="mailto:${esc(a.mail)}" style="color:${color.action};">${esc(a.mail)}</a>`],
  ["Telefon", a.telefon ? esc(a.telefon) : nicht("nicht angegeben")],
  ["Erreichbar", a.erreichbar.length ? esc(a.erreichbar.join(", ")) : nicht("keine Angabe")],
  ["Eingegangen", datum(eingang, false)],
])}
${absatz(bestaetigt, `font-size:${fontSize.sm}px;color:${color.textInverseSubtle};margin:0;`)}
`;

  const fuss = `<p style="margin:0;">Verschickt vom Probestunden-Formular auf lernstabil.de.</p>`;

  const html = rahmen({
    titel: betreff,
    vorschau: `${a.fach}, ${a.klasse}. Antwort bis ${frist}`,
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
    `E-Mail:      ${a.mail}`,
    `Telefon:     ${a.telefon || "nicht angegeben"}`,
    `Erreichbar:  ${a.erreichbar.join(", ") || "keine Angabe"}`,
    `Eingegangen: ${datum(eingang, false)}`,
    "",
    `Zugesagt ist eine Antwort innerhalb von 24 Stunden, also bis ${frist}.`,
    `Die Eltern bekommen automatisch eine Eingangsbestätigung an ${a.mail}.`,
  ].join("\n");

  return { betreff, html, text };
}
