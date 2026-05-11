/**
 * Demo-kategorier om API saknar DB – speglar sortimentsraden på startsidan.
 * Slugs kan kompletteras i seed/DB när kategorier finns.
 */

import type { ProductCategoryDto } from "@/lib/api-contract/types";

export const DEMO_CATEGORIES: ProductCategoryDto[] = [
  { id: "cat-baatis", name: "Baati", slug: "baatis" },
  { id: "cat-dirac", name: "Dirac", slug: "dirac" },
  { id: "cat-macwiis", name: "Macwiis", slug: "macwiis" },
  { id: "cat-khamis", name: "Khamis", slug: "khamis" },
  { id: "cat-klanningar", name: "Klänningar", slug: "klanningar" },
];
