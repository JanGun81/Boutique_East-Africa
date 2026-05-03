/**
 * Prisma-implementation av ICategoryRepository.
 */

import { prisma } from "@/lib/db";
import type { ICategoryRepository } from "./category.repository";
import type { Category } from "@/lib/core/types/category";

function mapRow(row: {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export class PrismaCategoryRepository implements ICategoryRepository {
  async findAllOrderedByName(): Promise<Category[]> {
    const rows = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return rows.map(mapRow);
  }
}
