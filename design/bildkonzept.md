# Bildkonzept — #Lernstabil

Ausgefüllt am 1. September 2026, abgeleitet aus dem gebauten Hero.
Grundlage für alle weiteren Bild-Prompts, damit die Bilder einer Seite
untereinander zusammenpassen.

Referenzbilder liegen in `design/refs-imagery/`, das aktuelle Hero-Motiv
in `public/test/`.

## Bildsprache

- **Menschen, halbnah, freigestellt.** Eine Person pro Bild, ohne Raum
  drumherum. Kein Bildkasten, kein Rahmen — das Motiv sitzt direkt auf
  der Sektionsfläche.
- **Inszeniert, aber nicht gestellt.** Bewegung mit erkennbarer Ursache:
  fliegende Haare, weil der Kopf sich bewegt oder Luft weht. Keine
  Bewegung als Textur ohne Anlass.
- **Ein Requisit, mehr nicht.** Im Hero ein Blatt Papier. Keine
  Bücherstapel, keine Schulranzen, keine Tafeln im Hintergrund.
- **Ausnahme Sektion 6 (Ablauf):** dort dokumentarisch, über die
  Schulter, echte Unterrichtssituation statt Porträt. Prompt B in
  `bildprompt.md`.

## Farbklima

- **Kühl und entsättigt.** `muted natural colour` steht in jedem Prompt.
  Keine kräftigen Farbflächen im Bild — die Farbe kommt aus dem Layout,
  nicht aus dem Foto.
- **Kleidung hell und einfarbig.** Ohne Muster, ohne Aufdruck. Das ist
  keine Stilfrage, sondern eine technische Bedingung: Auf `#1a1a1a`
  verschwindet alles unter Helligkeit 40. Getestet — ein grauer Pullover
  liegt auf Schulterhöhe bei 7 bis 20 und verliert dort seinen Umriss.
- **Kein gesättigter Farbfleck im Bild**, der dem roten Knopf
  Konkurrenz macht. Rot bleibt der Aktion vorbehalten.

## Licht

- **Weiches, gleichmäßiges Frontlicht.** `soft even frontal light`.
- **Kein Randlicht, kein Gegenlicht.** Randlicht erzeugt einen
  leuchtenden Flaum um die Haare, und bei fliegenden Haaren ergibt das
  einen Wollknäuel-Rand.
- **Kein Licht auf den Hintergrund.** Der Bildhintergrund wird flach
  erzeugt: kein Verlauf, keine Vignette, kein Lichtfleck, kein
  Schattenwurf. Das ist die Bedingung dafür, dass die Freistellung
  keinen sichtbaren Saum hinterlässt.
- **Der Lichtkegel entsteht später in CSS**, nicht im Foto. Er liegt
  hinter dem freigestellten Motiv und ist in `spec.md` beschrieben.

## Bildausschnitte

| Sektion | Ausschnitt |
|---|---|
| 1 Hero | halbnah, Kopf und Oberkörper, unten von der Sektionskante angeschnitten |
| 5 Wer unterrichtet | Porträt Alexander, Dreiviertelansicht, halbnah |
| 6 So läuft eine Stunde ab | weit, über die Schulter, Raum sichtbar |

**Immer großzügig rahmen.** Für ein freigestelltes Motiv ist zu viel
Rand nie ein Problem — überschüssiger Hintergrund fällt beim Freistellen
weg. Zu wenig Rand ist dagegen nur noch generativ zu reparieren.

## Zu vermeiden

- lachende Kinder mit Bücherstapel — steht so im Briefing
- vier Bilder mit vier Lichtstimmungen nebeneinander; das war der
  deutlichste Fehler der alten Seite
- Verläufe und Vignetten im Bildhintergrund
- Randlicht und Gegenlicht
- blaue oder dunkelgraue Kleidung
- Muster und Aufdrucke auf Kleidung
- Text im Bild — Modelle schreiben unzuverlässig; Beschriftungen kommen
  später mit echter Schrift dazu
- glatte, porenlose Haut. `real skin texture with visible pores` und
  `visible fine film grain` gehören in jeden Prompt, sonst sieht das
  Ergebnis erzeugt aus.

## Echte Personen

**Keine echten Schüler.** Datenschutz bei Minderjährigen, dazu reiner
Online-Unterricht. Alle Personen in den Bildern sind erzeugt und dürfen
nie mit Namen, Zitat oder als Erfolgsgeschichte ausgegeben werden.

**Eine Ausnahme:** das Foto von Alexander. Das eine Bild, das echt sein
muss, ist seins. Aufnahmehinweise in `bildprompt.md` unter Prompt C.

## Technisch

- **Seitenverhältnisse:** Hero hochformatig, etwa 1 : 1,1. Erzeugt wird
  in `Portrait (3:4)`, danach beschnitten.
- **Zielauflösung:** mindestens 1500 px in der langen Kante.
- **Freistellen:** `Select and Mask` in Photoshop, mit **Decontaminate
  Colors** gegen die Restfarbe in den halbtransparenten Haarpixeln.
  Ausgabe als „New Layer with Layer Mask", damit die Ursprungsebene
  erhalten bleibt.
- **Reihenfolge:** erst beschneiden, dann freistellen. Umgekehrt
  schneidet man in bereits freigestellte Haarkanten und bekommt eine
  harte Kante.
- **Format nach Optimierung:** WebP, Fallback nach Bedarf. Die
  PNG-Fassungen in `public/test/` sind Arbeitsstände mit mehreren
  Megabyte und nicht für die Produktion gedacht.
