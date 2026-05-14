# Showroom (statisk one-pager)

Statisk **showroom** utan beställning: ren HTML/CSS, inga köpknappar eller formulär.

## GitHub Pages (rekommenderat)

GitHub Pages kan inte peka på en godtycklig mapp som `showroom/` direkt från branch-inställningar (endast repo-root eller `/docs`). Därför finns en workflow som **laddar upp enbart innehållet i `showroom/`** som statisk sajt.

1. I repot på GitHub: **Settings → Pages → Build and deployment**
2. Under **Source** välj **GitHub Actions** (inte "Deploy from a branch" om ni vill använda vår workflow).
3. Pusha till standardgrenen (t.ex. `main`) så körs `.github/workflows/showroom-pages.yml`.
4. Efter första lyckade körningen visas URL under **Pages** (ofta `https://<användare>.github.io/<repo>/`).

Om workflowen inte syns: kontrollera att **Actions** är påslaget för repot och att filen ligger under `.github/workflows/`.

## Lokal förhandsvisning

Öppna `index.html` i webbläsaren, eller från denna mapp:

```bash
npx --yes serve -l 3456
```

Gå till den URL som terminalen visar (lägg till `/showroom` om du startar serve från repo-roten).

## Bilder

- Lägg filer i **`images/`** (se `images/README.md`).
- I `index.html`: `src="./images/ditt-filnamn.jpg"` så fungerar det på GitHub Pages.

## Anpassning

- Varje plagg i `<figure class="card">` ska ha **Storlek**, **Pris** och **Färg** i `<dl class="plagg-meta">` (kopiera strukturen från befintliga kort).
- Byt texter i `<dd>` under varje `<dt>` och lägg till fler `<figure>` i en `<div class="grid">` om ni vill visa fler plagg per kategori.
- Byt texter och lägg till fler `<section>` i `index.html` vid behov.
- Byt `src` på `<img>` till egna bilder (lägg dem i samma mapp och använd t.ex. `./min-bild.jpg`).
- Stilar finns i `styles.css` (ren CSS, ingen Tailwind-build).

## Obs om "GitHub Spaces"

**GitHub Codespaces** är en molnutvecklingsmiljö – inte hosting av en publik webbplats. För en statisk showroom är **GitHub Pages** rätt verktyg.
