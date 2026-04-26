/**
 * Steg-för-steg beställning (wizard) – start.
 * Flöde: välj produkt → storlek → tillbehör → granska → lägg i varukorg.
 */

import Link from "next/link";

export default function BestallPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-accent text-white shadow-soft sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="text-white/90 hover:text-white text-sm">
            ← Tillbaka
          </Link>
          <h1 className="text-lg font-bold">Steg-för-steg beställning</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          <p className="text-gray-600 mb-6">
            Här bygger vi snart wizard-flödet: först väljer du produkt, sedan storlek,
            tillbehör, granskar och lägger i varukorg – som vid en självbetjäningsskärm.
          </p>
          <p className="text-sm text-gray-500">
            Steg 1 (välj produkt) kommer här. Länken &quot;Börja här&quot; på startsidan
            leder hit.
          </p>
        </div>
      </main>
    </div>
  );
}
