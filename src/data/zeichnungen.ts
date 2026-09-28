// Gezeichnete Linien der Seite, an einer Stelle. Angelegt am
// 28. September 2026 — vorher stand der Haken fuenfmal und der
// Markerzug dreimal als Kopie in den Komponenten.
//
// Aendert sich eine Zeichnung, aendert sie sich ueberall. Die
// Koordinaten gelten fuer die jeweilige viewBox; die Komponenten
// strecken sie ueber preserveAspectRatio="none".

/** Marker-Haken, viewBox 0 0 30 24. Reicht ueber die volle Breite,
 *  damit das Aufdecken von links mit der Stiftspitze mitlaeuft. Knick
 *  bei x = 9 — der kurze Schenkel zuerst, wie man einen Haken von Hand
 *  zieht. scripts/doodle-hand.ts rechnet mit genau diesen Punkten. */
export const haken = "M0 12 C 3 14, 6 17, 9 21 C 14 12, 21 6, 30 1";

/** Waagerechter Markerzug, viewBox 0 0 100 10: Unterstreichung,
 *  Durchstreichen, Hover in der Navigation. Leicht unregelmaessig,
 *  damit er nicht nach Textauszeichnung aussieht. */
export const zug = "M1 6 C 18 3, 34 7, 52 5 S 82 3, 99 5";
