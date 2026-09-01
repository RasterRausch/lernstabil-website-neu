# Sektion: Hero (Startseite, 1)

**Status:** GESPERRT (1. September 2026; die Sperre wurde am selben Tag
einmal aufgehoben, um Zustände und mobile Reihenfolge nachzuziehen, und
danach wieder gesetzt)
<!-- GESPERRT heißt: nicht mehr anfassen, auch nicht refactoren.
     Änderungswunsch? Erst fragen. -->

Dieses Dokument beschreibt seit dem 1. September 2026 den **gebauten
Stand**, nicht mehr einen Vorschlag. Wo etwas noch offen ist, steht es
unter „Offene Fragen".

> **Nachtrag, 1. September 2026 — die Kopfzeile ist ausgezogen.**
> Sie ist jetzt eine eigene, seitenübergreifende Sektion mit eigener
> Spezifikation: `design/shared/sections/01-header/spec.md`. Der Hero
> beginnt unterhalb der roten Leiste. Alles, was hier zu Logo und
> Kopfzeile stand, gilt dort weiter und steht unten nur noch als
> Verweis.

## Stand der Umsetzung (1. September 2026)

Die Sektion ist aus dem Testmodus heraus und als Baustein gesetzt:

- **Komponente:** `src/components/sections/Hero.astro`
- **Eingebunden in:** `src/pages/index.astro`, innerhalb von `<main>`
- **Kopfleiste:** `src/components/sections/Header.astro`, sitzt im
  `BaseLayout` und damit über der Sektion, nicht in ihr
- **Bild:** `public/bilder/hero-schuelerin.png`, 1494 × 1628, mit
  Alphakanal. Herkunft und Nacharbeit stehen in `bildprompt.md`.
- **Tokens:** `src/styles/tokens.css` und `design/tokens.md` sind aus
  dieser Sektion gefüllt. Die Komponente enthält keine eigenen Farb-,
  Abstands- und Schriftwerte mehr.

Weggefallen sind `src/pages/test-hero.astro`,
`src/pages/test-logo.astro` und der Ordner `public/test/`. Das
Original-Logo liegt weiter als Maßvorlage unter `design/brand/logo.svg`.

**Zwei freie Pixelwerte sind absichtlich stehen geblieben**, weil sie
keine Rolle in der Skala sind, sondern Maße einer Zeichnung: das
Häkchen vor den drei Punkten (12 × 7 px, 2 px Strich, 28 px
Einrückung) und die 18 px Beschriftung der Knöpfe, an der der
Kontrastnachweis hängt.

## Zweck

- In wenigen Sekunden klarmachen: Einzelunterricht, online,
  deutschlandweit, ohne Vertrag.
- Zur Probestunde führen. Anruf ist der primäre Weg, die geführte
  Anfrage der zweite.
- Optisch sofort zeigen, dass dies kein Kettenangebot ist.

## Aufbau

**Desktop, zwei Spalten:**

1. **Über dem Hero** steht die rote Kopfleiste. Sie gehört nicht mehr
   zu dieser Sektion — siehe `design/shared/sections/01-header/spec.md`.
   Der Hero rechnet seine Mindesthöhe deshalb mit
   `calc(100svh - var(--leiste-h))`, damit Leiste und Hero zusammen eine
   Bildschirmhöhe ergeben. Der überstehende Logoblock ragt 10 bis 18 px
   in die Fläche des Hero hinein.
2. **Linke Spalte (etwa 55 %)**
   - Überschrift, zweistufig gesetzt:
     Zeile 1 groß: *ONLINE EINZELUNTERRICHT* (Versalien im Quelltext)
     Zeile 2 kleiner: *Ohne Vertrag, ohne Abo, ohne Kleingedrucktes.*
   - Unterzeile: *Ein fester Dozent, der Ihr Kind kennt.
     Deutschlandweit, per Video. Die erste Stunde ist kostenlos.*
   - Drei Punkte, untereinander, mit schlichtem Häkchen:
     Die ganze Stunde gehört einem Schüler · Ein fester Dozent, der
     bleibt · Sie entscheiden nach jeder Stunde neu
   - Zwei Aktionen nebeneinander:
     **primär** roter Knopf „0341 658 329 18" (Telefon)
     **sekundär** Knopf mit Umriss „Probestunde anfragen"
   - Darunter klein: *Mo bis Fr, 9 bis 20 Uhr*
3. **Rechte Spalte (etwa 45 %)**
   - Freigestelltes Motiv, unten von der Sektionskante angeschnitten,
     Haare und Schulter dürfen frei in die Fläche ragen. Kein Rahmen,
     keine Ecke, kein Schatten.

**Warum die Überschrift zweistufig ist:** Zeile 1 benennt das Angebot
und trägt die Displayschrift, Zeile 2 liefert das Argument und läuft auf
der Fließtextschrift. Der Wechsel der Schrift zwischen den beiden Zeilen
ersetzt den Größensprung, den eine einzige Schrift bräuchte.

**Fläche:** Über der Grundfarbe liegt ein radialer Lichtkegel, der das
Studiolicht im Foto fortsetzt — heller hinter der Person, nach außen
abfallend. Er läuft von `#2b2b2b` im Zentrum auf `#1a1a1a` in den Ecken,
also 17 Helligkeitsstufen Spanne. Steuerung über fünf Variablen auf
`.hero`:

| Variable | mobil | ab 1120 px | Bedeutung |
|---|---|---|---|
| `--licht-x` | 50 % | 72 % | Mitte waagerecht |
| `--licht-y` | 72 % | 42 % | Mitte senkrecht |
| `--licht-b` | 90 % | 62 % | Breite des Kegels |
| `--licht-h` | 55 % | 80 % | Höhe des Kegels |
| `--licht-staerke` | 0.075 | 0.075 | Deckkraft des Lichts |

Der Kegel wandert mit dem Motiv: unter 1120 px steht das Bild **unten**,
ab 1120 px rechts. Der mobile Wert lag bis zum 1. September 2026 bei
24 %, weil das Motiv dort oben stand.

**Obergrenze für die Stärke:** Die Freistellung ist auf dunklem Grund
entstanden, halbtransparente Haarpixel tragen Restdunkel. Je heller der
Kegel, desto eher zeichnet sich ein Saum um die Haare ab. Bei 0.075 ist
nichts sichtbar; deutlich darüber muss man genau hinsehen.

**Feinjustierung des Motivs** (nur ab 1120 px), Variablen auf `.motiv`:

| Variable | Wert | Bedeutung |
|---|---|---|
| `--motiv-hoehe` | 97 % | Höhe in Prozent der Spaltenhöhe. Weil das Bild rechts verankert ist, wächst es nach links und rückt damit näher an den Text. |
| `--motiv-rechts` | 48 px | Überstand über die rechte Kante des Inhalts |
| `--motiv-unten` | 0 px | Abstand zur Sektionskante. 0 = das Motiv wird angeschnitten. |

## Logo (festgelegt am 31. August 2026)

> **Umgezogen.** Das Logo sitzt seit dem 1. September 2026 in der
> Kopfleiste, nicht im Hero. Die Maßverhältnisse unten gelten
> unverändert weiter und sind in `Header.astro` umgesetzt. **Neu
> hinzugekommen:** Rundung `radius-sm` und ein kleiner Schatten, damit
> sich der Block vom dunkleren Rot der Leiste absetzt.

Das Logo wird **nicht als SVG eingebunden, sondern in CSS nachgebaut.**
Grund: Als Text bleibt es in Größe, Farbe und Zeilenführung frei
steuerbar, skaliert ohne zweite Datei und lässt sich später ohne neue
Grafik ändern. `design/brand/logo.svg` bleibt als Referenz und
Maßvorlage liegen.

**Aufbau:** roter Block, darin zwei Zeilen weiß — Wortmarke
*#Lernstabil*, darunter *Nachhilfe bequem von zu Hause!*

**Schrift:** Comic Neue Bold (700), selbst gehostet unter
`public/fonts/comic-neue-700-latin.woff2`. Herkunft, Version und Lizenz
stehen in `design/type/comic-neue.md`. Keine Laufzeitverbindung zu
Google.

**Maßverhältnisse**, abgemessen am Original-SVG (Block 324 × 110,86).
Alle Werte sind Bruchteile der Blockbreite `--logo-b`; der Block trägt
`font-size: var(--logo-b)`, dadurch ist 1em = Blockbreite und das ganze
Logo skaliert über eine einzige Zahl.

| Eigenschaft | Wert |
|---|---|
| Seitenverhältnis Block | 324 : 110,86 |
| Innenabstand | `0.0279em` oben, `0.0621em` rechts, `0.0481em` unten, `0.0571em` links — oben und unten kommt seit dem 1. September 2026 `--logo-luft` (`0.016em`) hinzu, siehe Header-Spezifikation |
| Abstand zwischen den Zeilen | `0.01157em` |
| Wortmarke | `font-size: 0.18691em`, `letter-spacing: -0.02em` |
| Unterzeile | `font-size: 0.06765em`, `letter-spacing: -0.033em`, `word-spacing: 0.0103em` |
| Zeilenhöhe | 1 |

**Größe je Breakpoint** — Blockbreite `--logo-b`:

| Breakpoint | Blockbreite | ergibt Höhe |
|---|---|---|
| mobil | 180 px | 62 px |
| ab 768 px | 210 px | 72 px |
| ab 1120 px | 240 px | 82 px |

**Abweichung vom Original:** Comic Neue ist nicht die Schrift des
Original-Logos. Das Verhältnis x-Höhe zu Oberlänge liegt im SVG bei
0,66, bei Comic Neue Bold bei 0,74 — die Kleinbuchstaben sind also
etwas größer —, und das `#` ist anders gebaut (senkrechte statt
schräger Striche). Der Nachbau ist auf die Oberlänge kalibriert und in
der Laufweite so angeglichen, dass beide Zeilen dieselbe Breite
erreichen wie im SVG.

## Hierarchie

1. Überschrift Zeile 1 — Type-Stufe `display`, Six Hands Marker
2. Motiv — zieht den Blick über das Randlicht
3. Roter Telefon-Knopf — einziger gesättigter Farbfleck der Sektion
4. Unterzeile — `body`, aufgehellt
5. Die drei Punkte — `body`
6. Öffnungszeiten — `small`, gedämpft

**Neue Fassung seit dem 1. September 2026**, weil über dem Hero jetzt
eine rote Leiste steht:

- **Gesättigtes Rot** (`#ff0000`) trägt zwei Flächen: den Logoblock in
  der Kopfleiste und den primären Telefon-Knopf im Hero. Nicht die
  Häkchen, nicht die Überschrift.
- **Gedecktes Rot** (`#b3000f`) ist die Fläche der Kopfleiste und
  bleibt ihr vorbehalten.

Innerhalb des Hero gilt weiterhin: genau ein roter Fleck, der Knopf.
Der Logoblock steht darüber in der Leiste.

## Farben (Vorschlag, wird zu `design/tokens.md`)

| Rolle | Wert | Verwendung hier |
|---|---|---|
| `bg` | `#1a1a1a` | Fläche der Sektion |
| `text` | `#ffffff` | Überschrift, Punkte |
| `text-muted` | `#b0b0b0` | Unterzeile, Öffnungszeiten |
| `accent` | `#ff0000` | primärer Knopf |
| `accent-dark` | `#b3000f` | Fläche der Kopfleiste (Header-Sektion) |
| `accent-contrast` | `#ffffff` | Beschriftung auf dem roten Knopf |
| `border` | `#3a3a3a` | Umriss des sekundären Knopfes |

**Zum Kontrast auf dem roten Knopf:** Weiß auf `#ff0000` erreicht nur
4,0:1 und reicht für Beschriftungen in normaler Größe nicht (nötig sind
4,5:1). Gebaut ist trotzdem Weiß — zulässig, weil die Beschriftung mit
**18 px in Schnitt 600** gesetzt ist und damit als große Schrift gilt;
dafür genügen 3:1. Die Bedingung ist also die Größe: Wird die
Knopfbeschriftung jemals kleiner oder leichter, ist der Kontrast
verletzt.

Die dunkle Alternative bleibt bestehen: `#1a1a1a` auf `#ff0000`
erreicht 5,25:1 und wäre unabhängig von der Größe sauber.

Rote Schrift auf `#1a1a1a` erreicht 4,35:1 — für große Überschriften
zulässig, für Fließtext nicht. Deshalb kein roter Text in dieser
Sektion.

## Type-Scale (Vorschlag, gilt danach für die ganze Seite)

| Stufe | mobil | Desktop | Zeilenhöhe | Schnitt | Schrift |
|---|---|---|---|---|---|
| `display` | 64 px | 64 px | 1,05 | 700 | Six Hands Marker |
| `h2` | 26 px | 26 px | 1,2 | 600 | Source Sans 3 |
| `body` | 17 px | 18 px | 1,6 | 400 | Source Sans 3 |
| `small` | 15 px | 15 px | 1,5 | 400 | Source Sans 3 |

Zeile 1 der Überschrift läuft auf `display`, Zeile 2 auf `h2`.

**`display` und `h2` haben keine getrennten Werte für mobil und
Desktop.** Die Überschreibungen im Breakpoint ab 768 px wurden am
1. September 2026 entfernt; es gilt auf allen Breiten derselbe Wert.

Die Stufen `h1` und `h3` sind in dieser Sektion nicht belegt und werden
festgelegt, wenn die erste Sektion sie braucht.

**Schriften**

| Rolle | Schrift | Bezug |
|---|---|---|
| `font-display` | Six Hands Marker | Adobe Fonts, Kit `chw4hpk` — siehe `design/type/six-hands-marker.md` |
| `font-body` | Source Sans 3 | Google Fonts, Schnitte 400, 600, 700 |
| Logo | Comic Neue Bold | selbst gehostet — siehe `design/type/comic-neue.md` |

## Abstände

Spacing-Skala (Vorschlag, Basis 4 px):

| Stufe | Wert |
|---|---|
| `3xs` | 4 px |
| `2xs` | 8 px |
| `xs` | 12 px |
| `sm` | 16 px |
| `md` | 24 px |
| `lg` | 32 px |
| `xl` | 48 px |
| `2xl` | 72 px |
| `3xl` | 112 px |

- Abstand nach oben (Unterkante der Leiste bis Überschrift): `3xl`
  Desktop, `2xl` mobil. Der mobile Wert ist seit dem 1. September 2026
  auch tatsächlich gebaut — vorher stand dort das Motiv und es gab
  keinen oberen Abstand.
- Aktionen zum Motiv (nur mobil): `2xl`, als untere Innenkante der
  Textspalte
- Abstand nach unten (Aktionen bis Sektionsende): `3xl` Desktop, `2xl` mobil
- Textspalte ab 1120 px: `flex: 0 0 55%`, kein Abstand zur Bildspalte (`gap: 0`)
- Überschrift Zeile 1 zu Zeile 2: `xs`
- Überschrift zu Unterzeile: `md`
- Unterzeile zu Punkteliste: `lg`
- zwischen den drei Punkten: `xs`
- Punkteliste zu Aktionen: `xl`
- zwischen den beiden Knöpfen: `sm`
- Aktionen zu Öffnungszeiten: `sm`
- Innenabstand Knöpfe: `xs` oben und unten, `lg` links und rechts

## Container

- Maximale Inhaltsbreite: 1280 px
- Seitenabstand mobil: 20 px
- Seitenabstand Desktop: 48 px

## Radien

| Rolle | Wert |
|---|---|
| `radius-sm` | 4 px |
| `radius-md` | 10 px |
| `radius-full` | 999 px |

Knöpfe laufen auf `radius-sm`. Begründung: Stark abgerundete Knöpfe
sind das häufigste Baukasten-Merkmal. Eine kleine Rundung wirkt
entschiedener.

## Zustände

**Gebaut am 1. September 2026.** Vorher gab es keine eigenen Regeln für
Hover, Fokus und Aktiv — es galt der Browser-Standard, in Chrome eine
1 px blaue Linie ohne Abstand, die auf dem roten Knopf kaum zu erkennen
ist.

**Die abgedunkelten Flächen sind aus den Tokens abgeleitet**, nicht frei
gewählt: Hover ist `accent-dark`, Aktiv dieselbe Farbe noch einmal um
15 % abgedunkelt (`color-mix`). Ein dritter Rotwert kommt nicht in die
Palette.

**Primärer Knopf (rot)**
- Ruhe: Fläche `accent`, Beschriftung `accent-contrast`, 18 px im Schnitt 600
- Hover: Fläche `accent-dark`, kein Vergrößern, kein Schatten
- Fokus: Ring außen, 2 px `text`, mit 2 px Abstand
- Aktiv: `accent-dark` um 15 % abgedunkelt, 1 px nach unten versetzt

**Sekundärer Knopf (Umriss)**
- Ruhe: Umriss `border`, Beschriftung `text`
- Hover: Umriss `text`
- Fokus: wie oben
- Aktiv: Fläche minimal aufgehellt, 1 px nach unten versetzt

Der Fokusring greift auf `:focus-visible`, erscheint also bei
Tastaturbedienung und nicht beim Klicken mit der Maus.

Ladezustand und Leerzustand entfallen — die Sektion ist statisch.

## Verhalten je Breakpoint

- **mobil (bis 767 px):** einspaltig. Reihenfolge: Überschrift,
  Unterzeile, Punkte, Aktionen — **dann** das Motiv, unten von der
  Sektionskante angeschnitten. Die beiden Knöpfe stehen untereinander
  und laufen über die volle Breite. Ziel: Der Telefon-Knopf ist ohne
  Scrollen sichtbar.

  > **Geändert am 1. September 2026, Ziel jetzt erreicht.** Bis dahin
  > stand das Motiv oben. Mit 425 px Höhe schob es den Telefon-Knopf
  > auf 1009 px — auf einem 390 × 844 großen Handy 165 px unter die
  > Falte. Gemessen wurden vier Auswege:
  >
  > | Variante | Bildhöhe | Knopf oben |
  > |---|---|---|
  > | Motiv oben, wie bisher | 425 px | 1009 px |
  > | Motiv oben, auf 260 px gedeckelt | 260 px | 844 px |
  > | Motiv oben, auf 180 px gedeckelt | 180 px | 764 px |
  > | **Motiv unter den Text** | **425 px** | **624 px** |
  >
  > Gewählt wurde die letzte Zeile: Sie kommt ohne Beschnitt des Motivs
  > aus und wirkt auch auf kleinen Geräten. Preis dafür ist, dass mobil
  > zuerst Schrift zu sehen ist und nicht das Gesicht.
  >
  > **Rest:** Auf einem iPhone SE (375 × 667) beginnt der Knopf bei
  > 624 px und ist sichtbar, seine unteren 10 px liegen aber knapp
  > unter der Falte. Zwei Stellschrauben dafür wären der obere Abstand
  > (`2xl` → `xl`) oder der Abstand Punkteliste zu Aktionen
  > (`xl` → `lg`). Beides sind Abstände aus der Spezifikation und
  > deshalb nicht ohne Freigabe geändert.
- **md (ab 768 px):** weiter einspaltig, größere Typografie, Knöpfe
  nebeneinander.
- **lg (ab 1120 px):** zweispaltig wie oben beschrieben, Text links,
  Motiv rechts.

## Offene Fragen

Die Sektion ist gesperrt. Diese Punkte bleiben trotzdem offen — jeder
davon ist eine Änderung an einer gesperrten Sektion und braucht eine
Freigabe.

1. **Beschriftung des Blattes.** Das Motiv ist entschieden: Mädchen,
   lachend, Blatt vor der Brust, unten angeschnitten. Das Blatt ist
   derzeit **leer**. Zu entscheiden, was daraufkommt — die drei
   Möglichkeiten stehen in `bildprompt.md` unter „Was auf das Blatt
   gehört". Empfehlung dort: Variante B, ein Lernplan statt einer Note,
   weil eine Note auf dem Blatt exakt die Mechanik des
   Studienkreis-Plakats ist.
2. ~~Roter Logoblock gegen roten Knopf.~~ **Erledigt am 1. September
   2026.** Der Logoblock ist aus dem Hero heraus in die Kopfleiste
   gewandert. Er behält `accent`, steht aber nicht mehr in derselben
   Sektion wie der Knopf. Im Hero selbst ist der Knopf jetzt wieder der
   einzige rote Fleck.
3. ~~Fokusringe im Hero fehlen.~~ **Erledigt am 1. September 2026.**
   Hover, Fokus und Aktiv sind für beide Knöpfe gebaut.
4. **Datenschutz bei Six Hands Marker.** Die Schrift kommt von Adobe
   Fonts und darf nicht selbst gehostet werden. Bei jedem Seitenaufruf
   geht eine Anfrage an `use.typekit.net`, dabei wird die IP-Adresse des
   Besuchers übertragen. Cookies setzt Adobe dafür nicht. Im Briefing
   steht „möglichst kein Banner" — zu klären, bevor die Seite live geht.
   Ausweg: die Hauptzeile als SVG in Pfaden, echter Text bleibt im
   `<h1>`. Einzelheiten in `design/type/six-hands-marker.md`.
5. ~~Navigation: Welche Punkte stehen in der Kopfzeile?~~ **Erledigt am
   1. September 2026:** Fächer, Dozent werden, Warum #Lernstabil,
   Preise. Steht in der Header-Spezifikation.
6. **Anschluss nach unten:** Sektion 2 ist die Vertrauensleiste. Bleibt
   sie dunkel, oder wechselt die Seite dort auf hell?
7. **Blau:** In dieser Sektion kommt `#1f4e98` nicht vor. Ist das so
   gewollt, oder soll es hier eine Rolle bekommen?
