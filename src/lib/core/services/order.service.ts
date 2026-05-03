import type { OrderItemInput } from "@/lib/core/types/order";

export class OrderService {
  calculateTotalCents(items: OrderItemInput[]): number {
    if (!items.length) {
      throw new Error("Order måste innehålla minst en orderrad.");
    }

    return items.reduce((sum, item) => {
      if (item.quantity <= 0) {
        throw new Error("Orderrad måste ha quantity > 0.");
      }
      if (item.unitPriceCents <= 0) {
        throw new Error("Orderrad måste ha unitPriceCents > 0.");
      }
      return sum + item.quantity * item.unitPriceCents;
    }, 0);
  }
}
