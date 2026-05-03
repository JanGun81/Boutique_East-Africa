/**
 * API: POST /api/orders – skapa gästbeställning via tjänstelagret.
 */

import { NextResponse } from "next/server";
import { validateCreateOrderRequest } from "@/lib/api-contract/order";
import type { CreateOrderErrorBody, CreateOrderResponse } from "@/lib/api-contract/types";
import { orderService } from "@/lib/core/services";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { errors: ["Ogiltig JSON."] } satisfies CreateOrderErrorBody,
      { status: 400 },
    );
  }

  const validated = validateCreateOrderRequest(body);
  if (!validated.ok) {
    return NextResponse.json(
      { errors: validated.errors } satisfies CreateOrderErrorBody,
      { status: 400 },
    );
  }

  const result = await orderService.createOrder(validated.value);
  if (!result.ok) {
    return NextResponse.json(
      { errors: result.errors } satisfies CreateOrderErrorBody,
      { status: 400 },
    );
  }

  const response: CreateOrderResponse = {
    order: {
      id: result.order.id,
      totalCents: result.order.totalCents,
      status: result.order.status,
      createdAt: result.order.createdAt.toISOString(),
    },
  };
  return NextResponse.json(response, { status: 201 });
}
