# Design-Tokens — #Lernstabil

**Abgeleitet aus Hero und Header, beide am 1. September 2026 gesperrt.
Ab hier fix.** Umgesetzt in `src/styles/tokens.css`.

Die Rollen-Namen sind über alle Projekte gleich, die Werte pro Projekt
verschieden. Abstände kommen ausschließlich aus der Spacing-Skala.

Leere Zeilen bedeuten: noch nicht belegt. Sie werden gefüllt, wenn die
erste Sektion die Rolle braucht — nicht vorher.

## Farbrollen

| Rolle | Wert | Verwendung |
|-------|------|------------|
| `bg` | `#1a1a1a` | Seitenhintergrund |
| `surface` | — | abgesetzte Flächen, Karten |
| `text` | `#ffffff` | Fließtext, Überschriften |
| `text-muted` | `#b0b0b0` | Sekundärtext, Bildunterschriften |
| `accent` | `#ff0000` | primärer Knopf, Logoblock |
| `accent-dark` | `#b3000f` | Fläche der Kopfleiste |
| `accent-contrast` | `#ffffff` | Text auf `accent` und `accent-dark` |
| `border` | `#3a3a3a` | Trennlinien, Rahmen |

**Zwei Rottöne, bewusst.** `accent-dark` ist `accent` abgedunkelt,
derselbe Farbton. Große Flächen laufen auf `accent-dark`, damit der
gesättigte Knopf der hellste rote Punkt der Seite bleibt.

**Kontraste, die man kennen muss.** Weiß auf `accent` erreicht nur
4,0:1. Das reicht für Schrift ab 18,66 px fett oder 24 px normal, sonst
nicht. Weiß auf `accent-dark` erreicht 7,2:1 und ist unkritisch. Rote
Schrift auf `bg` erreicht 4,35:1 — für große Überschriften zulässig,
für Fließtext nicht. Deshalb gibt es keinen roten Text im Projekt.

## Type-Scale

| Stufe | Größe | Zeilenhöhe | Verwendung |
|-------|-------|------------|------------|
| `display` | 64 px | 1,05 | größte Überschrift, meist Hero |
| `h1` | — | — | |
| `h2` | 26 px | 1,2 | zweite Zeile der Hero-Überschrift, Navigation |
| `h3` | — | — | |
| `body` | 17 px, ab 768 px 18 px | 1,6 | Fließtext, Navigation |
| `small` | 15 px | 1,5 | Bildunterschriften, Fußzeile, Telefonnummer in der Leiste |

`body` ist die einzige Stufe, die mit der Breite wächst. `display` und
`h2` gelten auf allen Breiten unverändert.

## Schriften

| Rolle | Schrift | Schnitte | Lizenz |
|-------|---------|----------|--------|
| `font-display` | Six Hands Marker | 700 | Adobe Fonts, Kit `chw4hpk` — `design/type/six-hands-marker.md` |
| `font-body` | Source Sans 3 | 400, 600, 700 | Google Fonts |
| `font-logo` | Comic Neue | 700 | SIL OFL, selbst gehostet — `design/type/comic-neue.md` |

Dateien liegen in `design/type/`, ausgeliefert wird aus `public/fonts/`.

**Offen:** Six Hands Marker lädt bei jedem Aufruf von
`use.typekit.net` und überträgt dabei die IP des Besuchers. Vor dem
Livegang klären, siehe `design/type/six-hands-marker.md`.

## Spacing-Skala

Basis 4 px.

| Stufe | Wert |
|-------|------|
| `3xs` | 4 px |
| `2xs` | 8 px |
| `xs` | 12 px |
| `sm` | 16 px |
| `md` | 24 px |
| `lg` | 32 px |
| `xl` | 48 px |
| `2xl` | 72 px |
| `3xl` | 112 px |

## Radien

| Rolle | Wert |
|-------|------|
| `radius-sm` | 4 px |
| `radius-md` | 10 px |
| `radius-full` | 999 px |

Knöpfe und der Logoblock laufen auf `radius-sm`. Stark abgerundete
Knöpfe sind das häufigste Baukasten-Merkmal; eine kleine Rundung wirkt
entschiedener.

## Schatten

| Rolle | Wert |
|-------|------|
| `schatten-sm` | `0 2px 6px rgb(0 0 0 / 0.3)` |

Bisher nur am Logoblock. Es gibt keine weitere Schattenstufe.

## Breakpoints

| Name | Ab |
|------|-----|
| `sm` | — |
| `md` | 768 px |
| `lg` | 1120 px |

**Nicht als CSS-Variable.** `@media` kann keine Variablen auswerten, die
Zahlen stehen deshalb direkt in den Dateien. Diese Tabelle ist die
Quelle, nicht der Code.

## Container

- **Maximale Inhaltsbreite:** 1280 px (`--content-max`)
- **Seitenabstand mobil:** 20 px (`--gutter`)
- **Seitenabstand ab 768 px:** 48 px (`--gutter`)

## Kopfleiste

| Rolle | mobil | ab 768 px | ab 1120 px |
|-------|-------|-----------|------------|
| `leiste-h` | 52 px | 58 px | 64 px |

Sektionen, die eine Bildschirmhöhe füllen sollen, rechnen mit
`calc(100svh - var(--leiste-h))`.
