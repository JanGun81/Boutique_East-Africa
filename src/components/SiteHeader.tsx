"use client";

/**
 * Gemensam sidhuvud: hamburger + utfällbar meny på mindre skärmar (<lg).
 * Från lg och uppåt ligger kategorier i vänsterpanelen (`CategoryNavRail` i layout).
 */

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { CategoriesResponse, ProductCategoryDto } from "@/lib/api-contract/types";
import { DEMO_CATEGORIES } from "@/lib/demo-categories";

export interface SiteHeaderProps {
  variant: "home" | "page";
  /** Visas i header på undersidor (t.ex. "Alla produkter"). */
  pageTitle?: string;
  /** Tillbaka-länk; utelämnas på startsidan. */
  back?: { href: string; label?: string };
}

export function SiteHeader({ variant, pageTitle, back }: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState<ProductCategoryDto[]>(DEMO_CATEGORIES);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: CategoriesResponse) => {
        if (data.categories?.length) {
          setCategories(data.categories);
        }
      })
      .catch(() => setCategories(DEMO_CATEGORIES));
  }, []);

  const mobileNavLinks = (
    <ul className="flex flex-col gap-1">
      <li>
        <Link
          href="/produkter"
          className="block rounded-lg px-3 py-2 text-white/95 hover:bg-white/10 text-sm"
          onClick={closeMenu}
        >
          Alla produkter
        </Link>
      </li>
      {categories.map((c) => (
        <li key={c.id}>
          <Link
            href={`/produkter?kategori=${encodeURIComponent(c.slug)}`}
            className="block rounded-lg px-3 py-2 text-white/95 hover:bg-white/10 text-sm"
            onClick={closeMenu}
          >
            {c.name}
          </Link>
        </li>
      ))}
      <li>
        <Link
          href="/bestall"
          className="block rounded-lg px-3 py-2 text-white/95 hover:bg-white/10 text-sm"
          onClick={closeMenu}
        >
          Beställ steg för steg
        </Link>
      </li>
    </ul>
  );

  return (
    <header className="bg-accent text-white shadow-soft sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1 flex items-center gap-3">
            {back && (
              <Link
                href={back.href}
                className="shrink-0 text-white/90 hover:text-white text-sm whitespace-nowrap"
              >
                ← {back.label ?? "Tillbaka"}
              </Link>
            )}
            {variant === "home" ? (
              <Link href="/" className="block min-w-0">
                <h1 className="text-xl font-bold md:text-2xl tracking-tight truncate">
                  Nordic Muslim
                </h1>
                <p className="text-xs md:text-sm text-white/80 mt-1 leading-snug">
                  Baati · Dirac · Macwiis · Khamis · klänningar &amp; mer
                </p>
              </Link>
            ) : (
              <h1 className="text-lg font-bold truncate">{pageTitle ?? ""}</h1>
            )}
          </div>

          <button
            type="button"
            className="lg:hidden shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/80"
            aria-expanded={menuOpen}
            aria-controls="site-nav-panel"
            aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="sr-only">Meny</span>
            <span className="text-2xl font-light leading-none select-none" aria-hidden>
              {menuOpen ? "\u2715" : "\u2630"}
            </span>
          </button>
        </div>

        <div
          id="site-nav-panel"
          className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ease-out ${
            menuOpen ? "max-h-[28rem] mt-3 pt-3 border-t border-white/20" : "max-h-0"
          }`}
          aria-hidden={!menuOpen}
        >
          <nav aria-label="Kategorier">{menuOpen ? mobileNavLinks : null}</nav>
        </div>
      </div>
    </header>
  );
}
