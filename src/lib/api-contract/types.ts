/**
 * API-kontrakt – typer som både backend och frontend använder.
 * Ändra här om ni byter API-format; frontend behöver bara uppdatera anropen.
 */

export interface ProductCategoryDto {
  id: string;
  name: string;
  slug: string;
}

export interface ProductDto {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
  categoryId: string;
  category: ProductCategoryDto;
  inStock: boolean;
  createdAt: string; // ISO
  updatedAt: string;
}

export interface ProductsResponse {
  products: ProductDto[];
}

export interface ProductResponse {
  product: ProductDto | null;
}
