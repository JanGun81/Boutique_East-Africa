# Projektstruktur – Östafrikansk Butik

Denna fil beskriver hur kodbasen är organiserad, vilka lager som gäller och hur data flödar. Den uppdateras när större delar läggs till (t.ex. order-API, auth).

## Teknikstack (nuläge)

| Område | Val |
|--------|-----|
| Ramverk | Next.js 15 (App Router), React 19 |
| Språk | TypeScript |
| Styling | Tailwind CSS (`src/app/globals.css`) |
| Databas | PostgreSQL via Prisma 6 |
| PWA | `next-pwa` (aktiv i produktion, av i utveckling) |
| Tester | Vitest (unit), Playwright (E2E) |

## Arkitektur i tre lager

1. **Presentation (GUI)** – `src/app/`, `src/components/`. Sidor och komponenter. Ingen direkt databasåtkomst.
2. **Mellanlager** – `src/lib/core/services/`, `src/lib/core/repositories/` (gränssnitt). Affärslogik och abstrakt datalager.
3. **Data** – Prisma-schema `prisma/schema.prisma`, singleton `src/lib/db.ts`, implementation `*.prisma.repository.ts`.

**Regel:** API-routes anropar endast tjänster; Prisma används bara i repositories och `db.ts`.

## Katalogöversikt

```
east-african-shop/
├── docs/                    # Denna dokumentation
├── prisma/
│   ├── schema.prisma        # Category, Product (PostgreSQL)
│   └── seed.js              # Exempelkategorier och 3 produkter
├── public/                  # Statiska filer, PWA-output (workbox), manifest.json
├── src/
│   ├── app/                 # App Router: sidor + API
│   │   ├── api/products/    # GET /api/products
│   │   ├── bestall/         # Wizard (placeholder – ej byggd)
│   │   ├── kassa/           # Gästkassa + tacksida
│   │   ├── produkter/       # Produktlista med varukorg
│   │   ├── layout.tsx       # Root: CartProvider, metadata, viewport
│   │   ├── page.tsx         # Startsida
│   │   └── globals.css      # Design tokens / Tailwind
│   ├── components/          # Återanvändbara UI-delar (ProductCard, ProductGrid, CartSummary)
│   └── lib/
│       ├── api-contract/    # DTO-typer delade mellan API och klient
│       ├── core/
│       │   ├── repositories/ # IProductRepository + Prisma-implementation
│       │   ├── services/     # ProductService + factory (index.ts)
│       │   └── types/        # Domänmodell (t.ex. ProductWithCategory)
│       ├── cart-context.tsx  # Client-side varukorg (React Context)
│       ├── db.ts             # Prisma singleton
│       └── demo-products.ts  # Fallback när DB saknas eller är tom
├── tests/
│   ├── e2e/                 # Playwright (startsida, länkar, API)
│   └── unit/                # Vitest (ProductService med mock-repo)
├── next.config.ts           # Bilder (Unsplash), PWA-wrapper
└── package.json
```

## Dataflöde: produkter

1. Klienten (`ProductGrid`) hämtar `GET /api/products`.
2. Routen `src/app/api/products/route.ts` anropar `productService.getAllProducts()`.
3. `ProductService` använder `IProductRepository` (implementation: `PrismaProductRepository`).
4. Repository läser via `prisma` från `src/lib/db.ts`.
5. Svar mappas till `ProductDto` (ISO-datumsträngar) enligt `src/lib/api-contract/types.ts`.

Om databasen saknas eller anrop misslyckas returneras tom lista; `ProductGrid` faller då tillbaka på `demo-products.ts`.

## Varukorg och beställning (nuläge)

- **Varukorg:** `CartProvider` i `layout.tsx`. Tillstånd endast i minnet (ingen localStorage/DB).
- **Kassa:** Formulär samlar namn, e-post, adress, telefon – värden skickas **inte** till backend än; `submitOrder()` tömmer bara varukorgen och sparar `lastOrder` för tacksidan.
- **Databas:** Ingen `Order`-modell i Prisma ännu.

## API-kontrakt

Delade typer ligger i `src/lib/api-contract/`. När nya endpoints läggs till: definiera DTO här först, implementera route + tjänst, använd samma typer i klienten.

## Tester

| Plats | Syfte |
|-------|--------|
| `tests/unit/product.service.test.ts` | ProductService mot mockat repository |
| `tests/e2e/home.spec.ts` | Startsida, navigation, `/api/products`-JSON |

Kör: `npm run test` respektive `npm run test:e2e` (kräver `npx playwright install` första gången).

## Miljövariabler

- `DATABASE_URL` – PostgreSQL-anslutningssträng (se `.env.example`).

---

## Var du står och väg framåt (checklista)

**Redan på plats:** startsida, produktlista med demo/DB-data, varukorg, gästkassa med tacksida, repository-mönster för produkter, GET-produkter-API, PWA-konfiguration, grundläggande tester.

**Naturliga nästa steg (prioritera efter behov):**

1. **Order i databasen** – Prisma-modell för beställning/rader; `OrderService`; `POST /api/orders`; koppla kassan till API:t.
2. **Betalning & leverans** – t.ex. Stripe/Klarna, fraktval (kan vara senare fas).
3. **Produktdetaljsida** – route `app/produkter/[slug]/page.tsx` + `GET /api/products/[slug]` (tjänsten har redan `getProductBySlug`).
4. **Wizard på `/bestall`** – steg-för-steg enligt copy på startsidan (produkt → storlek → tillbehör → granska → varukorg).
5. **Kategorier** – API/filtrering; koppla "Populära kategorier" till riktiga slug-länkar.
6. **PWA-ikoner** – `public/icon-192.png` och `public/icon-512.png` (se rot-README).
7. **Auth (valfritt)** – NextAuth/Clerk när orderhistorik krävs.

Uppdatera denna fil när nya mappar eller lager tillkommer.
