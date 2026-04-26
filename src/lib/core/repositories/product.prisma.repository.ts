/**
 * Prisma-implementation av IProductRepository.
 * Här är den enda platsen som importerar Prisma-modeller.
 */

import { prisma } from "@/lib/db";
import type { IProductRepository } from "./product.repository";
import type { ProductWithCategory } from "@/lib/core/types/product";

const categorySelect = { id: true, name: true, slug: true } as const;

function mapRow(row: {
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
  category: { id: string; name: string; slug: string };
}): ProductWithCategory {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    priceCents: row.priceCents,
    imageUrl: row.imageUrl,
    categoryId: row.categoryId,
    inStock: row.inStock,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    category: { id: row.category.id, name: row.category.name, slug: row.category.slug },
  };
}

export class PrismaProductRepository implements IProductRepository {
  async findAll(): Promise<ProductWithCategory[]> {
    const rows = await prisma.product.findMany({
      include: { category: { select: categorySelect } },
      orderBy: { createdAt: "desc" },
    });
    return rows.map(mapRow);
  }

  async findById(id: string): Promise<ProductWithCategory | null> {
    const row = await prisma.product.findUnique({
      where: { id },
      include: { category: { select: categorySelect } },
    });
    return row ? mapRow(row) : null;
  }

  async findBySlug(slug: string): Promise<ProductWithCategory | null> {
    const row = await prisma.product.findUnique({
      where: { slug },
      include: { category: { select: categorySelect } },
    });
    return row ? mapRow(row) : null;
  }

  async findByCategoryId(categoryId: string): Promise<ProductWithCategory[]> {
    const rows = await prisma.product.findMany({
      where: { categoryId },
      include: { category: { select: categorySelect } },
      orderBy: { name: "asc" },
    });
    return rows.map(mapRow);
  }
}
