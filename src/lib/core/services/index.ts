/**
 * Factory för tjänster – kopplar repository-implementation till tjänsten.
 * Här byter du implementation (t.ex. Prisma → Supabase) på ett ställe.
 */

import { PrismaProductRepository } from "@/lib/core/repositories/product.prisma.repository";
import { PrismaCategoryRepository } from "@/lib/core/repositories/category.prisma.repository";
import { ProductService } from "./product.service";
import { CategoryService } from "./category.service";

const productRepository = new PrismaProductRepository();
const categoryRepository = new PrismaCategoryRepository();

export const productService = new ProductService(productRepository);
export const categoryService = new CategoryService(categoryRepository);
