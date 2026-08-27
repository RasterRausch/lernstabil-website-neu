# Raster Rausch — Website-Starter

Grundgerüst für Kundenprojekte. Astro, optional Svelte, Hosting auf
mittwald mStudio.

Astro ist bewusst **nicht** vorinstalliert, damit jedes Projekt die zum
Startzeitpunkt aktuelle Version bekommt.

## Neues Kundenprojekt anlegen

1. Repository als Template klonen (auf GitHub: *Use this template*)
   oder Ordner kopieren und `.git` entfernen.
2. `bash setup.sh` — installiert Astro, fragt nach Svelte.
   Das Skript installiert Astro über einen temporären Unterordner und
   übernimmt nur die Konfigurationsdateien, damit `src/`, `brief/` und
   `design/` unangetastet bleiben.
3. Dateien unten ausfüllen.
4. `npm run dev`

## Pro Projekt auszufüllen

| Datei | Wann | Inhalt |
|-------|------|--------|
| `brief/briefing.md` | vor Projektstart | Kunde, Zielgruppe, Ziel, Tonalität, technischer Rahmen |
| `brief/content.md` | vor Projektstart | Seiten, Sektionsreihenfolge, Texte |
| `CLAUDE.md` | bei Projektstart | Rendering, Styling, Projekt-ID, Domain, Repo |
| `design/bildkonzept.md` | vor dem ersten Bild | Bildsprache |
| `design/tokens.md` | **nach** der ersten Sektion | Werte ableiten, dann fix |

## Pro Projekt zu befüllen

| Ordner | Inhalt |
|--------|--------|
| `design/brand/` | Logo als SVG, Farbmuster |
| `design/type/` | Schriftdateien plus Lizenznachweis |
| `design/refs-layout/` | Screenshots von Layout-Referenzen |
| `design/refs-imagery/` | Screenshots von Bildreferenzen |

## Sektionsablage

```
design/
  _VORLAGE-SEKTION/spec.md      Kopiervorlage
  shared/sections/              Header, Footer, wiederkehrende Blöcke
  pages/<seite>/sections/       seitenspezifisch
```

Bei einem One-Pager gibt es nur eine Seite. Struktur bleibt gleich.

## Ablauf pro Sektion

1. Ordner anlegen, `_VORLAGE-SEKTION/spec.md` hineinkopieren,
   Referenzbild als `ref.png` dazu.
2. Claude die Referenz beschreiben lassen — inklusive dem, was es nicht
   erkennen kann.
3. Beschreibung korrigieren. Sie ist die Spezifikation.
4. Claude baut genau diese Sektion.
5. Prüfen.
6. Status in `spec.md` auf `GESPERRT` setzen, committen.

Nach der **ersten** gebauten Sektion die Tokens ableiten, eintragen und
ab da nicht mehr ändern.

## Secrets

Werte in `.env`, wird nicht committet. Jede neue Variable zusätzlich in
`.env.example`. In Astro landet alles mit `PUBLIC_`-Präfix im
Client-Bundle.
