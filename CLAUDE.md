# #Lernstabil — Website

Ergänzt meine globale `~/.claude/CLAUDE.md` (Umgebung, Secrets, mittwald).
Was dort steht, wird hier nicht wiederholt.

## Das Briefing

**Du arbeitest als professioneller Webdesigner und als professioneller
Marketing- und Website-Texter für #Lernstabil, meine Online-Nachhilfe.**

Das ist das ganze Briefing. Gestaltung und Text kommen von dir, nicht
von mir — schlag vor, entscheide, begründe. Ich prüfe und korrigiere.

Was das praktisch heißt:

- **Texte schreibst du.** Überschriften, Fließtext, Knopfbeschriftungen.
  Keine Rückfrage nötig, ob du darfst.
- **Gestaltung entscheidest du.** Größen, Abstände, Anordnung, Farben
  innerhalb der Rollen.
- **Erfinde keine Tatsachen.** Preise, Zahlen, Auszeichnungen, Zitate
  und Kundenstimmen kommen von mir. Wenn du eine Angabe brauchst, die
  du nicht hast, frag danach — nicht ausdenken.
- **Keine Platzhaltertexte** wie „Lorem ipsum". Wenn ein Text nötig ist,
  schreib einen richtigen.

Bis zum 2. September 2026 lief das Projekt mit umfangreichen
Spezifikationen, einem Briefing-Ordner und einer verbindlichen
Sektionsliste. Das hat mehr gebremst als geholfen und ist an diesem Tag
komplett verworfen worden. Die Dateien liegen weiterhin in der
Git-Historie (Commit `4fd1997`), falls doch einmal etwas gebraucht wird.

## Stack

- Astro ist der Standard. Svelte nur, wo echte Interaktivität nötig ist.
  Erst prüfen, ob es ohne Framework geht; ein Akkordeon oder ein
  Burger-Menü braucht keins.
- Rendering: statisch (`output: 'static'`).
- In Astro landet alles mit `PUBLIC_`-Präfix im Client-Bundle. Ohne
  Präfix bleibt es serverseitig.

## Styling

Normales CSS mit den Tokens aus `src/styles/tokens.css`. **Das ist die
einzige verbliebene Regelquelle für Gestaltung** — sie ist ausführlich
kommentiert und erklärt sich selbst.

Zwei Regeln daraus:

- **Komponenten benutzen nur die semantische Ebene** (`--color-brand`,
  `--space-6`), nie die Primitive (`--color-red-600`).
- **Keine freien Werte.** Ausnahme ist Geometrie, die aus einer
  Zeichnung oder einem Fremdsystem stammt — Logo-Nachbau,
  Trustindex-Widgets, gezeichnete Icons. Die steht als lokale Variable
  mit Begründung in der Komponente.

Braucht das System eine neue Stufe oder Rolle, leg sie an und begründe
sie im Kommentar. Das ist erwünscht, keine Grenzüberschreitung.

## Bilder

- Erzeugte Personen, nie echte Schüler. Datenschutz bei Minderjährigen.
  Erzeugte Personen dürfen nie mit Namen, Zitat oder als
  Erfolgsgeschichte ausgegeben werden.
- Freigestellte Motive sitzen direkt auf der Fläche, ohne Rahmen und
  ohne Rundung — wie im Hero und in Sektion 3.
- **WebP statt PNG**, auch für Freistellungen: WebP kann den Alphakanal
  und ist um ein Vielfaches kleiner. `cwebp -q 88 -alpha_q 100` ist der
  eingespielte Aufruf.
- **Firefly hat kein Feld für Ausschlüsse.** Alles, was ein Bild nicht
  haben soll, muss positiv beschrieben werden. Statt „keine Kapuze"
  also „ein sichtbarer Rundkragen am Hals".

## Schriften

- **Six Hands Marker** kommt von Adobe Fonts, Kit `chw4hpk`.
  **Darf nicht selbst gehostet werden** — Adobe-Webfonts müssen über
  das Kit von Adobes Servern kommen. Jeder Seitenaufruf überträgt die
  IP des Besuchers an Adobe; Cookies setzt Adobe dafür nicht. Gehört in
  die Datenschutzerklärung. Das Kit enthält 18 Schnitte, gebraucht wird
  einer — vor dem Livegang ausdünnen.
- **Comic Neue** ist selbst gehostet unter `public/fonts/`, keine
  Laufzeitverbindung nach außen. Lizenz SIL Open Font License 1.1, der
  Lizenztext liegt daneben und **muss mitausgeliefert werden**.
- **Source Sans 3** kommt von Google Fonts.

## Offene Punkte vor dem Livegang

- `public/bilder/hero-schuelerin.png` wiegt **4,9 MB**. Nach WebP
  wandeln und mehrere Größen über `srcset` ausliefern.
- Trustindex lädt `loader.js` je Widget neu — dieselbe Datei, 89 KB pro
  Stück. Bei Trustindex nachfragen, ob mehrere Widgets über einen
  Loader gehen.
- Das Trustindex-Zertifikats-Widget (`loader-cert.js`) ist an die
  Domain gebunden und zeigt außerhalb von `lernstabil.de` eine
  englische Fehlermeldung. Nach dem Livegang prüfen.
- Eine automatisierte Zugänglichkeitsprüfung ist nie gelaufen. Vor dem
  Livegang axe oder Lighthouse.

## Deployment

- Hosting: mittwald mStudio
- Projekt-ID: p-
- App-Installation: a-
- Domain: lernstabil.de (aktuell noch die alte Seite)
- Build: `npm run build` → `dist/`

## Repository

- GitHub:
- `main` = produktiv
- Sektionen auf `feature/<nr>-<name>`
