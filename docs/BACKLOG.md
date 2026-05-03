# Backlogg – Östafrikansk Butik

Levande backlogg för iterativ utveckling. Uppdateras löpande.

## Arbetssätt

- Prioritering: `P1` (högst), `P2`, `P3`.
- Status: `todo`, `in progress`, `done`, `blocked`.
- Testförst: varje post ska börja med tester (unit/API/E2E beroende på typ).
- Branch:
  - `feature/...` för implementation
  - `test/...` för testarbete

## Epics (två spår)

Arbetet delas i **två separata epics**. Kundwebben går först; admin kommer när huvudfunktionaliteten finns på plats. Detaljer under admin-epic **förfines senare**.

### Epic A – Kundwebb (boutique för besökare)

Mål: komplett kundresa i webbappen – produkter, varukorg, beställning, betalning/leverans i den ordning backloggen anger. Alla befintliga tickets `EA-001` och uppåt i tabellerna nedan hör till denna epic så länge inget annat anges.

### Epic B – Admin (administrera webbappen)

Mål: skyddad yta där du kan sköta sortiment och ev. inlägg utan att röra kod. **Startas efter Epic A:s kärna** (orderflöde m.m. enligt din prioritering). Omfattning och uppdelning i mindre stories refinas löpande.

Grovmalad backlogg för Epic B (ersätts eller bryts ned i mindre poster när du tar tag i epicken):

| ID | Prioritet | Typ | Beskrivning | Tester först | Status |
|----|-----------|-----|-------------|--------------|--------|
| ADM-001 | P2 | Auth | Inloggning / session för admin-yta (leverantör väljs senare) | Unit + E2E | todo |
| ADM-002 | P2 | Admin UI | Grundläggande `/admin`-layout och navigation | E2E | todo |
| ADM-003 | P2 | CRUD | Skapa/redigera/ta bort produkter (och ev. kategorier) via API + formulär | API + Unit + E2E | todo |
| ADM-004 | P3 | Innehåll | Ev. blogg/inlägg eller sidtexter – scope bestäms senare | TBD | todo |

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
