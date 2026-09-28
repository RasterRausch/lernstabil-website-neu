// Auswahlwerte des Probestunden-Formulars. Formular
// (components/ProbestundeFormular.astro) und Server-Adresse
// (pages/api/anfrage.ts) lesen beide von hier — der Server nimmt nur
// Werte an, die in diesen Listen stehen.

// Als Kacheln im ersten Schritt, ein Tipp genuegt. Mathematik, Deutsch
// und Englisch zuerst: die Kernfaecher, in denen die meisten Eltern
// Nachhilfe suchen. Physik, Chemie, Biologie decken die
// Naturwissenschaften ab, fuer die #Lernstabil eigene Dozenten hat.
export const faecherKacheln = [
  "Mathematik",
  "Deutsch",
  "Englisch",
  "Physik",
  "Chemie",
  "Biologie",
];

// Hinter „Anderes Fach". Dieselben Faecher wie in Sektion 6
// (sections/Schulfaecher.astro) — kommt dort ein Fach dazu, hier auch.
export const faecherWeitere = [
  "Französisch",
  "Latein",
  "Informatik",
  "Erdkunde/Geographie",
  "Geschichte",
  "Sozialkunde",
  "Philosophie",
  "Ethik",
  "Religion",
  "Musik",
];

export const alleFaecher = [...faecherKacheln, ...faecherWeitere];

// Grundschule bis Abitur (Alexander, 27. September 2026). Studium
// bekommt spaeter eine eigene Unterseite.
export const klassen = [
  { wert: "Grundschule", zusatz: "Klasse 1–4" },
  { wert: "Klasse 5–7", zusatz: "" },
  { wert: "Klasse 8–10", zusatz: "" },
  { wert: "Oberstufe", zusatz: "bis zum Abitur" },
];

export const zeiten = ["Vormittags", "Nachmittags", "Abends"];
