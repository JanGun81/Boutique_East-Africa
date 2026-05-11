# Ändringslogg

Kort logg över relevanta produkt-/varumärkes- och UI-ändringar (ej full git-historik).

## 2026-05-11

### Varumärke och synlig text (Nordic Muslim)

- **`SiteHeader` (startsida):** Rubrik **Nordic Muslim** (utan undertitel-tagline). Underrad: **Baati · Dirac · Macwiis · Khamis · klänningar & mer**.
- **`src/app/layout.tsx`:** `metadata.title` = "Nordic Muslim"; beskrivning uppdaterad till muslimska kläder (Baati, Dirac, Macwiis, Khamis, klänningar och mer).
- **`public/manifest.json`:** `name`, `short_name` ("Nordic Muslim") och `description` justerade.
- **`src/app/page.tsx`:** Hero-text, footer och "Populära kategorier" (Baati, Dirac, Macwiis, Khamis, Klänningar) matchar sortimentsraden. `Baati` länkar till befintlig slug `baatis` så seedade produkter hittas; `khamis` och `klanningar` är nya slugs som DB/seed får komplettera senare.
- **`src/lib/demo-categories.ts`:** Offline-/fallback-menyn speglar samma fem kategorier.
- **`README.md`:** Projektintro pekar på Nordic Muslim (repo kan fortfarande heta `east-african-shop`).

### Navigation

- **`CategoryNavRail`:** Tidigare flytt till vänster (`fixed left-0`, `border-r`, skugga åt höger) återställdes efter revert och är nu på plats igen tillsammans med `lg:pl-56` i `layout.tsx`.

### Backlogg

- **`EA-017`** (re)tillagd i `docs/BACKLOG.md` med uppdaterad beskrivning enligt ovan; `EA-016`-raden återigen justerad till vänsterpanel.

### Tester

- **`tests/e2e/home.spec.ts`:** Förväntad rubrik (`/^nordic muslim$/i`), sortimentsrad, hero-text och sidopanelstext uppdaterade.

## 2026-05-03 (referens)

Tidigare Nordic Muslim-rebrand med tagline "Kläder för alla tillfällen" och kategorierna Abaya/Dirac/Baati/sjalar/Khamis/macwiis. Den varianten revertades innan merge; aktuell text och kategorilista är den ovan (2026-05-11).
