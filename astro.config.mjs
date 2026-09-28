// @ts-check
import { defineConfig, envField } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
//
// output: 'static' bleibt: Jede Seite wird beim Bauen fertig erzeugt.
// Der Node-Adapter kam am 27. September 2026 fuer das Probestunden-
// Formular dazu. Nur src/pages/api/anfrage.ts laeuft auf dem Server
// (prerender = false); der Standalone-Server liefert daneben die
// statischen Seiten aus. Start: node dist/server/entry.mjs
export default defineConfig({
  output: 'static',
  adapter: node({
    mode: 'standalone',
    // Eine Anfrage hat sechs kurze Felder. 16 KB reichen weit und
    // halten Riesen-Uploads von der Server-Adresse fern (Vorgabe: 1 GB).
    bodySizeLimit: 16 * 1024,
  }),
  // Hinter dem Proxy von mittwald kommt beim Server nur http an, der
  // Browser schickt aber „Origin: https://lernstabil.de". Ohne diese
  // Liste haelt Astro sich fuer http://…, die Herkunftspruefung fuer
  // POST schlaegt fehl und JEDE Anfrage aus dem Formular endet mit 403
  // (Sicherheitspruefung am 28. September 2026, im Build nachgestellt).
  // Mit der Liste wertet Astro X-Forwarded-Proto/-Host aus — aber nur
  // fuer diese beiden Adressen, fremde Herkunft bleibt gesperrt.
  // Voraussetzung: Der Proxy sendet X-Forwarded-Proto. Nach dem Deploy
  // einmal echt absenden.
  security: {
    allowedDomains: [
      { hostname: 'lernstabil.de', protocol: 'https' },
      { hostname: 'www.lernstabil.de', protocol: 'https' },
    ],
  },
  env: {
    // Zugangsdaten des Postfachs, ueber das die Anfragen verschickt
    // werden. context 'server' + access 'secret': nur auf dem Server,
    // zur Laufzeit gelesen, nie im Client-Bundle. Werte in .env
    // (lokal) bzw. in den Umgebungsvariablen der App bei mittwald.
    //
    // Alle optional: Fehlt SMTP_HOST, schreibt die Server-Adresse im
    // Entwicklungsmodus die Anfrage nur ins Terminal, statt zu senden.
    //
    // SMTP_PORT als Text, nicht als Zahl: Eine leere Zeile „SMTP_PORT="
    // aus der .env.example wuerde die Zahlenpruefung von Astro sprengen.
    // Leer oder fehlend heisst 465 (siehe anfrage.ts).
    schema: {
      SMTP_HOST: envField.string({ context: 'server', access: 'secret', optional: true }),
      SMTP_PORT: envField.string({ context: 'server', access: 'secret', optional: true }),
      SMTP_USER: envField.string({ context: 'server', access: 'secret', optional: true }),
      SMTP_PASS: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
