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
- Rendering: statisch (`output: 'static'`) mit Node-Adapter
  (`@astrojs/node`, standalone). Alle Seiten werden beim Bauen erzeugt;
  nur `src/pages/api/anfrage.ts` (Probestunden-Formular) läuft auf dem
  Server. Seit 27. September 2026.
- Versand der Anfragen per `nodemailer` über das mittwald-Postfach
  `info@lernstabil.de`. Zugangsdaten über `astro:env` (SMTP_HOST,
  SMTP_PORT, SMTP_USER, SMTP_PASS) — in `.env` bzw. als
  Umgebungsvariablen der App. Ohne SMTP_HOST schreibt `npm run dev`
  Anfragen nur ins Terminal.
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
- **Source Sans 3** ist selbst gehostet unter `public/fonts/` (seit
  27. September 2026, vorher Google Fonts). Variable Schrift, Latin-
  Teilsatz, unverändert von Google übernommen. Lizenz SIL OFL 1.1, der
  Lizenztext liegt daneben und **muss mitausgeliefert werden**.

## Kontaktdaten

Telefon und E-Mail stehen nur in `src/data/kontakt.ts` und kommen nie
im Klartext ins HTML (Schutz gegen Adresssammler). Links über
`data-kontakt` + `verschluesseln()`, sichtbarer Text über `<Getarnt>`.
Die Datei erklärt den Aufbau.

## Besucherstatistik (Umami)

Seit 30. September 2026. Eine Umami-Installation für die ganze Agentur
unter `statistik.raster-rausch.de`, je Kundenseite eine „Website".
Lernstabil ist die erste.

- mittwald: Projekt Raster Rausch (p-gdc5j0), Stack „Umami" aus der
  mStudio-Vorlage, von Claude ergänzt. Dienste `umami` (fest auf
  3.4.0, nicht `latest`), `postgres` (pgautoupgrade 18) und
  `sicherung` (pg_dump alle 24 h ins Volume `sicherung`, das die
  Projektsicherung mitnimmt).
- `stack_deploy` ersetzt den ganzen Stack: vorher mit `stack_list`
  (Werte sichtbar) lesen und alles übernehmen.
- Skript `rr.js`, Zähladresse `/api/rr` (gegen Werbeblocker).
- Einbau: `src/components/Statistik.astro`. Datenschutz Abschnitt 4.
- Eigene Besuche: `lernstabil.de/?statistik=aus` je Browser.
- Update-Check monatlich (Kalender, erster Montag). Neue Version:
  Release-Notes lesen, Tag im Stack ändern, danach Login und Zählung
  prüfen.

## Offene Punkte

Live seit 29. September 2026 (Stand `afa3828` auf `main`).

- Formular live getestet am 29. September 2026: Anfrage ging mit 200
  durch, die Herkunftsprüfung hinter dem Proxy funktioniert. Eingang der
  Mail in info@ hat Alexander noch zu bestätigen.
- Die IP-Begrenzung nimmt den letzten Eintrag aus `X-Forwarded-For`.
  Noch nicht geprüft, wie mittwald die Kopfzeile befüllt.
- Sicherheits-Header (29. September 2026 gemessen): HSTS setzt der
  Proxy von mittwald. `X-Content-Type-Options: nosniff`,
  `Referrer-Policy` und `frame-ancestors` fehlen.
- Komprimierung (29. September 2026 gemessen): Der Proxy komprimiert
  die Seiten selbst (Startseite 125 → 37 KB, gzip), CSS und JavaScript
  aber nicht (CSS 30 KB unkomprimiert). Gewinn wäre gering; bei Bedarf
  einen kleinen eigenen Server mit node:zlib vorschalten.
- Die alte Seite zeigte Telefon und E-Mail im Klartext. Sie stehen damit
  wahrscheinlich schon in Sammlerlisten; der Schutz der neuen Seite
  verhindert nur neues Sammeln.
- Six Hands Marker gibt es im Adobe-Kit nur im Schnitt 400. Überall,
  wo sie fett gesetzt ist, fettet der Browser künstlich. Einheitlich
  festlegen (Stand 28. September 2026: teils fett, teils normal).
- Trustindex lädt `loader.js` je Widget neu — dieselbe Datei, 89 KB pro
  Stück. Bei Trustindex nachfragen, ob mehrere Widgets über einen
  Loader gehen.
- Eine automatisierte Zugänglichkeitsprüfung ist nie gelaufen (axe
  oder Lighthouse).
- **Six Hands Marker (Adobe Fonts)** überträgt die IP jedes Besuchers an
  Adobe, rechtlich wie Google Fonts. Entscheidung vertagt (27. September
  2026): eigene Weblizenz zum Selbsthosten bei der Schriftschmiede,
  Ersatz durch eine freie Marker-Schrift oder Adobe behalten. Gehört in
  jedem Fall in die Datenschutzerklärung.
- Impressum und Datenschutz wollte Alexander vor dem Livegang prüfen
  lassen; beim Livegang am 29. September 2026 offen geblieben.

## Deployment

- Hosting: mittwald mStudio
- Projekt-ID: p-i7b2q9 (#Lernstabil)
- App-Installation: a-upf6k9, Node.js 22, Verzeichnis
  `/home/p-i7b2q9/html/lernstabil`. Seit 29. September 2026 die neue
  Seite; die alte ist gelöscht.
- Domain: `lernstabil.de` und `www.lernstabil.de` zeigen auf a-upf6k9
- Im Verzeichnis liegen nur `dist/`, `node_modules/`, `package.json`,
  `package-lock.json` und `.env` (SMTP-Werte und `HOST=0.0.0.0`; ohne
  HOST lauscht der Server nur auf localhost).
- Startbefehl (mStudio → App → Configuration → Start command):
  `node --env-file=.env dist/server/entry.mjs`. Per MCP
  (`mittwald_app_update`) kam die Änderung am 29. September 2026 nicht
  an, obwohl Erfolg gemeldet wurde; Alexander hat sie im mStudio gesetzt.
- Deploy: `npm run build`, dann per rsync `dist/` (mit `--delete`) in
  das Verzeichnis. Nur bei geänderten Abhängigkeiten zusätzlich
  `package.json` und `package-lock.json` und dort `npm ci --omit=dev`.
  SSH: `info@raster-rausch.de@a-upf6k9` auf
  `ssh.altgemeinde.project.host`.
- Neustart nach jedem Deploy, automatisch und ohne eigene Rückfrage
  (Alexander, 29. September 2026): per SSH `mittnitectl job restart
  node`. Das MCP hat kein Werkzeug dafür. Danach lernstabil.de abrufen.
- Nach einem Build den lokalen Dev-Server neu starten (`astro dev stop`,
  `astro dev --background`): Er verliert sonst `Astro.site` und zeigt
  eine Fehlerseite.
- Beim Neuaufsetzen nur die App-Installation ersetzen, **nicht das
  Projekt löschen**: Die Postfächer info@ und bewerbung@ hängen am
  Projekt.

## Repository

- GitHub:
- `main` = produktiv
- Sektionen auf `feature/<nr>-<name>`
