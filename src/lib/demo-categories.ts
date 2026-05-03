/**
 * Demo-kategorier om API saknar DB – samma slugs som seed/demo-produkter.
 */

import type { ProductCategoryDto } from "@/lib/api-contract/types";

export const DEMO_CATEGORIES: ProductCategoryDto[] = [
  { id: "cat-dirac", name: "Dirac", slug: "dirac" },
  { id: "cat-baatis", name: "Baatis", slug: "baatis" },
  { id: "cat-unsi", name: "Unsi", slug: "unsi" },
];
