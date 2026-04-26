/**
 * API: GET /api/products – lista alla produkter.
 * Använder tjänstelagret (ingen Prisma/DB här direkt).
 */

import { NextResponse } from "next/server";
import { productService } from "@/lib/core/services";
import type { ProductWithCategory } from "@/lib/core/types/product";
import type { ProductDto, ProductsResponse } from "@/lib/api-contract/types";

function toDto(p: ProductWithCategory): ProductDto {
  return {
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

export async function GET() {
  let products: ProductWithCategory[] = [];
  try {
    products = await productService.getAllProducts();
  } catch (error) {
    console.error("GET /api/products (DB eller nätverk – använder tom lista):", error);
  }
  try {
    const response: ProductsResponse = {
      products: products.map(toDto),
    };
    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ products: [] } satisfies ProductsResponse);
  }
}
