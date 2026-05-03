/**
 * Prisma-implementation av IOrderRepository.
 */

import { prisma } from "@/lib/db";
import type {
  CreatedOrderRecord,
  IOrderRepository,
  OrderCreatePayload,
} from "./order.repository";

export class PrismaOrderRepository implements IOrderRepository {
  async create(payload: OrderCreatePayload): Promise<CreatedOrderRecord> {
    const row = await prisma.order.create({
      data: {
        customerName: payload.customerName,
        customerEmail: payload.customerEmail,
        customerAddress: payload.customerAddress,
        customerPhone: payload.customerPhone,
        totalCents: payload.totalCents,
        items: {
          create: payload.items.map((line) => ({
            productId: line.productId,
            productVariantId: line.productVariantId,
            quantity: line.quantity,
            unitPriceCents: line.unitPriceCents,
          })),
        },
      },
    });

    return {
      id: row.id,
      totalCents: row.totalCents,
      status: row.status,
      createdAt: row.createdAt,
    };
  }
}
