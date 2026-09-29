// Eingangsbestaetigung an die Eltern. Seit 29. September 2026 ist die
// E-Mail-Adresse Pflicht und das Telefon freiwillig; die Bestaetigung
// geht also an alle, die mit Skript absenden.
// Angelegt am 28. September 2026, unterschrieben von Alexander.
//
// Die Aussagen zur Probestunde stammen aus den Fragen (Sektion 8) und
// der Bestaetigung im Formular, beide von Alexander bestaetigt. Wer hier
// etwas zusagt, das dort nicht steht, muss es erst mit ihm klaeren.

import { telefon } from "../data/kontakt";
import {
  type Anfrage,
  SEITE,
  absatz,
  angaben,
  color,
  esc,
  fontSize,
  fussLink,
  hervorgehoben,
  kicker,
  knopf,
  radius,
  rahmen,
  space,
  titel,
  zeitenImSatz,
  zwischentitel,
} from "./rahmen";

const SCHRITTE: [string, string][] = [
  [
    "45 Minuten, kostenlos und online.",
    "Ihr Kind lernt bequem von zu Hause aus.",
  ],
  [
    "Der Dozent schaut genau hin.",
    "Wo liegen die Stärken Ihres Kindes, wo hakt es?",
  ],
  [
    "Sie bekommen einen Unterrichtsplan.",
    "Wie wir die Stunden gestalten würden und was wir empfehlen. Verpflichtet sind Sie zu nichts.",
  ],
];

export function bestaetigung(a: Anfrage) {
  const betreff = "Danke für Ihre Anfrage. Wir melden uns innerhalb von 24 Stunden";
  const wann = a.erreichbar.length ? `, am liebsten ${zeitenImSatz(a.erreichbar)}` : "";

  const schritte = SCHRITTE.map(
    ([kopf, text], i) => `<tr>
<td valign="top" style="padding:0 ${space[4]}px ${space[4]}px 0;width:32px;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td align="center" valign="middle" bgcolor="${color.brand}" style="width:32px;height:32px;background:${color.brand};border-radius:${radius.full}px;font-size:${fontSize.md}px;line-height:32px;font-weight:700;color:${color.textDefault};">${i + 1}</td></tr></table>
</td>
<td valign="top" style="padding:${space[1]}px 0 ${space[4]}px;font-size:${fontSize.md}px;line-height:1.5;color:${color.textInverse};">
<strong style="font-weight:700;">${kopf}</strong><br>${text}
</td>
</tr>`,
  ).join("");

  const inhalt = `
${kicker("Ihre Gratis-Probestunde")}
${titel(`Danke, ${esc(a.vorname)}!`)}
${absatz(`Ihre Anfrage ist bei uns angekommen. ${hervorgehoben("Wir melden uns innerhalb von 24&nbsp;Stunden.")}`, `font-size:${fontSize.lg}px;line-height:1.4;`)}
${absatz(
    a.telefon
      ? `Wir antworten Ihnen per E-Mail oder rufen Sie unter <strong style="white-space:nowrap;">${esc(a.telefon)}</strong> an${esc(wann)}.`
      : "Wir antworten Ihnen per E-Mail.",
  )}

${angaben("Ihre Anfrage", [
  ["Fach", esc(a.fach)],
  ["Klasse", esc(a.klasse)],
  ...(a.telefon ? [["Telefon", esc(a.telefon)] as [string, string]] : []),
  ...(a.erreichbar.length ? [["Erreichbar", esc(a.erreichbar.join(", "))] as [string, string]] : []),
])}
${absatz("Stimmt etwas nicht? Antworten Sie einfach auf diese E-Mail.", `font-size:${fontSize.sm}px;color:${color.textInverseSubtle};`)}

${zwischentitel("So läuft die Probestunde ab")}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${schritte}</table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:${space[4]}px 0 ${space[8]}px;border:2px solid ${color.surfaceInverseMuted};border-radius:${radius.md}px;">
<tr><td style="padding:${space[6]}px;">
<p style="margin:0 0 ${space[1]}px;font-size:${fontSize.lg}px;line-height:1.25;font-weight:700;color:${color.textInverse};">Lieber gleich sprechen?</p>
<p style="margin:0 0 ${space[4]}px;font-size:${fontSize.md}px;line-height:1.5;color:${color.textInverseSubtle};">Montag bis Freitag von 9 bis 20 Uhr.</p>
${knopf(telefon.href, `${telefon.anzeige} anrufen`)}
</td></tr></table>

${absatz("Herzliche Grüße", "margin-bottom:0;")}
${absatz(`<strong style="font-weight:700;">Alexander Ritter</strong><br><span style="color:${color.textInverseSubtle};">#Lernstabil · Online-Nachhilfe</span>`, "margin:0;")}
`;

  const fuss = `
<p style="margin:0 0 ${space[3]}px;">${fussLink(SEITE, "lernstabil.de")} &nbsp;·&nbsp; ${fussLink(`${SEITE}/impressum`, "Impressum")} &nbsp;·&nbsp; ${fussLink(`${SEITE}/datenschutz`, "Datenschutz")}</p>
<p style="margin:0;">Sie bekommen diese E-Mail, weil auf lernstabil.de mit dieser Adresse eine Probestunde angefragt wurde. Waren Sie das nicht? Antworten Sie kurz, dann löschen wir die Anfrage.</p>`;

  const html = rahmen({
    titel: betreff,
    vorschau: "Ihre Anfrage ist angekommen. So läuft die Gratis-Probestunde ab.",
    inhalt,
    fuss,
  });

  const text = [
    `Danke, ${a.vorname}!`,
    "",
    "Ihre Anfrage ist bei uns angekommen. Wir melden uns innerhalb von 24 Stunden.",
    a.telefon
      ? `Wir antworten Ihnen per E-Mail oder rufen Sie unter ${a.telefon} an${wann}.`
      : "Wir antworten Ihnen per E-Mail.",
    "",
    "IHRE ANFRAGE",
    `Fach:        ${a.fach}`,
    `Klasse:      ${a.klasse}`,
    ...(a.telefon ? [`Telefon:     ${a.telefon}`] : []),
    ...(a.erreichbar.length ? [`Erreichbar:  ${a.erreichbar.join(", ")}`] : []),
    "",
    "Stimmt etwas nicht? Antworten Sie einfach auf diese E-Mail.",
    "",
    "SO LÄUFT DIE PROBESTUNDE AB",
    ...SCHRITTE.map(([kopf, t], i) => `${i + 1}. ${kopf} ${t}`),
    "",
    `Lieber gleich sprechen? ${telefon.anzeige}, Montag bis Freitag von 9 bis 20 Uhr.`,
    "",
    "Herzliche Grüße",
    "Alexander Ritter",
    "#Lernstabil · Online-Nachhilfe",
    "",
    "--",
    `${SEITE} · Impressum: ${SEITE}/impressum · Datenschutz: ${SEITE}/datenschutz`,
    "Sie bekommen diese E-Mail, weil auf lernstabil.de mit dieser Adresse eine Probestunde angefragt wurde. Waren Sie das nicht? Antworten Sie kurz, dann löschen wir die Anfrage.",
  ].join("\n");

  return { betreff, html, text };
}
