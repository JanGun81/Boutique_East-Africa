"use client";

import { useEffect, useState } from "react";
import type { ProductDto, ProductsResponse } from "@/lib/api-contract/types";
import { DEMO_PRODUCTS } from "@/lib/demo-products";
import { ProductCard } from "./ProductCard";

export function ProductGrid() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: ProductsResponse) => {
        if (data.products?.length) {
          setProducts(data.products);
        } else {
          setProducts(DEMO_PRODUCTS);
        }
      })
      .catch(() => setProducts(DEMO_PRODUCTS))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl bg-warm-100 aspect-[4/3] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-gray-600">
        Inga produkter att visa just nu. Kör <code className="bg-warm-100 px-1 rounded">npm run db:seed</code> om du har databas kopplad.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
