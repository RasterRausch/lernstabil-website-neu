# Bildbeschaffung Hero

Arbeitsmaterial für die Bilderzeugung. Die Prompts sind auf Englisch,
weil die Modelle darauf deutlich zuverlässiger reagieren. Die Notizen
dazu auf Deutsch.

Es gibt für den Hero **eine** Fassung. Ältere Varianten sind entfernt;
was sich bewährt hat, steht als Notiz unter dem Prompt.

---

## Grundsätze, bevor der erste Prompt läuft

**Kein Bildkasten.** Das Motiv wird ohne Rahmen direkt auf die
Hero-Fläche gesetzt. Damit die Kante verschwindet, muss der
Bildhintergrund absolut gleichmäßig sein: kein Verlauf, keine Vignette,
kein Lichtfleck, kein Schattenwurf auf die Fläche. Jede Aufhellung im
Hintergrund verrät sofort, dass da ein Rechteck liegt.

**Der Bildhintergrund wird in der Zielfarbe erzeugt, nicht ersetzt.**
Halbtransparente Haarkanten tragen immer die Farbe des Grundes, auf dem
sie entstanden sind — freistellen bekommt sie nicht heraus. Deshalb
entsteht das Bild gleich auf der Farbe, auf der es später liegt.
Nachgezogen wird danach nur noch der Farbwert, nicht die Silhouette.
Entscheidung vom 28. August 2026: Markenblau statt Dunkelgrau. Die
Hero-Fläche in `spec.md` steht noch auf `#1a1a1a` und muss
nachgeführt werden, sobald die Fassung steht.

Beleuchtet wird nur die Person. Das Licht darf den Hintergrund nicht
treffen.

**Eine Lichtsituation für alle Bilder.** Der größte Fehler der alten
Seite waren vier Fotos mit vier verschiedenen Lichtstimmungen
nebeneinander. Deshalb: Lichtrichtung, Tageszeit und Farbtemperatur in
allen Prompts gleich halten und in Firefly zusätzlich mit einem
Referenzbild arbeiten, damit die Serie zusammenpasst.

**Kein Text im Bild erzeugen.** Modelle schreiben unzuverlässig.
Das Blatt wird leer erzeugt, die Beschriftung kommt später mit echter
Schrift in Photoshop dazu. Das hat den Nebeneffekt, dass die Typografie
zur Marke passt statt zufällig zu sein.

**Prüfen, bevor es auf die Seite geht:** Hände und Finger, Zähne,
Ohren, Augen (Spiegelungen müssen auf beiden Seiten gleich liegen),
Kanten von Papier und Haaren, Muster auf Kleidung. Dort scheitern die
Modelle zuerst.

**Kein echter Schüler.** Die erzeugte Person ist eine Illustration, kein
Kunde. Sie darf nie mit Namen, Zitat oder als Erfolgsgeschichte
ausgegeben werden.

---

## Fassung 1 — Hero-Motiv

Nachbau der Bildmechanik des Studienkreis-Motivs
(`design/refs-layout/branche/studienkreis-lp-schulstart.jpeg`), aber auf
unserem Grund: blondes Mädchen, Blatt an die Brust gedrückt,
Hintergrund direkt im Markenblau statt in Dunkelgrau.

```
Candid advertising photograph of a teenage girl with fair skin, light
blonde hair and freckles, her head tilted far over to one side so that
the whole line of her body runs diagonally through the frame, caught in
a loud joyful laugh with her mouth open and her eyes narrowed into
creases at the outer corners, looking straight into the lens, her long
hair flying outwards in several directions from the movement of her
head, holding a single sheet of white A4 paper with both hands and
pressing it against her chest, the sheet noticeably taller than it is
wide and no wider than her shoulders, crumpled and curved by her grip,
running diagonally across the lower part of the frame, thumbs in front
and fingers behind it, the paper completely blank with nothing written
or printed on it, warm sand coloured knitted sweatshirt with visible
texture, close crop with her head filling most of the frame and the
sheet at the bottom edge, seamless flat evenly toned deep cobalt blue
background, the background one single solid colour across the whole
frame with no gradient, no vignette, no pool of light and no shadow
cast onto it, all light falling on the person only, 85mm lens at f/4,
soft even frontal light, natural colour, fine film grain, sharp focus
on the eyes, unretouched
```

**Auszuschließen** (Firefly: Feld „Ausschließen"):

```
gradient background, vignette, spotlight on the background, pool of
light behind the person, background falloff, shadow on the background,
studio backdrop with hotspot, dark background, black background,
coloured gels, rim light, backlit hair halo, blue clothing, blue
sweatshirt, red clothing, oversized sheet of paper, sheet wider than
the shoulders, square sheet of paper, flat sheet parallel to the
camera, sheet held away from the body, presenting a document,
certificate presentation, award ceremony, upright symmetrical pose,
level shoulders, text, letters, numbers, handwriting, watermark, logo,
plastic skin, waxy skin, airbrushed, perfect teeth, extra teeth,
deformed mouth, extra fingers, deformed hands, heavy background blur,
oversaturated colours
```

### Warum der Hintergrund jetzt blau erzeugt wird

Haarkanten behalten immer Restfarbe von dem Grund, auf dem sie
entstanden sind. Auf Dunkelgrau erzeugte Haare bringen graue Säume mit,
die auf einer blauen Fläche als Schmutzrand stehen bleiben — freistellen
hilft dagegen nicht, weil die Farbe *in* den halbtransparenten Pixeln
sitzt. Wird der Grund gleich in Blau erzeugt, ist die Restfarbe die
richtige.

**Der Preis:** Die erzeugte Blaufläche wird nicht genau `#1f4e98`
treffen. Bei Dunkelgrau fiel eine Abweichung kaum auf, bei einem
gesättigten Blau sieht man sie sofort. Der Hintergrund muss also in
Photoshop nachgezogen werden — aber nur farblich, nicht freigestellt:
Eine Einstellungsebene auf den Flächenbereich reicht, und die
Haarkanten wandern in derselben Richtung mit. Das ist ungleich weniger
Arbeit als eine Freistellung.

**Deshalb steht `dark background` in der Ausschlussliste** — die
bisherigen Durchläufe hatten Dunkel im Prompt, und Modelle fallen gern
in die zuletzt belohnte Richtung zurück.

### Warum die Kleidung nicht blau sein darf

Getestet am 28. August 2026 mit `Hero_1.png` auf blauer Fläche: Ein
royalblaues Oberteil vor blauem Grund verliert seine Silhouette, der
Ärmel geht in die Fläche über. Der Sandton steht als warmer Ton gegen
das kühle Blau und ist zugleich kein gesättigter Farbfleck, der dem
roten Knopf Konkurrenz macht.

Andere brauchbare Werte an dieser Stelle: `off white waffle knit`
(hell und ruhig, konkurriert aber mit dem weißen Blatt) oder
`heather grey knitted sweatshirt` (neutral, lebt allein von der
Struktur).

### Was aus dem Studienkreis-Motiv übernommen ist — und was nicht

Drei Dinge erzeugen dort die Wirkung, und nur die sind übernommen:

1. **Die Diagonale.** Der Kopf ist weit zur Seite gekippt, nichts im
   Bild steht senkrecht. Das allein macht den größten Teil der Dynamik.
2. **Die Haare fliegen mit Ursache.** Sie fliegen, weil der Kopf sich
   bewegt hat — nicht als Textur ohne Anlass. Deshalb steht die
   Kopfbewegung im Prompt vor den Haaren.
3. **Das Blatt ist zerknittert und an die Brust gedrückt.** Genau das
   unterscheidet Freude von Urkundenübergabe.

Nicht übernommen: die rote Fläche, der Preis-Störer und der Superlativ.

### Warum einzelne Angaben so dastehen

**Die Blattgröße über die Schultern.** `realistic size` oder `A4` allein
reicht nicht — das Modell hat keinen Maßstab, an dem es das prüfen
könnte. `no wider than her shoulders` und `noticeably taller than it is
wide` sind im Bild nachmessbar. Auf `Hero_1.png` war das Blatt fast so
breit wie sie selbst; genau das fängt die Schulterreferenz ab.

**`f/4` statt `f/2.8`.** Bei engem Ausschnitt und stark geneigtem Kopf
liegen Augen und Blattkante nicht in derselben Schärfeebene.

**`soft even frontal light`, kein Randlicht.** Das Randlicht war die
Ursache für den Haar-Flausch — und jetzt sollen die Haare fliegen.
Beides zusammen ergibt einen leuchtenden Wollknäuel-Rand.

**Das Blatt bleibt leer.** `nothing written or printed on it` steht
ausdrücklich drin, weil das Modell bei einem an die Brust gedrückten
Blatt fast immer anfängt, etwas daraufzuschreiben.

**Das Wort `school` darf nicht vorkommen.** Adobe filtert offenbar die
Kombination aus Schulbezug und Person.

### Prüfpunkte am Ergebnis

1. **Zähne und Mundraum.** Der offene lachende Mund ist bei dieser
   Fassung die Fehlerquelle Nummer eins — Zahnzahl, Zahnform, Zunge,
   Zahnfleisch. Zuerst hier hinschauen, nicht auf die Hände.
2. **Hände am Blatt.** Daumen vorn, Finger dahinter, zehn Finger, keine
   Verschmelzung mit der Papierkante.
3. **Hintergrund** in jeder Ecke gleich? Mit der Pipette an vier Stellen
   messen — bei einer gesättigten Farbe fallen Verläufe stärker auf als
   bei Grau.
4. **Blattbreite** gegen die Schultern halten. Ist es breiter, neu
   erzeugen; in Photoshop lässt sich das nicht korrigieren, weil die
   Finger über der Kante liegen.
5. **Haare:** Fliegen sie in eine plausible Richtung, passend zur
   Kopfneigung?
6. **Augen:** Beim Lachen sind sie verengt. Sind sie weit offen oder
   geschlossen, ist das Lachen aufgesetzt und das Bild kippt.

### Nacharbeit in Photoshop

1. **Hintergrundfarbe exakt ziehen.** Auswahl über den Farbbereich, dann
   Einstellungsebene (Farbton/Sättigung oder Gradationskurven) bis die
   Fläche `#1f4e98` misst. Nicht freistellen — die Haarkanten sollen
   mitwandern.
2. **Kontrolle mit der Pipette** an mehreren Stellen, auch dicht neben
   den Haaren.
3. **Beschriftung des Blattes** wie unten beschrieben.

**Zur Bildwirkung:** Auf blauer Fläche ist das weiße Blatt der hellste
Punkt im ganzen Hero — heller als die Überschrift. Was daraufsteht, muss
kurz sein.

---

## Wenn Firefly den Prompt ablehnt

Meldung: „We can't process this prompt." Das ist der Prompt-Filter, der
greift, bevor gerechnet wird.

**Wahrscheinliche Ursache:** eine Altersangabe unter 18 in Verbindung
mit detaillierter Körper- oder Hautbeschreibung. Adobe ist bei
Minderjährigen streng.

**Erster Rückfallweg:** `a teenage girl` durch `a young student`
ersetzen und sonst nichts ändern. Wird das Ergebnis dann zu erwachsen,
über die Kleidung nachsteuern statt über eine Altersangabe.

**Falls es weiter abgelehnt wird:** nicht raten, sondern halbieren. Mit
einem sehr kurzen Prompt anfangen („student laughing and holding a sheet
of paper, dark background") und die Bausteine in Vierergruppen wieder
dazunehmen. Der Durchgang, der kippt, enthält den Auslöser.

---

## Das Blatt beschriften

Das erzeugte Blatt bleibt leer. Die Beschriftung kommt in Photoshop
dazu. Das ist nicht der Notbehelf, sondern der bessere Weg: Die
Typografie passt dann zur Marke, und der Inhalt lässt sich ändern, ohne
ein neues Bild zu erzeugen.

### Warum nicht erzeugen lassen

Kurze Wörter schaffen die neuen Modelle inzwischen oft. Eine deutsche
Klassenarbeit hat aber Konventionen — rote Handschrift, Notenziffer,
Lehrerkürzel, Randkorrekturen. Modelle treffen die ungefähr, und
ungefähr ist bei diesem Detail schlechter als leer: Der Betrachter sieht
sofort, dass etwas nicht stimmt, kann aber nicht sagen, was — und genau
dieser Effekt lässt ein Bild „nach KI" aussehen.

### Vorgehen in Photoshop

1. **Blatt freistellen und als eigene Auswahl sichern.** Die vier Ecken
   merken — sie sind die Bezugspunkte.
2. **Inhalt auf eigener Ebene bauen:** Kopfzeile („Klassenarbeit Nr. 2 ·
   Mathematik"), ein paar angedeutete Aufgabenzeilen, und die Note in
   roter Handschrift. Für die Handschrift eine echte Handschriftfont
   nehmen oder mit dem Stift auf Papier schreiben, abfotografieren und
   freistellen. Handgeschriebenes schlägt jede Font.
3. **Perspektive angleichen:** Frei transformieren → Verzerren, die vier
   Ecken auf die Blattecken ziehen. Wenn das Papier sich wölbt,
   zusätzlich Verkrümmen (Warp) benutzen.
4. **Füllmethode auf Multiplizieren stellen.** Dadurch scheinen
   Papierstruktur, Falten und Schattenverlauf durch die Beschriftung
   hindurch. Ohne diesen Schritt klebt der Text auf dem Bild.
5. **Deckkraft leicht zurücknehmen** (etwa 85–95 %) und eine Spur
   Weichzeichnung sowie Rauschen zugeben, passend zum Filmkorn des
   Bildes.
6. **Auf die Blattform maskieren**, damit nichts über die Kante läuft.

Alternative für den ersten Versuch: Generative Füllung in Photoshop nur
auf den Blattbereich anwenden. Kann klappen, hat aber dasselbe
Textproblem — die Handarbeit ist verlässlicher.

### Was auf das Blatt gehört — drei Möglichkeiten

**A — Klassenarbeit mit Note.** Sofort lesbar, transportiert die
Nutzenaussage ohne Text. Nächste Nähe zum Studienkreis-Motiv.

**B — Lernplan statt Note.** Passt genauer zu dem, was #Lernstabil
wirklich anders macht: keine Hausaufgaben, sondern ein Plan bis zur
nächsten Stunde. Weniger sofort verständlich, dafür eigenständig.

**C — Blatt bleibt leer.** Dann führt nichts vom Gesicht weg. Die
ruhigste Fassung.

Zur Einordnung: Eine Note auf einem Requisit ist eine sinnbildliche
Darstellung, keine Erfolgsstatistik — sie fällt nicht unter die
Zahlensperre aus `briefing.md`. Behauptet wird damit nichts, was
belegt werden müsste.

---

## Prompt B — echte Unterrichtssituation

Ehrlicher und weniger anfällig, weil kein Gesicht im Mittelpunkt steht.
Geeignet für Sektion 6 (Ablauf), nicht für den Hero.

```
Over-the-shoulder photograph of a teenager sitting at a wooden desk in
an ordinary living room, looking at a laptop screen that shows a video
call with a tutor, an open exercise book and a pencil next to the
laptop, late afternoon daylight coming through a window on the left,
lived-in room with normal clutter, muted natural colours, shot on a
35mm lens at f/2.0, candid documentary style, fine film grain,
unretouched
```

**Auszuschließen:** wie oben, zusätzlich `staged, posed, smiling at
camera, empty tidy showroom`.

---

## Prompt C — Foto von Alexander

**Nicht erzeugen.** Das eine Bild, das echt sein muss, ist deins. Ein
erzeugtes Porträt des Inhabers wäre genau die Unehrlichkeit, die der
Rest der Seite vermeidet.

Aufnahmehinweise, damit es zur Bildserie passt:

- Vor einer schlichten Wand **und** zusätzlich an deinem Arbeitsplatz —
  zwei Fassungen, damit wir beim Layout wählen können
- Licht von vorne links, großes weiches Fenster, kein Blitz
- Brennweite um 85 mm (am Handy: Porträtmodus, zwei Schritte zurück),
  Blende offen, aber nicht so offen, dass die Ohren unscharf werden
- Halbnah, Dreiviertelansicht, Blick in die Kamera
- Freundlich, nicht lachend. Der Ton der Seite ist „persönlich, aber
  nicht kumpelhaft" — das gilt auch für das Gesicht
- Einfarbige Kleidung ohne Aufdruck, keine Muster
- Mehrere Aufnahmen, auch zwischen den gestellten — die brauchbaren
  entstehen meist dazwischen
