#!/usr/bin/env bash
set -euo pipefail

# Installiert das Astro-Grundgerüst in diesen Ordner.
# Einmal pro neuem Kundenprojekt ausführen.
#
# Astro wird bewusst NICHT im Template mitgeliefert, damit jedes Projekt
# die zum Startzeitpunkt aktuelle Version bekommt.
#
# create-astro kann nicht direkt in einen nicht leeren Ordner
# installieren und würde src/pages/index.astro überschreiben. Deshalb:
# Installation in einen temporären Unterordner, dann nur die
# Konfigurationsdateien übernehmen. src/, public/, brief/ und design/
# bleiben unangetastet.

if [ -f package.json ]; then
  echo "package.json existiert bereits — Setup übersprungen."
  exit 0
fi

TMP=".astro-setup-tmp"
cleanup() { rm -rf "$TMP"; }
trap cleanup EXIT

rm -rf "$TMP"

echo "Astro wird vorbereitet (aktuelle Version, minimales Template)…"
npm create astro@latest "$TMP" -- \
  --template minimal \
  --typescript strict \
  --no-install \
  --no-git \
  --skip-houston

echo "Konfiguration wird übernommen…"
for f in package.json tsconfig.json .npmrc; do
  if [ -f "$TMP/$f" ]; then
    cp "$TMP/$f" ./
    echo "  $f"
  fi
done

# astro.config kann .mjs, .ts oder .js heißen
for cfg in "$TMP"/astro.config.*; do
  if [ -f "$cfg" ]; then
    cp "$cfg" ./
    echo "  $(basename "$cfg")"
  fi
done

# create-astro leitet den Paketnamen vom Zielordner ab und der ist hier
# das Temp-Verzeichnis. Also aus dem Projektordner neu setzen.
# npm verlangt Kleinbuchstaben ohne Leerzeichen — ein Ordnername, der das
# nicht erfüllt, wird umgewandelt statt abgebrochen.
ordner="$(basename "$PWD")"
paketname="$(printf '%s' "$ordner" \
  | sed -e 's/ä/ae/g' -e 's/ö/oe/g' -e 's/ü/ue/g' -e 's/ß/ss/g' \
        -e 's/Ä/Ae/g' -e 's/Ö/Oe/g' -e 's/Ü/Ue/g' \
  | tr '[:upper:]' '[:lower:]' \
  | sed -e 's/[^a-z0-9._-]/-/g' -e 's/-\{2,\}/-/g')"
paketname="${paketname:0:214}"
paketname="$(printf '%s' "$paketname" | sed -e 's/^[._-]*//' -e 's/[._-]*$//')"
[ -n "$paketname" ] || paketname="website"

if [ "$paketname" != "$ordner" ]; then
  echo "  Ordnername \"$ordner\" ist kein gültiger npm-Name — verwende \"$paketname\"."
fi

npm pkg set name="$paketname" >/dev/null
echo "  package.json: name=$paketname"

rm -rf "$TMP"
trap - EXIT

echo
echo "Abhängigkeiten werden installiert…"
npm install

echo
svelte=""
read -r -p "Svelte-Integration mit installieren? [j/N] " svelte || true
case "$svelte" in
  [jJyY]*)
    echo "Svelte-Integration wird ergänzt…"
    npx astro add svelte --yes
    ;;
  *)
    echo "Ohne Svelte. Nachträglich jederzeit: npx astro add svelte"
    ;;
esac

echo
echo "Fertig. Weiter mit: npm run dev"
