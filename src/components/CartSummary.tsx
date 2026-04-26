"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
  }).format(cents / 100);
}

export function CartSummary() {
  const { items, itemCount, totalCents, removeItem } = useCart();

  if (itemCount === 0) {
    return null;
  }

  return (
    <div className="rounded-xl bg-white border border-warm-200 shadow-soft p-4">
      <h3 className="font-semibold text-gray-800 mb-2">
        Varukorg ({itemCount} {itemCount === 1 ? "produkt" : "produkter"})
      </h3>
      <ul className="space-y-2 text-sm">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="flex justify-between items-center gap-2">
            <span className="text-gray-700 truncate">
              {product.name} × {quantity}
            </span>
            <span className="text-accent font-medium shrink-0">
              {formatPrice(product.priceCents * quantity)}
            </span>
            <button
              type="button"
              onClick={() => removeItem(product.id)}
              className="text-gray-500 hover:text-accent text-xs shrink-0"
              aria-label={`Ta bort ${product.name}`}
            >
              Ta bort
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-3 pt-3 border-t border-warm-200 font-semibold text-gray-800 flex justify-between">
        <span>Totalt</span>
        <span className="text-accent">{formatPrice(totalCents)}</span>
      </p>
      <Link
        href="/kassa"
        className="mt-3 block w-full rounded-lg bg-accent text-white py-2.5 text-center text-sm font-medium hover:bg-accent-dark transition-colors"
      >
        Till kassan
      </Link>
    </div>
  );
}
