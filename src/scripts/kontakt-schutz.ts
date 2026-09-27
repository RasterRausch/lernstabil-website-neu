/**
 * Setzt die verschluesselten Kontaktlinks ein. Hintergrund und
 * Gegenstueck: src/data/kontakt.ts.
 *
 * Ein <a> ohne href ist fuer Tastatur und Screenreader kein Link. Erst
 * mit dem eingesetzten href wird er fokussierbar und anklickbar.
 */

function entschluesseln(wert: string): string {
  return [...atob(wert)].reverse().join("");
}

for (const a of document.querySelectorAll<HTMLAnchorElement>(
  "a[data-kontakt]",
)) {
  const wert = a.dataset.kontakt;
  if (wert) a.href = entschluesseln(wert);
}
