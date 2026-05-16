/**
 * Repository-gränssnitt för beställningar.
 * Prisma används endast i order.prisma.repository.ts.
 */

export interface OrderCreateLine {
  productId: string;
  productVariantId: string | null;
  quantity: number;
  unitPriceCents: number;
}

export interface OrderCreatePayload {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerPhone: string | null;
  totalCents: number;
  items: OrderCreateLine[];
}

export interface CreatedOrderRecord {
  id: string;
  totalCents: number;
  status: string;
  createdAt: Date;
}

export interface IOrderRepository {
  create(payload: OrderCreatePayload): Promise<CreatedOrderRecord>;
}
