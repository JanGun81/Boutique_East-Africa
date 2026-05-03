/**
 * API: GET /api/categories – lista produktkategorier (meny).
 */

import { NextResponse } from "next/server";
import { categoryService } from "@/lib/core/services";
import type { ProductCategoryDto, CategoriesResponse } from "@/lib/api-contract/types";
import type { Category } from "@/lib/core/types/category";
import { DEMO_CATEGORIES } from "@/lib/demo-categories";

function toNavDto(c: Category): ProductCategoryDto {
  return { id: c.id, name: c.name, slug: c.slug };
}

export async function GET() {
  let list: ProductCategoryDto[] = [];
  try {
    const rows = await categoryService.getAllCategories();
    list = rows.map(toNavDto);
  } catch (error) {
    console.error("GET /api/categories (DB – använder demo-lista):", error);
  }
  if (list.length === 0) {
    list = DEMO_CATEGORIES;
  }
  const response: CategoriesResponse = { categories: list };
  return NextResponse.json(response);
}
