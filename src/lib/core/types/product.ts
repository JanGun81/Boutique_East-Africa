/**
 * Domänmodell för produkt – ramverksoberoende.
 * Används av tjänstelagret och API-kontraktet.
 */

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
  categoryId: string;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductWithCategory extends Product {
  category: { id: string; name: string; slug: string };
}
