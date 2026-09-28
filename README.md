# #Lernstabil — Website

Website der Online-Nachhilfe #Lernstabil (lernstabil.de). Astro,
statisch gebaut, mit Node-Adapter für das Probestunden-Formular.

## Befehle

```sh
npm install
npm run dev      # Entwicklung auf http://localhost:4321
npm run build    # dist/client (statisch) und dist/server
node dist/server/entry.mjs   # Produktionsserver, Port über PORT
```

## Wichtige Stellen

- `src/styles/tokens.css` — Design-Tokens, einzige Regelquelle für die
  Gestaltung.
- `src/data/kontakt.ts` — Telefon und E-Mail. Nur hier im Klartext,
  im HTML immer verschlüsselt.
- `src/pages/api/anfrage.ts` — Formular-Schnittstelle mit Spam-Schutz,
  Versand per SMTP. Vorlagen der Mails in `src/mail/`.
- `.env.example` — nötige Umgebungsvariablen (SMTP). Echte Werte nur in
  `.env` bzw. in den Umgebungsvariablen der App bei mittwald.

Arbeitsregeln und offene Punkte vor dem Livegang: `CLAUDE.md`.
