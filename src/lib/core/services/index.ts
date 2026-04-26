/**
 * Factory för tjänster – kopplar repository-implementation till tjänsten.
 * Här byter du implementation (t.ex. Prisma → Supabase) på ett ställe.
 */

import { PrismaProductRepository } from "@/lib/core/repositories/product.prisma.repository";
import { ProductService } from "./product.service";

const productRepository = new PrismaProductRepository();
export const productService = new ProductService(productRepository);
