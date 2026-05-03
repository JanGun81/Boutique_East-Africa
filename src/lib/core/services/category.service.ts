/**
 * Kategoritjänst – listar butikens produktkategorier för meny och filter.
 */

import type { ICategoryRepository } from "@/lib/core/repositories/category.repository";
import type { Category } from "@/lib/core/types/category";

export class CategoryService {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.findAllOrderedByName();
  }
}
