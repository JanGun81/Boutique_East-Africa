/**
 * Demo-produkter (samma som seed) – visas om API returnerar tom lista.
 * Bilderna från Unsplash (unsplash.com/license) – fri användning.
 */

import type { ProductDto } from "@/lib/api-contract/types";

export const DEMO_PRODUCTS: ProductDto[] = [
  {
    id: "demo-1",
    name: "Dirac – färgstark",
    slug: "dirac-fargstark",
    description:
      "Klassiskt dirac i starka färger, bekvämt och snyggt för vardag och tillfällen.",
    priceCents: 34900,
    imageUrl:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    categoryId: "cat-dirac",
    category: { id: "cat-dirac", name: "Dirac", slug: "dirac" },
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "demo-2",
    name: "Baatis – enkel modell",
    slug: "baatis-enkel",
    description:
      "Enkel och snygg baatis, lätt att kombinera. Tillgänglig i flera färger.",
    priceCents: 27900,
    imageUrl:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    categoryId: "cat-baatis",
    category: { id: "cat-baatis", name: "Baatis", slug: "baatis" },
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "demo-3",
    name: "Unsi – naturrökelse",
    slug: "unsi-naturrokelse",
    description: "Äkta unsi (rökelse) för hemmet. Varm, behaglig doft.",
    priceCents: 12900,
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    categoryId: "cat-unsi",
    category: { id: "cat-unsi", name: "Unsi", slug: "unsi" },
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
