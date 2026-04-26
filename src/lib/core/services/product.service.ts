/**
 * Produkttjänst – affärslogik, ramverksoberoende.
 * Tar in repository via dependency (enkel “injection”) så att implementationen kan bytas.
 */

import type { IProductRepository } from "@/lib/core/repositories/product.repository";
import type { ProductWithCategory } from "@/lib/core/types/product";

export class ProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async getAllProducts(): Promise<ProductWithCategory[]> {
    return this.productRepository.findAll();
  }

  async getProductById(id: string): Promise<ProductWithCategory | null> {
    return this.productRepository.findById(id);
  }

  async getProductBySlug(slug: string): Promise<ProductWithCategory | null> {
    return this.productRepository.findBySlug(slug);
  }

  async getProductsByCategory(categoryId: string): Promise<ProductWithCategory[]> {
    return this.productRepository.findByCategoryId(categoryId);
  }
}
