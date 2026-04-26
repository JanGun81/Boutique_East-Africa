/**
 * Domänmodell för kategori – ramverksoberoende.
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}
