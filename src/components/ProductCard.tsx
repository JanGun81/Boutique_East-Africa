"use client";

import Image from "next/image";
import type { ProductDto } from "@/lib/api-contract/types";
import { useCart } from "@/lib/cart-context";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
  }).format(cents / 100);
}

export function ProductCard({ product }: { product: ProductDto }) {
  const { addItem } = useCart();

  return (
    <article className="rounded-2xl bg-white border border-warm-200 shadow-card overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] bg-warm-100">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 320px"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            Ingen bild
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-medium">Slutsåld</span>
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <span className="text-xs font-medium text-earth uppercase tracking-wider">
          {product.category.name}
        </span>
        <h3 className="font-semibold text-gray-800 mt-1">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {product.description}
          </p>
        )}
        <p className="mt-2 font-bold text-accent">{formatPrice(product.priceCents)}</p>
        <button
          type="button"
          onClick={() => addItem(product)}
          disabled={!product.inStock}
          className="mt-4 w-full rounded-lg bg-accent text-white py-2.5 text-sm font-medium hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Lägg i varukorg
        </button>
      </div>
    </article>
  );
}
