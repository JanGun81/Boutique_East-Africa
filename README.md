# Östafrikansk Butik

Webbutik med östafrikanskt tema – dirac, baatis, macwiis, unsi m.m. Byggd med Next.js (App Router), TypeScript, Prisma och Tailwind. Mobilförst, PWA-klar.

## Krav

- Node.js 20+ (rekommenderas LTS)
- PostgreSQL (lokalt, Docker, Supabase, Neon eller annan host)

## Snabbstart

```bash
# Installera beroenden
npm install

# Kopiera miljövariabler och sätt DATABASE_URL
cp .env.example .env
# Redigera .env och ange din PostgreSQL-URL

# Skapa tabeller (utan migreringar)
npm run db:push

# (Valfritt) Fyll med exempelprodukter
npm run db:seed

# Starta utvecklingsserver
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000).

Utan databas fungerar sidan fortfarande: startsidan och **Alla produkter** visar då demo-produkter (2–3 st) så att du kan testa layout och varukorg.

## Skript

| Kommando        | Beskrivning                    |
|-----------------|--------------------------------|
| `npm run dev`   | Startar Next.js i utvecklingsläge |
| `npm run build` | Bygger för produktion          |
| `npm run start` | Startar produktionsserver     |
| `npm run lint`  | Kör ESLint                    |
| `npm run db:push`  | Uppdaterar databasen (Prisma) |
| `npm run db:seed`  | Fyller med exempelkategorier och produkter |
| `npm run db:studio` | Öppnar Prisma Studio        |
| `npm run test`     | Unit-tester (Vitest)        |
| `npm run test:e2e` | E2E-tester (Playwright). Kör `npx playwright install` en gång om webbläsare saknas. |

## Projektstruktur

- **`src/app/`** – Next.js App Router (sidor, layout, API-routes)
- **`src/lib/core/`** – affärslogik: services, repositories, typer (ingen Prisma här utom i `*.prisma.repository.ts`)
- **`src/lib/api-contract/`** – delade API-typer (DTOs)
- **`src/lib/db.ts`** – enda platsen som skapar Prisma-klienten
- **`prisma/`** – schema och seed

## PWA-ikoner – vad är det och var hittar jag dem?

**Vad det är:** PWA-ikoner är de bilder som syns när någon sparar sidan som app (t.ex. "Lägg till på hemskärmen" på mobil). Projektet förväntar sig **`public/icon-192.png`** (192×192 px) och **`public/icon-512.png`** (512×512 px).

**Var hittar jag dem?** (1) Egen logotyp – exportera i 192×192 och 512×512 PNG. (2) Nätgeneratorer – [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator) eller [Favicon.io](https://favicon.io/); spara filerna i `public/`. (3) Tillfällig placeholder – enkel PNG i rätt storlek. Utan filerna fungerar PWA med standardikon.

## Inloggning

Just nu finns **ingen inloggning** – beställningar görs som gäst. Inloggning kan läggas till senare (t.ex. NextAuth, Clerk) och kopplas till beställningar och orderhistorik.


## Licens

Privat projekt.
