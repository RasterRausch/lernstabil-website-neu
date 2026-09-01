# Website-Projekt

Ergänzt meine globale `~/.claude/CLAUDE.md` (Umgebung, Secrets, mittwald).
Was dort steht, wird hier nicht wiederholt.

## Stack

- Astro ist der Standard. Svelte nur, wo echte Interaktivität nötig ist —
  nicht für statische Sektionen. Erst prüfen, ob es ohne Framework geht;
  ein Akkordeon oder ein Burger-Menü braucht keins.
- SvelteKit nur, wenn das Projekt eine Anwendung ist: Nutzerkonten,
  geschützte Bereiche, nutzerspezifische Daten, oder Nutzer legen selbst
  Daten an. Formulare, Menüs, Galerien, Blogs und CMS-Anbindung sind KEIN
  Grund für SvelteKit. Im Zweifel fragen, nicht entscheiden.
- Shops: Astro als Frontend, Warenkorb und Checkout über ein Shop-Backend
  oder einen gehosteten Anbieter. Nicht selbst bauen.
- In Astro landet alles mit `PUBLIC_`-Präfix im Client-Bundle. Ohne
  Präfix bleibt es serverseitig.

## Rendering

<!-- Beim Projektstart entscheiden, eins ankreuzen -->

- [x] statisch (`output: 'static'`) — Standard für Websites ohne
      serverseitige Logik
- [ ] SSR mit Node-Adapter (`output: 'server'`) — nur wenn API-Routen,
      Formularverarbeitung oder dynamische Daten nötig sind

## Styling

<!-- Beim Projektstart entscheiden, eins ankreuzen -->

- [ ] Tailwind 4 — Tokens im `@theme`-Block statt in `tokens.css`
- [x] Normales CSS mit den Variablen aus `src/styles/tokens.css`

Nicht mischen. Keine freien Werte, nur Tokens.

## Arbeitsweise

Das Design kommt von mir, die technische Umsetzung von dir.

Wir bauen Sektion für Sektion, nicht die ganze Seite auf einmal. Ablauf
pro Sektion:

1. Ich liefere den Input (Screenshot, Figma-Frame, Referenz, Maßangaben).
2. Du beschreibst zurück, was du siehst: Hierarchie, Aufbau, Abstände,
   Zustände, Verhalten an den Breakpoints. Liste ausdrücklich auf, was du
   NICHT erkennen kannst.
3. Ich korrigiere diese Beschreibung. Sie ist die Spezifikation.
4. Du baust genau diese eine Sektion.
5. Ich prüfe.
6. Sektion wird gesperrt.

Screenshots schätzt du, du misst sie nicht. Wenn ich exakte Werte
mitgebe, nutze diese und rate nicht daneben.

Die Design-Tokens werden aus der ersten gebauten Sektion abgeleitet und
sind danach fix. Abstände kommen ausschließlich aus der Skala.

## Was du nicht entscheidest

- Keine Schriftwahl, keine Schriftgrößen außerhalb der Type-Scale
- Keine Farben erfinden, nur die definierten Rollen verwenden
- Keine Sektionen hinzufügen, die ich nicht beauftragt habe
- Keine dekorativen Elemente, Icons oder Illustrationen ungefragt
- Keine Icon- oder Komponenten-Library ohne Absprache
- Keine Platzhaltertexte ("Lorem ipsum", erfundene Kundenstimmen)

## Vor größeren Änderungen lesen

- `brief/briefing.md` — Kunde, Zielgruppe, Ziel, Tonalität
- `brief/content.md` — verbindliche Seiten- und Sektionsreihenfolge
- `design/tokens.md` — Farbrollen, Type-Scale, Spacing
- `design/bildkonzept.md` — Bildsprache
- die `spec.md` der betroffenen Sektion, inklusive **Status**

Sektionsspezifikationen liegen unter:

- `design/shared/sections/<nr>-<name>/` — seitenübergreifend
  (Header, Footer, wiederkehrende Blöcke)
- `design/pages/<seite>/sections/<nr>-<name>/` — seitenspezifisch

Bei einem One-Pager gibt es eben nur eine Seite. Die Struktur bleibt
gleich.

Eine Sektion mit Status `GESPERRT` wird nicht verändert. Auch nicht
refactored, aufgeräumt oder verbessert. Bei Änderungsbedarf fragen.

## Deployment

<!-- Beim Projektstart ausfüllen -->

- Hosting: mittwald mStudio
- Projekt-ID: p-
- App-Installation: a-
- Domain:
- Staging:
- Document Root:
- Build: `npm run build` → `dist/`
- Deploy:

## Repository

- GitHub:
- `main` = produktiv
- Sektionen auf `feature/<nr>-<name>`

## Projektspezifisches

<!-- Abweichungen hier festhalten -->
