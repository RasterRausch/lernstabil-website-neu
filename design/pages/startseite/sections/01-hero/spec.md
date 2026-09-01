# Sektion: Hero (Startseite, 1)

**Status:** in Arbeit — gebaut und in Abstimmung, noch nicht gesperrt.

Dieses Dokument beschreibt seit dem 1. September 2026 den **gebauten
Stand**, nicht mehr einen Vorschlag. Wo etwas noch offen ist, steht es
unter „Offene Fragen".

## Stand der Umsetzung (1. September 2026)

Die Sektion existiert **ausschließlich als Testseite**, nicht als
Baustein:

- **Datei:** `src/pages/test-hero.astro`, erreichbar unter `/test-hero`.
  Markup und sämtliche CSS-Regeln liegen in dieser einen Datei.
- **Keine Komponente.** `src/components/sections/` ist leer,
  `src/pages/index.astro` enthält nur ein leeres `<main>`.
- **Keine Tokens.** Farben, Abstände und Schriften stehen lokal im
  `:root` der Testseite. `design/tokens.md` und `src/styles/tokens.css`
  sind bewusst noch leer — sie werden gefüllt, wenn diese Sektion
  gesperrt wird.
- **Bild:** `public/test/hero-version-1-a4-3.png`, 1494 × 1628, mit
  Alphakanal. Herkunft und Nacharbeit stehen in `bildprompt.md`.
- **Zweite Testseite:** `src/pages/test-logo.astro` vergleicht den
  CSS-Nachbau des Logos mit dem Original-SVG. Kann gelöscht werden,
  sobald das Logo abgenommen ist.

Beim Überführen in eine Komponente fallen beide Testseiten und der
Ordner `public/test/` weg.

## Zweck

- In wenigen Sekunden klarmachen: Einzelunterricht, online,
  deutschlandweit, ohne Vertrag.
- Zur Probestunde führen. Anruf ist der primäre Weg, die geführte
  Anfrage der zweite.
- Optisch sofort zeigen, dass dies kein Kettenangebot ist.

## Aufbau

**Desktop, zwei Spalten:**

1. **Kopfzeile** liegt ohne eigenen Hintergrund auf der dunklen Fläche —
   Logo links, Navigation mittig, Telefonnummer rechts. Der Hero beginnt
   also am oberen Seitenrand, es gibt keine abgesetzte Leiste.
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
| `--licht-y` | 24 % | 42 % | Mitte senkrecht |
| `--licht-b` | 90 % | 62 % | Breite des Kegels |
| `--licht-h` | 55 % | 80 % | Höhe des Kegels |
| `--licht-staerke` | 0.075 | 0.075 | Deckkraft des Lichts |

Der Kegel wandert mit dem Motiv: mobil steht das Bild oben, ab 1120 px
rechts.

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
| Innenabstand | `0.0279em` oben, `0.0621em` rechts, `0.0481em` unten, `0.0571em` links |
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

Rot kommt in dieser Sektion **genau einmal** vor: am primären Knopf.
Nicht an den Häkchen, nicht in der Überschrift.

## Farben (Vorschlag, wird zu `design/tokens.md`)

| Rolle | Wert | Verwendung hier |
|---|---|---|
| `bg` | `#1a1a1a` | Fläche der Sektion |
| `text` | `#ffffff` | Überschrift, Punkte |
| `text-muted` | `#b0b0b0` | Unterzeile, Öffnungszeiten |
| `accent` | `#ff0000` | primärer Knopf |
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

- Abstand nach oben (Kopfzeile bis Überschrift): `3xl` Desktop, `2xl` mobil
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

> **Nicht gebaut.** Stand 1. September 2026 enthält die Testseite
> **keine** Regeln für Hover, Fokus und Aktiv. Der fehlende Fokusring
> ist ein echter Mangel für die Tastaturbedienung und muss vor dem
> Livegang nachgezogen werden. Was unten steht, ist die Vorgabe dafür.

**Primärer Knopf (rot)**
- Ruhe: Fläche `#ff0000`, Beschriftung `#ffffff`, 18 px im Schnitt 600
- Hover: Fläche etwas abgedunkelt, kein Vergrößern, kein Schatten
- Fokus: sichtbarer heller Ring außen, 2 px, mit 2 px Abstand
- Aktiv: Fläche weiter abgedunkelt, 1 px nach unten versetzt

**Sekundärer Knopf (Umriss)**
- Ruhe: Umriss `#3a3a3a`, Beschriftung weiß
- Hover: Umriss weiß
- Fokus: wie oben
- Aktiv: leicht aufgehellte Fläche

**Telefonnummer in der Kopfzeile**
- immer sichtbar, auch mobil, als eigener Knopf

Ladezustand und Leerzustand entfallen — die Sektion ist statisch.

## Verhalten je Breakpoint

- **mobil (bis 767 px):** einspaltig. Reihenfolge: Motiv oben, von der
  oberen Kante angeschnitten, dann Überschrift, Unterzeile, Punkte,
  Aktionen. Die beiden Knöpfe stehen untereinander und laufen über die
  volle Breite. Ziel: Der Telefon-Knopf ist ohne Scrollen sichtbar.

  > **Dieses Ziel ist nicht erreicht.** Gemessen am 1. September 2026 bei
  > 390 px Breite steht die Oberkante des Telefon-Knopfes bei rund
  > 1010 px, also deutlich unter der Falte. Ursache ist die Höhe des
  > Motivs, das im Hochformat rund 425 px einnimmt. Lösung wäre, das
  > Motiv mobil auf eine feste Höhe zu deckeln. Auf einer Ads-
  > Landingpage ist das der teuerste offene Punkt der Sektion.
- **md (ab 768 px):** weiter einspaltig, größere Typografie, Knöpfe
  nebeneinander.
- **lg (ab 1120 px):** zweispaltig wie oben beschrieben, Text links,
  Motiv rechts.

## Offene Fragen

1. **Beschriftung des Blattes.** Das Motiv ist entschieden: Mädchen,
   lachend, Blatt vor der Brust, unten angeschnitten. Das Blatt ist
   derzeit **leer**. Zu entscheiden, was daraufkommt — die drei
   Möglichkeiten stehen in `bildprompt.md` unter „Was auf das Blatt
   gehört". Empfehlung dort: Variante B, ein Lernplan statt einer Note,
   weil eine Note auf dem Blatt exakt die Mechanik des
   Studienkreis-Plakats ist.
2. **Roter Logoblock gegen roten Knopf:** Der Kasten bleibt vorerst
   stehen, ist durch die Vergrößerung auf 180/210/240 px aber deutlich
   präsenter geworden — er hat mehr Fläche als der primäre
   Telefon-Knopf und zieht den Blick zuerst. Damit kommt Rot in der Sektion zweimal groß vor,
   entgegen der Festlegung unter „Hierarchie". Zu entscheiden: Fassung
   ohne Kasten auf dunklem Grund, oder andere Behandlung des primären
   Knopfes.
3. **Datenschutz bei Six Hands Marker.** Die Schrift kommt von Adobe
   Fonts und darf nicht selbst gehostet werden. Bei jedem Seitenaufruf
   geht eine Anfrage an `use.typekit.net`, dabei wird die IP-Adresse des
   Besuchers übertragen. Cookies setzt Adobe dafür nicht. Im Briefing
   steht „möglichst kein Banner" — zu klären, bevor die Seite live geht.
   Ausweg: die Hauptzeile als SVG in Pfaden, echter Text bleibt im
   `<h1>`. Einzelheiten in `design/type/six-hands-marker.md`.
4. **Navigation:** Welche Punkte stehen in der Kopfzeile? Bisher gibt es
   Preise, Kontakt und Für Dozenten.
5. **Anschluss nach unten:** Sektion 2 ist die Vertrauensleiste. Bleibt
   sie dunkel, oder wechselt die Seite dort auf hell?
6. **Blau:** In dieser Sektion kommt `#1f4e98` nicht vor. Ist das so
   gewollt, oder soll es hier eine Rolle bekommen?
