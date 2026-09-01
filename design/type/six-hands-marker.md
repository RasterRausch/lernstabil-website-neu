# Six Hands Marker

Verwendung: **ausschließlich** die Hauptzeile im Hero (`.zeile1`).
Alle übrigen Überschriften und der Fließtext laufen auf Source Sans 3.

- **Gestalter:** Alexandra Korolkova und Alexander Lubovenko, ParaType
- **Bezug:** Adobe Fonts, über das Abo von Alexander abgedeckt
- **Web-Projekt:** Kit `chw4hpk`, eingebunden über
  `https://use.typekit.net/chw4hpk.css`
- **CSS-Name:** `six-hands-marker`, Schnitt 400 normal
- **Zeichenabdeckung:** geprüft am 1. September 2026 — `ä ö ü Ä Ö Ü ß é –`
  alle vorhanden

## Was dabei zu beachten ist

**Selbst hosten ist nicht erlaubt.** Adobe-Fonts-Webfonts müssen über
das Kit von Adobes Servern ausgeliefert werden. Anders als bei Comic
Neue liegt die Datei deshalb nicht im Projekt.

**Daraus folgt ein offener Punkt:** Bei jedem Seitenaufruf geht eine
Anfrage an `use.typekit.net`, dabei wird die IP-Adresse des Besuchers an
Adobe übertragen. Cookies setzt Adobe dafür nicht (geprüft, kein
`Set-Cookie`), aber die Übertragung selbst ist der Punkt, an dem im
Briefing „möglichst kein Banner" steht. Zu klären, bevor die Seite live
geht.

**Ausweg, falls die Entscheidung gegen den Fremdaufruf fällt:** Die
Hauptzeile in Illustrator setzen, in Pfade umwandeln und als SVG
einbinden. Der echte Text muss dann trotzdem als `<h1>` im Quelltext
stehen, sonst geht die Überschrift für Suchmaschinen und Screenreader
verloren.

**Das Kit enthält mehr als nötig.** Stand 1. September 2026 liegen 18
Familien darin, darunter die ganze Eds-Market-Sippe, chalky, active,
brushtones und six-hands-rough. Vor dem Livegang auf
`six-hands-marker` und gegebenenfalls `source-sans-3` eindampfen.
