# Sektion: Header (seitenübergreifend, 1)

**Status:** GESPERRT (1. September 2026; die Sperre wurde am selben Tag
einmal aufgehoben, um die Telefonnummer auf `body` zu setzen, dem
Logoblock oben und unten mehr Luft zu geben und die beiden oberen Ecken
wieder eckig zu stellen, und danach wieder gesetzt)
<!-- GESPERRT heißt: nicht mehr anfassen, auch nicht refactoren.
     Änderungswunsch? Erst fragen. -->

Referenz: Kopfzeile von studienkreis.de, am 1. September 2026 als
Screenshot geliefert. Übernommen wird die **Grundfigur**, nicht die
Marke: rote Vollbreitenleiste, Logoblock der unten heraushängt, weiße
fett-kursive Navigation, rechts eine Gruppe aus Icon und Beschriftung.

Nicht übernommen: die Breadcrumb-Zeile darunter, Suche und Login.

## Zweck

- Die Telefonnummer auf der gesamten Landingpage erreichbar halten. Das
  ist die primäre Aktion der Seite, nicht die Navigation.
- Sofort ein Absender-Signal setzen: Marke und Farbe stehen vor allem
  anderen.
- Zu den vier Ankerpunkten der Startseite führen.

## Aufbau

Von links nach rechts, ab 1120 px:

1. **Logoblock.** Beginnt an der linken Kante des Inhaltsrasters, also
   bündig mit dem Text der Hero. Er trägt dieselbe Farbe wie die Leiste
   und hat deshalb nach oben, links und rechts keine sichtbare eigene
   Kontur — er ist nur dadurch erkennbar, dass er unten über die Leiste
   hinaushängt. Oberkante = Oberkante der Leiste.
2. **Navigation**, vier Textlinks, setzt nach dem Logoblock an und läuft
   nach rechts aus. Weiß, Schnitt 600, kursiv.
   - Fächer → `#faecher` (Startseite, Sektion 7)
   - Dozent werden → `/fuer-dozenten`
   - Warum #Lernstabil → `#warum` (Startseite, Sektion 4)
   - Preise → `#preise` (Startseite, Sektion 10)
3. **Kontaktgruppe**, rechtsbündig an der rechten Kante des
   Inhaltsrasters: Telefon-Icon, **daneben** die Telefonnummer
   `0341 658 329 18`, einzeilig. Gesamt ein einziger `tel:`-Link.

   **Abweichung zur Referenz:** Dort stehen Icon und Beschriftung
   übereinander. Einzeilig, weil zweizeilig in einer 64 px hohen Leiste
   gequetscht wirkt.

**Warum die Nummer ausgeschrieben dasteht** und nicht wie in der
Referenz nur das Wort „Kontakt": Auf einer Ads-Landingpage ist der
Anruf die Aktion. Eine Nummer, die man ablesen und vom Festnetz aus
wählen kann, ist mehr wert als ein Wort, hinter dem sie sich verbirgt.

## Farbe

| Rolle | Wert | Verwendung |
|---|---|---|
| `accent-dark` | `#b3000f` | Fläche der Leiste |
| `accent` | `#ff0000` | Fläche des Logoblocks, dazu der primäre Knopf im Hero |
| weiß | `#ffffff` | Logo, Navigation, Icon, Nummer |

`#b3000f` ist `#ff0000` abgedunkelt, derselbe Farbton. Weiß darauf
erreicht 7,2:1 und ist damit auch für die Nummer sauber.

**Der Logoblock trägt `accent`** und hebt sich damit vom dunkleren Rot
der Leiste ab. Damit die Kante nicht zufällig wirkt, bekommt er
zusätzlich Rundung und einen kleinen Schatten und liest sich als eigene
Fläche, die auf der Leiste liegt.

| Eigenschaft | Wert |
|---|---|
| Rundung | `radius-sm` = 4 px, **nur unten links und unten rechts** |
| Schatten | `--schatten-sm` = `0 2px 6px rgb(0 0 0 / 0.3)` |

Die beiden oberen Ecken bleiben eckig: Sie liegen bündig auf der
Oberkante der Leiste, dort sähe eine Rundung nach Fehler aus statt nach
Kante. Gerundet wird nur die Unterkante, die frei in den Inhalt ragt.

`--schatten-sm` ist eine **neue Rolle**. Bisher gab es im Projekt keinen
Schatten. Sie gehört bei der Ableitung der Tokens mit nach
`design/tokens.md`.

**Kontrast im Logoblock, offener Punkt.** Weiß auf `#ff0000` erreicht
nur 4,0:1. Die Wortmarke ist groß genug, dass 3:1 genügen — die
Unterzeile *Nachhilfe bequem von zu Hause!* nicht: Sie ist 12 px
(mobil) bis 16 px (ab 1120 px) groß und liegt damit unter der Grenze
von 18,66 px für fette Schrift. Auf `#b3000f` waren es 7,2:1, auf
`#ff0000` sind es 4,0:1 statt der nötigen 4,5:1. Das ist knapp daneben,
aber daneben. Zu entscheiden, siehe Offene Fragen.

### Folge für die Hero-Sektion

`design/pages/startseite/sections/01-hero/spec.md` legt unter
*Hierarchie* fest: „Rot kommt in dieser Sektion genau einmal vor." Mit
der Leiste gilt das so nicht mehr. Die neue Fassung:

- **Ein gesättigtes Rot** (`#ff0000`) auf der ganzen Seite: der primäre
  Telefon-Knopf im Hero.
- **Ein gedecktes Rot** (`#b3000f`) als Fläche: die Kopfleiste samt
  Logoblock.

Damit erledigt sich zugleich die offene Frage 2 der Hero-Spec (roter
Logoblock gegen roten Knopf): Der Logoblock ist nicht mehr der hellste
rote Fleck, der Knopf schon.

## Maße

| | mobil | ab 768 px | ab 1120 px |
|---|---|---|---|
| Höhe der Leiste (`--leiste-h`) | 52 px | 58 px | 64 px |
| Blockbreite Logo (`--logo-b`) | 180 px | 210 px | 240 px |
| ergibt Logohöhe | 67,3 px | 78,6 px | 89,8 px |
| ergibt Überstand nach unten | ~15 px | ~21 px | ~26 px |

Die Logobreiten sind unverändert aus der Hero-Spec übernommen. Der
Überstand ist keine eigene Zahl, sondern ergibt sich aus Logohöhe minus
Leistenhöhe. Wer eine der beiden Zahlen ändert, ändert den Überstand.

### Luft im Logoblock

Der Block ist seit dem 1. September 2026 oben und unten großzügiger
gesetzt als das Original-SVG. Gesteuert über **eine** Variable auf
`.logo`:

| Variable | Wert | Bedeutung |
|---|---|---|
| `--logo-luft` | `0.016em` | kommt oben und unten zum SVG-Innenabstand hinzu |

Wie überall im Logo ist `1em` = Blockbreite, der Wert skaliert also
mit. Bei 240 px Blockbreite sind das 3,8 px je Seite, der Block wächst
dadurch um 7,7 px. Bei `0` entspricht er wieder exakt dem SVG.

Die übrigen drei Innenabstände (links, rechts, Zeilenabstand) sind
unverändert aus dem SVG abgemessen.

Die Leiste ist vollbreit, ihr Inhalt läuft im Raster: maximale
Inhaltsbreite 1280 px, Seitenabstand 20 px mobil und 48 px ab 768 px.

## Typografie

| Element | Stufe | Größe | Schnitt | Lage |
|---|---|---|---|---|
| Navigation | `body` | 18 px | 600 | kursiv |
| Telefonnummer | `body` | 18 px | 600 | kursiv |
| Logo | — | über `--logo-b` gesteuert | 700 | aufrecht |

**Abweichung zur Referenz:** Dort wirkt die Navigation eher 19 bis
20 px groß. Wir bleiben bei `body` = 18 px, weil Größen außerhalb der
Type-Scale nicht vergeben werden.

Kursiv ist in der Referenz Teil der Markensprache und wird hier
übernommen — bisher der einzige kursive Satz im Projekt.

## Icon

Ein einziges Telefon-Icon, **inline als SVG im Markup**, selbst
gezeichnet. Keine Icon-Library, keine zusätzliche Datei, keine
Abhängigkeit.

- Umrisslinie, Strichstärke 2, runde Enden, `currentColor`
- 24 × 24 ab 768 px, 22 × 22 mobil
- `aria-hidden`, die Bedeutung trägt der Linktext

## Hierarchie

1. Logoblock — größte Fläche, sitzt links und hängt heraus
2. Telefonnummer rechts — einziges Element mit Icon
3. Navigation — gleichrangig untereinander, nachgeordnet

## Abstände

Alle Werte aus der Spacing-Skala.

- Logoblock zu Navigation: `xl` (48 px)
- zwischen den Navigationspunkten: `lg` (32 px)
- Icon zu Nummer: `2xs` (8 px), nebeneinander in einer Zeile
- Navigation zu Kontaktgruppe: mindestens `lg`, sonst freier Raum
- mobil zwischen Telefon-Icon und Burger: `sm` (16 px)

Die Leiste selbst hat keinen eigenen senkrechten Innenabstand — ihre
Höhe ist gesetzt, der Inhalt steht mittig darin. Nur der Logoblock ist
oben ausgerichtet, nicht mittig.

## Verhalten beim Scrollen

Die Leiste fährt mit: `position: sticky`, oben angeheftet, über allem
anderen. Grund: Die Telefonnummer soll auf der ganzen Seite erreichbar
bleiben.

**Bekannte Folge:** Der überstehende Logoblock schiebt sich beim
Scrollen über den Seiteninhalt — je nach Breakpoint 10 bis 18 px hoch
und 180 bis 240 px breit, links im Raster. Bewusst in Kauf genommen. Bei
Sektionen mit Text ganz links am Rasterrand ist das im Auge zu behalten.

Weil die Leiste im Fluss steht und Platz belegt, rechnet der Hero seine
Mindesthöhe mit `calc(100svh - var(--leiste-h))`.

## Zustände

**Navigationslinks**
- Ruhe: weiß, ohne Unterstreichung
- Hover: Unterstreichung, 2 px, mit 3 px Abstand zur Schrift
- Fokus: weißer Ring, 2 px, mit 2 px Abstand
- Aktiv (angeklickt): leicht gedämpftes Weiß

Einen Zustand „aktuelle Seite" gibt es nicht — die vier Ziele sind
Anker auf derselben Seite, außer „Dozent werden".

**Kontaktgruppe**
- Hover: Nummer unterstrichen, Icon unverändert
- Fokus: wie oben

**Burger-Knopf** (unter 1120 px)
- Fokus: wie oben
- geöffnet: `aria-expanded="true"`, Icon wird zum Kreuz

Lade- und Leerzustand entfallen.

## Verhalten je Breakpoint

- **mobil (bis 767 px):** Logo links. Rechts nur das Telefon-Icon als
  Link — ohne Nummer, dafür mit `aria-label` — und daneben der
  Burger-Knopf. Die Navigation klappt unter der Leiste als Liste auf,
  Fläche `accent-dark`, Punkte untereinander, linksbündig im Raster.
  Beim Öffnen wandert der Fokus auf den ersten Link, Escape schließt.
- **md (ab 768 px):** wie mobil, aber die Telefonnummer steht neben dem
  Icon ausgeschrieben. Burger bleibt.
- **lg (ab 1120 px):** volle Fassung. Navigation ausgeklappt, kein
  Burger. Kontaktgruppe unverändert einzeilig.

Das Aufklappen läuft über einen Knopf und rund zwanzig Zeilen
JavaScript im Astro-Markup. Kein Framework, keine Abhängigkeit.

## Umsetzung

- Komponente: `src/components/sections/Header.astro`
- Eingebunden in `src/layouts/BaseLayout.astro`, vor dem `<slot />`.
  Damit erscheint die Leiste auf **jeder** Seite, die dieses Layout
  benutzt — auch auf `/fuer-dozenten`, Impressum und Datenschutz. Das
  ist die Voreinstellung, siehe Offene Fragen.
- Die Komponente definiert keine eigenen Farb-, Abstands- und
  Schriftwerte, sondern nur die Variablen aus `src/styles/tokens.css`.
  Aus dieser Sektion stammen dort `--accent-dark`, `--schatten-sm` und
  `--leiste-h`.
- Grundreset und `@font-face` liegen global im `BaseLayout`.

**Freie Pixelwerte in der Komponente**, absichtlich, weil sie keine
Rolle in der Skala sind, sondern Maße einer Zeichnung: Icon 22 bzw.
24 px, Burger-Fläche 44 × 44 px als Mindestgröße für den Daumen,
Strichstärken von 2 px, Unterstreichung mit 3 px Abstand.

## Offene Fragen

1. **Der Logoblock hängt in den Hero.** Ab 1120 px sind das 18 px über
   der Bildkante des Motivs. Zu prüfen, ob das im Zusammenspiel mit dem
   Lichtkegel sauber aussieht.
2. **Hintergrund der aufgeklappten Navigation.** Derzeit dieselbe Farbe
   wie die Leiste. Alternative wäre die dunkle Grundfarbe `#1a1a1a`.
3. **Fächer, Warum #Lernstabil und Preise zeigen ins Leere**, solange
   die Sektionen 4, 7 und 10 nicht gebaut sind. Die Anker-Namen sind
   gesetzt, die Sektionen müssen sie später tragen.
4. **Kontrast der Logo-Unterzeile.** Weiß auf `#ff0000` erreicht 4,0:1,
   nötig sind 4,5:1. Drei Wege: die Unterzeile auf `#1a1a1a` setzen
   (dann 5,25:1), den Logoblock geringfügig abdunkeln, oder es so
   lassen und in Kauf nehmen. Auf der Hero-Seite ist derselbe Konflikt
   beim primären Knopf schon einmal bewusst entschieden worden — dort
   rettet die Schriftgröße die Sache, hier nicht.
5. **Ob die Leiste auf allen Seiten gleich aussieht.** Weil sie im
   `BaseLayout` sitzt, tut sie es derzeit. Entschieden ist sie aber nur
   für die Startseite. Auf `/fuer-dozenten` zeigen drei der vier Links
   auf Anker, die es dort nicht gibt — spätestens dann muss die Frage
   beantwortet werden.
