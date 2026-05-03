import { describe, it, expect } from "vitest";
import { OrderService } from "@/lib/core/services/order.service";
import type { CreateOrderInput } from "@/lib/core/types/order";

describe("OrderService", () => {
  it("beräknar total i öre från orderrader", () => {
    const service = new OrderService();
    const input: CreateOrderInput = {
      customerName: "Ali Hassan",
      customerEmail: "ali@example.com",
      customerAddress: "Testgatan 1, 11122 Stockholm",
      customerPhone: null,
      items: [
        { productId: "p1", quantity: 2, unitPriceCents: 34900 },
        { productId: "p2", quantity: 1, unitPriceCents: 12900 },
      ],
    };

    const total = service.calculateTotalCents(input.items);
    expect(total).toBe(82700);
  });

  it("kastar fel om orderrader saknas", () => {
    const service = new OrderService();
    expect(() =>
      service.calculateTotalCents([])
    ).toThrowError(/minst en orderrad/i);
  });
});
