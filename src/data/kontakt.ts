// Kontaktdaten von #Lernstabil — die einzige Stelle, an der Nummer und
// Adresse im Klartext stehen. Diese Datei laeuft nur beim Bauen; im
// ausgelieferten HTML kommen beide nie im Klartext vor.
//
// SCHUTZ GEGEN ADRESSSAMMLER (Wunsch von Alexander, 27. September 2026:
// „Telefon und E-Mail immer gegen Bots verschluesseln"):
//
// - Das Linkziel (tel:, mailto:) steht verschluesselt in data-kontakt.
//   src/scripts/kontakt-schutz.ts setzt es im Browser als href ein.
// - Der sichtbare Text kommt aus <Getarnt>: Zwischen den Zeichen stecken
//   unsichtbare Stoerzeichen. Menschen, Screenreader und die Zwischen-
//   ablage sehen die richtige Nummer, ein Sammler im Quelltext nicht.
//
// Ohne JavaScript bleibt die Nummer lesbar, der Link ist dann aber nicht
// anklickbar. Das ist der Preis des Schutzes.
//
// Wer eine Nummer oder Adresse irgendwo neu einbaut: immer ueber diese
// Datei, nie als Klartext in einer Komponente.

export const telefon = {
  anzeige: "0341 658 329 18",
  href: "tel:+4934165832918",
};

export const email = {
  anzeige: "info@lernstabil.de",
  href: "mailto:info@lernstabil.de",
};

// Postfach fuer Bewerbungen als Dozent (haengt wie info@ am Projekt bei
// mittwald). Der Betreff ist vorbelegt, damit Bewerbungen im Postfach
// gleich erkennbar sind.
export const bewerbung = {
  anzeige: "bewerbung@lernstabil.de",
  href: "mailto:bewerbung@lernstabil.de?subject=Bewerbung%20als%20Dozent",
};

/**
 * Verschluesselt ein Linkziel fuer data-kontakt: umgedreht, dann Base64.
 * Kein Geheimnis — es soll nur nicht nach „tel:" oder „@" aussehen.
 * Das Umdrehen verhindert, dass der Anfang immer gleich kodiert wird
 * (Base64 von „mailto:" beginnt stets mit „bWFpbHRv").
 * Gegenstueck: entschluesseln() in src/scripts/kontakt-schutz.ts.
 */
export function verschluesseln(ziel: string): string {
  return btoa([...ziel].reverse().join(""));
}
