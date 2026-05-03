/**
 * Repository-gränssnitt för produktkategorier (butikens kategorimeny).
 */

import type { Category } from "@/lib/core/types/category";

export interface ICategoryRepository {
  findAllOrderedByName(): Promise<Category[]>;
}
