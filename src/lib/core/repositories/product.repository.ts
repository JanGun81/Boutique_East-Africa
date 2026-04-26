/**
 * Repository-gränssnitt för produkter.
 * Affärslogiken beror på detta – inte på Prisma.
 * Byt implementation (t.ex. till Supabase eller annan ORM) utan att röra tjänsterna.
 */

import type { ProductWithCategory } from "@/lib/core/types/product";

export interface IProductRepository {
  findAll(): Promise<ProductWithCategory[]>;
  findById(id: string): Promise<ProductWithCategory | null>;
  findBySlug(slug: string): Promise<ProductWithCategory | null>;
  findByCategoryId(categoryId: string): Promise<ProductWithCategory[]>;
}
