# Arbetsflöde, process och Git

Denna fil beskriver hur projektet drivs i praktiken: utvecklingsprocess, teststrategi, branchregler och commitvanor.

## Utvecklingsprocess (övergripande)

Projektet drivs iterativt med en levande backlogg i `docs/BACKLOG.md`.

Flöde per uppgift:

1. Välj en backloggpost för iterationen.
2. Skriv tester först (TDD/BDD).
3. Implementera minsta möjliga kod för att få tester gröna.
4. Refaktorera utan att ändra beteende.
5. Kör relevanta testsviter.
6. Commit, push och PR.

## Teststrategi: TDD + BDD

- TDD för implementation: tester skrivs före produktionskod.
- Unit/API först: börja med Vitest för logik och API-beteende.
- BDD för E2E: Playwright-scenarier skrivs i användarnära språk.
- Definition of Done: inga features är klara innan relevanta unit/API/E2E är gröna.

## Samarbetsmodell: du styr, AI exekverar

- Du agerar produktägare/tech lead och beslutar prioritet, scope och godkännande.
- AI agerar genomförare/parprogrammerare: bryter ner, kodar, testar och dokumenterar.
- Ingen större implementation startas utan ett tydligt "kör" från dig.
- Du kan när som helst välja vad som görs manuellt (commit/push/merge, UI-beslut, kravprioritering).
- AI levererar "out-of-the-box": testförslag först, implementation i rätt lager, verifiering och uppdaterad dokumentation.

## Branchstrategi

| Grenmönster | Syfte |
|------|--------|
| **`main`** | Stabil och integrerbar kod. |
| **`feature/...`** | Endast implementation av features, t.ex. `feature/order-api`. |
| **`test/...`** | Endast testarbete, t.ex. `test/order-api-specs` eller `test/checkout-e2e`. |

Regel:

- All featurekod utvecklas på `feature/...`.
- Testarbete som är frikopplat från implementation görs på `test/...`.
- `main` uppdateras via PR.

```text
main ──●──●──●────────●
            \      \
             ●──●    ●──●
          feature/*  test/*
```

## Commits

- Små, logiska commits hellre än en stor commit.
- Commitmeddelanden på svenska är ok.
- Första raden: kort vad som ändrats. Andra stycket: varför.

Exempel:

```text
Lägg till Order-modell och POST /api/orders

Kopplar kassan till databasen för att ersätta demo-flödet.
```

## Pull requests

- En PR per tydligt avgränsad uppgift.
- Länka gärna till backloggposten som PR:n löser.
- PR ska innehålla testplan (vad som kördes och resultat).

## Standardkommandon

```powershell
# Unit
npm run test:run

# E2E
npm run test:e2e

# E2E med UI
npm run test:e2e:ui
```

**E2E och port:** Playwright startar `npm run dev` på **port 3030** som standard (`PLAYWRIGHT_DEV_PORT` / `PLAYWRIGHT_BASE_URL` i `playwright.config.ts`) så E2E inte tar port 3000 när du utvecklar manuellt där.

## Vad som inte ska committas

Se `.gitignore`: `.env`, `node_modules`, `.next`, Playwright-rapporter med mera. Committa aldrig hemligheter (nycklar, lösenord, tokens).
