"use client";

/**
 * Vänster sidopanel (endast lg+): kategorilänkar i samma visuella språk som övriga sidan.
 * Mobil använder SiteHeader-hamburgaren.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { CategoriesResponse, ProductCategoryDto } from "@/lib/api-contract/types";
import { DEMO_CATEGORIES } from "@/lib/demo-categories";

function linkClass(active: boolean) {
  return [
    "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors border",
    active
      ? "bg-white text-accent border-warm-200 shadow-sm"
      : "text-gray-700 border-transparent hover:bg-white/90 hover:border-warm-200/80 hover:text-gray-900",
  ].join(" ");
}

export function CategoryNavRail() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("kategori")?.toLowerCase() ?? null;

  const [categories, setCategories] = useState<ProductCategoryDto[]>(DEMO_CATEGORIES);

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

  const allProductsActive = pathname === "/produkter" && !activeCategory;

  return (
    <aside
      className="hidden lg:flex flex-col fixed left-0 top-0 z-20 h-svh w-56 border-r border-warm-200/90 bg-gradient-to-b from-warm-50 via-warm-50 to-warm-100 shadow-[4px_0_24px_-8px_rgba(0,0,0,0.08)]"
      aria-label="Butiksmenyn"
    >
      <div className="shrink-0 px-4 pt-5 pb-3 border-b border-warm-200/70">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gray-500">
          Utforska
        </p>
        <p className="text-base font-semibold text-gray-800 mt-0.5">Sortiment</p>
      </div>

      <nav className="flex-1 min-h-0 overflow-y-auto px-3 py-4" aria-label="Kategorier">
        <ul className="space-y-1">
          <li>
            <Link href="/" className={linkClass(pathname === "/")}>
              Startsida
            </Link>
          </li>
          <li>
            <Link href="/produkter" className={linkClass(allProductsActive)}>
              Alla produkter
            </Link>
          </li>
          {categories.map((c) => {
            const active = pathname === "/produkter" && activeCategory === c.slug.toLowerCase();
            return (
              <li key={c.id}>
                <Link
                  href={`/produkter?kategori=${encodeURIComponent(c.slug)}`}
                  className={linkClass(active)}
                >
                  {c.name}
                </Link>
              </li>
            );
          })}
          <li className="pt-2 mt-2 border-t border-warm-200/60">
            <Link
              href="/bestall"
              className={linkClass(pathname === "/bestall")}
            >
              Beställ steg för steg
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
