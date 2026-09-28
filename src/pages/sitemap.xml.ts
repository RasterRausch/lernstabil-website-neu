// Sitemap fuer Suchmaschinen, beim Bauen als /sitemap.xml erzeugt.
// Angelegt am 28. September 2026, ohne Zusatzpaket: Die Seite hat nur
// eine Handvoll Adressen.
//
// Nur Seiten, die gefunden werden sollen. /danke und /anfrage-fehler
// stehen auf noindex und fehlen hier bewusst. Kommt eine Seite dazu,
// hier eintragen.

import type { APIRoute } from "astro";

const seiten = ["/", "/probestunde", "/fuer-dozenten", "/impressum", "/datenschutz"];

export const GET: APIRoute = ({ site }) => {
  const heute = new Date().toISOString().slice(0, 10);
  const eintraege = seiten
    .map(
      (pfad) =>
        `  <url><loc>${new URL(pfad, site).href}</loc><lastmod>${heute}</lastmod></url>`,
    )
    .join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${eintraege}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
