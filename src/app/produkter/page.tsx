/**
 * Alla produkter – bläddra i sortimentet, lägg i varukorg.
 */

import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { CartSummary } from "@/components/CartSummary";

export default function ProdukterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-accent text-white shadow-soft sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="text-white/90 hover:text-white text-sm shrink-0">
            ← Tillbaka
          </Link>
          <h1 className="text-lg font-bold truncate">Alla produkter</h1>
          <div className="w-16 shrink-0" aria-hidden />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          <div className="flex-1 min-w-0">
            <p className="text-gray-600 mb-6">
              Välj produkter och lägg i varukorg. När du är redo kan du gå vidare
              till kassan (kommer snart).
            </p>
            <ProductGrid />
          </div>
          <aside className="lg:w-80 shrink-0">
            <div className="lg:sticky lg:top-20">
              <CartSummary />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
