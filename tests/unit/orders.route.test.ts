import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/orders/route";

const { createOrderMock } = vi.hoisted(() => ({
  createOrderMock: vi.fn(),
}));

vi.mock("@/lib/core/services", () => ({
  orderService: {
    createOrder: createOrderMock,
  },
}));

describe("POST /api/orders", () => {
  beforeEach(() => {
    createOrderMock.mockReset();
  });

  it("returnerar 400 vid ogiltig JSON", async () => {
    const req = new Request("http://localhost/api/orders", {
      method: "POST",
      body: "not-json",
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = (await res.json()) as { errors: string[] };
    expect(json.errors[0]).toMatch(/json/i);
  });

  it("returnerar 400 när validering av payload misslyckas", async () => {
    const req = new Request("http://localhost/api/orders", {
      method: "POST",
      body: JSON.stringify({ customerName: "" }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = (await res.json()) as { errors: string[] };
    expect(json.errors.length).toBeGreaterThan(0);
  });

  it("returnerar 400 när tjänsten avvisar ordern", async () => {
    createOrderMock.mockResolvedValue({
      ok: false,
      errors: ["Produkten är slut i lager: Test."],
    });
    const req = new Request("http://localhost/api/orders", {
      method: "POST",
      body: JSON.stringify({
        customerName: "A",
        customerEmail: "a@b.se",
        customerAddress: "Gatan 1",
        customerPhone: null,
        items: [{ productId: "x", quantity: 1, unitPriceCents: 100 }],
      }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(createOrderMock).toHaveBeenCalledTimes(1);
  });

  it("returnerar 201 och order-DTO vid lyckad skapande", async () => {
    createOrderMock.mockResolvedValue({
      ok: true,
      order: {
        id: "ord-99",
        totalCents: 500,
        status: "PENDING",
        createdAt: new Date("2026-05-01T10:00:00.000Z"),
      },
    });
    const req = new Request("http://localhost/api/orders", {
      method: "POST",
      body: JSON.stringify({
        customerName: "A",
        customerEmail: "a@b.se",
        customerAddress: "Gatan 1",
        customerPhone: null,
        items: [{ productId: "x", quantity: 1, unitPriceCents: 500 }],
      }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(201);
    const json = (await res.json()) as { order: { id: string; createdAt: string } };
    expect(json.order.id).toBe("ord-99");
    expect(json.order.createdAt).toBe("2026-05-01T10:00:00.000Z");
  });
});
