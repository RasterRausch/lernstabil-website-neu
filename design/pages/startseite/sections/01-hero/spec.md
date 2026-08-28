# Sektion: Hero (Startseite, 1)

**Status:** in Arbeit

Referenzbild: noch keins. Grundlage sind die Festlegungen aus
`recherche.md` und die Entscheidung vom 27. August 2026:
dunkelgraue Fläche `#1a1a1a`, freigestelltes Motiv ohne Bildkasten,
Bewegung ohne die Lautstärke des Studienkreis-Motivs.

Alles unten ist **Vorschlag zur Korrektur**, nicht Festlegung. Was du
bestätigst, wird gebaut. Die Zahlen sind das, was ich aus der
Entscheidung ableite — korrigier sie, wo du andere willst.

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
     Zeile 1 groß: *Einzelunterricht online.*
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

**Warum die Überschrift zweistufig ist:** Der Satz ist für eine
einzige Größe zu lang — bei Anzeigengröße bräuchte er vier bis fünf
Zeilen und verlöre jede Wucht. Zwei Stufen innerhalb derselben
Überschrift lösen das und geben dem zweiten Teil Betonung.

## Hierarchie

1. Überschrift Zeile 1 — Type-Stufe `display`, Fraunces
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
| `accent-contrast` | `#1a1a1a` | Beschriftung auf dem roten Knopf |
| `border` | `#3a3a3a` | Umriss des sekundären Knopfes |

**Ein Kontrastproblem, das gelöst werden muss:** Weiß auf `#ff0000`
erreicht nur 4,0:1 und reicht für Beschriftungen in normaler Größe
nicht (nötig sind 4,5:1). Dunkelgrau `#1a1a1a` auf `#ff0000` erreicht
5,25:1 und ist sauber. Deshalb steht oben die dunkle Beschriftung auf
dem roten Knopf. Das ist zugleich das ungewöhnlichere und stärkere
Bild. Alternative, falls du Weiß willst: Beschriftung ab 18 px fett
setzen, dann gilt die Schwelle für große Schrift und Weiß reicht.

Rote Schrift auf `#1a1a1a` erreicht 4,35:1 — für große Überschriften
zulässig, für Fließtext nicht. Deshalb kein roter Text in dieser
Sektion.

## Type-Scale (Vorschlag, gilt danach für die ganze Seite)

| Stufe | mobil | Desktop | Zeilenhöhe | Schrift |
|---|---|---|---|---|
| `display` | 40 px | 72 px | 1,05 | Fraunces |
| `h1` | 32 px | 48 px | 1,15 | Fraunces |
| `h2` | 26 px | 36 px | 1,2 | Fraunces |
| `h3` | 20 px | 24 px | 1,3 | Fraunces |
| `body` | 17 px | 18 px | 1,6 | Source Sans 3 |
| `small` | 15 px | 15 px | 1,5 | Source Sans 3 |

Zeile 2 der Überschrift läuft auf `h2`, Zeile 1 auf `display`.

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
- Überschrift Zeile 1 zu Zeile 2: `2xs`
- Überschrift zu Unterzeile: `md`
- Unterzeile zu Punkteliste: `lg`
- zwischen den drei Punkten: `xs`
- Punkteliste zu Aktionen: `xl`
- zwischen den beiden Knöpfen: `sm`
- Aktionen zu Öffnungszeiten: `sm`
- Innenabstand Knöpfe: `sm` oben und unten, `lg` links und rechts

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

**Primärer Knopf (rot)**
- Ruhe: Fläche `#ff0000`, Beschriftung `#1a1a1a`
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
- **md (ab 768 px):** weiter einspaltig, größere Typografie, Knöpfe
  nebeneinander.
- **lg (ab 1120 px):** zweispaltig wie oben beschrieben, Text links,
  Motiv rechts.

## Offene Fragen

1. **Motiv:** Mädchen oder Junge, welches Alter? Und soll das leere
   Blatt im Bild bleiben — wenn ja, was wird später daraufgesetzt?
2. **Logo auf dunklem Grund:** Die Wortmarke ist weiß auf rotem Block.
   Bleibt der rote Kasten auf `#1a1a1a` stehen, oder brauchen wir eine
   Fassung ohne Kasten? Der Kasten wäre der zweite rote Fleck in der
   Sektion und stünde in Konkurrenz zum Knopf.
3. **Beschriftung des roten Knopfes:** dunkel wie vorgeschlagen, oder
   weiß und dafür größer und fett?
4. **Navigation:** Welche Punkte stehen in der Kopfzeile? Bisher gibt es
   Preise, Kontakt und Für Dozenten.
5. **Anschluss nach unten:** Sektion 2 ist die Vertrauensleiste. Bleibt
   sie dunkel, oder wechselt die Seite dort auf hell?
6. **Blau:** In dieser Sektion kommt `#1f4e98` nicht vor. Ist das so
   gewollt, oder soll es hier eine Rolle bekommen?
