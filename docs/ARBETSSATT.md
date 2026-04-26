# Arbetsflöde och Git

Kort riktlinje så att commits och grenar håller ordning utan onödig byråkrati.

## Grenar

| Gren | Syfte |
|------|--------|
| **`main`** | Alltid integrerbar kod som ska kunna byggas. Skyddad på GitHub/GitLab (PR krävs) om ni vill. |
| **`feature/...`** | En gren per uppgete eller logiskt paket, t.ex. `feature/order-api`, `fix/kassa-validering`. |

**Arbetsgång:** skapa gren från `main` → implementera → commit → push → merge via PR (eller merge lokalt om ni är själva och föredrar det).

```text
main ──●──●──●──●  (första commit = startpunkt)
            \
             └──●──●  feature/min-gren
```

## Commits

- **Små, logiska commits** hellre än en jättecommit med allt.
- **Meddelanden på svenska** är okej (projektregel).
- Första raden: kort vad som ändrats; valfritt stycke under med varför om det behövs.

Exempel:

```text
Lägg till Order-modell och POST /api/orders

Kopplar kassan till databasen; validering med Zod i nästa steg.
```

## Första push till fjärrrepo

1. Skapa ett **tomt** repository på GitHub (eller GitLab/Bitbucket) utan README om ni redan har kod lokalt.
2. Koppla och pusha:

```powershell
cd c:\Users\jangu\east-african-shop
git remote add origin https://github.com/DITT-KONTO/DITT-REPO.git
git push -u origin main
```

Byt URL mot SSH om ni använder det: `git@github.com:DITT-KONTO/DITT-REPO.git`.

Om fjärrredan har innehåll (t.ex. README skapad på webben): hämta med `git pull origin main --allow-unrelated-histories`, lös eventuell konflikt, sedan `git push -u origin main`.

## Vad som inte ska committas

Se `.gitignore`: `.env`, `node_modules`, `.next`, Playwright-rapport, m.m. **Committa aldrig** databaslösenord eller API-nycklar.

Uppdatera denna fil om teamet enas om t.ex. alltid PR, release-taggar eller Conventional Commits.
