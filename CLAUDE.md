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

## Offene Punkte vor dem Livegang

- Nach dem Deploy einmal echt über das Formular absenden. Die
  Herkunftsprüfung von Astro verlässt sich darauf, dass der Proxy von
  mittwald `X-Forwarded-Proto: https` sendet (`security.allowedDomains`
  in `astro.config.mjs`). Kommt 403 zurück, liegt es daran.
- Die IP-Begrenzung nimmt den letzten Eintrag aus `X-Forwarded-For`.
  Nach dem Deploy einmal prüfen, wie mittwald die Kopfzeile befüllt.
- Sicherheits-Header (HSTS, nosniff, Referrer-Policy, frame-ancestors)
  setzt der Node-Adapter nicht. Bei mittwald prüfen, was der Proxy
  setzt, sonst ergänzen.
- Die alte Seite zeigt Telefon und E-Mail im Klartext (Startseite,
  Impressum). Sie stehen damit wahrscheinlich schon in Sammlerlisten;
  der Schutz der neuen Seite verhindert nur neues Sammeln.
- Six Hands Marker gibt es im Adobe-Kit nur im Schnitt 400. Überall,
  wo sie fett gesetzt ist, fettet der Browser künstlich. Einheitlich
  festlegen (Stand 28. September 2026: teils fett, teils normal).
- Trustindex lädt `loader.js` je Widget neu — dieselbe Datei, 89 KB pro
  Stück. Bei Trustindex nachfragen, ob mehrere Widgets über einen
  Loader gehen.
- Das Trustindex-Zertifikats-Widget (`loader-cert.js`) ist an die
  Domain gebunden und zeigt außerhalb von `lernstabil.de` eine
  englische Fehlermeldung. Nach dem Livegang prüfen.
- Eine automatisierte Zugänglichkeitsprüfung ist nie gelaufen. Vor dem
  Livegang axe oder Lighthouse.
- **Six Hands Marker (Adobe Fonts)** überträgt die IP jedes Besuchers an
  Adobe, rechtlich wie Google Fonts. Entscheidung vertagt (27. September
  2026): eigene Weblizenz zum Selbsthosten bei der Schriftschmiede,
  Ersatz durch eine freie Marker-Schrift oder Adobe behalten.
- Impressum und Datenschutz lässt Alexander vor dem Livegang prüfen.
- SMTP-Werte (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS) als
  Umgebungsvariablen der App auf mittwald eintragen. Lokal mit `.env`
  am 28. September 2026 erfolgreich getestet (Produktionsbuild,
  Eingang in info@ bestätigt).

## Deployment

- Hosting: mittwald mStudio
- Projekt-ID: p-i7b2q9 (#Lernstabil)
- App-Installation: a-upf6k9, Node.js (Stand 27. September 2026: alte
  Seite, Startbefehl `node build/index.js`)
- Domain: `lernstabil.de` und `www.lernstabil.de` zeigen auf a-upf6k9
  (aktuell noch die alte Seite)
- Build: `npm run build` → `dist/client` (statisch) und `dist/server`
- Start: `node dist/server/entry.mjs` (Port über `PORT`)
- Beim Neuaufsetzen nur die App-Installation ersetzen, **nicht das
  Projekt löschen**: Die Postfächer info@ und bewerbung@ hängen am
  Projekt.

## Repository

- GitHub:
- `main` = produktiv
- Sektionen auf `feature/<nr>-<name>`
