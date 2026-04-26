# Backlogg – Östafrikansk Butik

Levande backlogg för iterativ utveckling. Uppdateras löpande.

## Arbetssätt

- Prioritering: `P1` (högst), `P2`, `P3`.
- Status: `todo`, `in progress`, `done`, `blocked`.
- Testförst: varje post ska börja med tester (unit/API/E2E beroende på typ).
- Branch:
  - `feature/...` för implementation
  - `test/...` för testarbete

## Nuvarande iteration

| ID | Prioritet | Typ | Beskrivning | Tester först | Status |
|----|-----------|-----|-------------|--------------|--------|
| EA-001 | P1 | Backend | Lägg till Prisma-modeller för `Order` och `OrderItem` | Unit + API | todo |
| EA-002 | P1 | API | Skapa `POST /api/orders` via service/repository-lager | API + Unit | todo |
| EA-003 | P1 | Frontend | Koppla `/kassa` till order-API (ersätt demo-submit) | Unit + E2E | todo |
| EA-004 | P1 | E2E | BDD-scenario: lyckad beställning från varukorg till tacksida | Playwright | todo |

## Nästa iteration

| ID | Prioritet | Typ | Beskrivning | Tester först | Status |
|----|-----------|-----|-------------|--------------|--------|
| EA-005 | P2 | Frontend | Produktdetaljsida `produkter/[slug]` | Unit + E2E | todo |
| EA-006 | P2 | API | `GET /api/products/[slug]` med DTO-kontrakt | API + Unit | todo |
| EA-007 | P2 | Frontend | Kategorifilter i produktlistan | Unit + E2E | todo |
| EA-008 | P2 | UX | Bygg första riktiga stegen i `/bestall` wizard | E2E + Unit | todo |

## Senare

| ID | Prioritet | Typ | Beskrivning | Tester först | Status |
|----|-----------|-----|-------------|--------------|--------|
| EA-009 | P3 | PWA | Lägg till `icon-192.png` och `icon-512.png` | N/A | todo |
| EA-010 | P3 | Payments | Förstudie betalning (Stripe/Klarna) | API-kontraktstester | todo |
| EA-011 | P3 | Auth | Förstudie inloggning/orderhistorik | Unit + E2E | todo |

## Definition of Done (DoD)

En backloggpost är klar när:

1. Tester har skrivits före implementation.
2. Relevanta tester är gröna lokalt.
3. Kod följer arkitekturreglerna (API -> service -> repository).
4. Dokumentation/backlogg är uppdaterad vid behov.
5. Ändringen är pushad i rätt branch och redo för PR.
