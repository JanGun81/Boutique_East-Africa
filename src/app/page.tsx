                                                                                                                                                                                                                                                                                                                                                                                        /**
 * Startsida – mobilförst, varm östafrikansk design.
 * Tydlig header, hero, två vägar: wizard ("Börja här") och "Se alla produkter".
 */

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-accent text-white shadow-soft sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <Link href="/" className="block">
            <h1 className="text-xl font-bold md:text-2xl tracking-tight">
              Östafrikansk Butik
            </h1>
            <p className="text-sm text-white/90 mt-0.5">
              Dirac · Baatis · Macwiis · Unsi &amp; mer
            </p>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-warm-100 to-warm-50 border-b border-warm-200/60">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Välkommen
          </h2>
          <p className="text-gray-700 max-w-xl text-base md:text-lg leading-relaxed">
            Kläder och produkter med östafrikanskt tema – från somaliska, etiopiska
            och eritreanska traditioner. Här hittar du dirac, baatis, macwiis, unsi
            (rökelse) och mer. Enkelt att beställa – steg för steg eller bläddra fritt.
          </p>
        </div>
      </section>

      {/* Huvudval: två vägar */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-4">
          Så beställer du
        </p>

        <div className="grid gap-6 md:grid-cols-2 max-w-3xl">
          {/* Primär: Wizard – Börja här */}
          <Link
            href="/bestall"
            className="group flex flex-col rounded-2xl bg-white border-2 border-accent shadow-card hover:shadow-soft hover:border-accent-dark transition-all duration-200 overflow-hidden"
          >
            <div className="bg-accent text-white px-5 py-4">
              <span className="text-sm font-medium opacity-90">Steg för steg</span>
              <h3 className="text-xl font-bold mt-1">Börja här</h3>
            </div>
            <div className="px-5 py-4 flex-1">
              <p className="text-gray-600 text-sm leading-relaxed">
                Välj produkt → storlek → tillbehör → granska → lägg i varukorg.
                Som att beställa vid en skärm – enkelt och tydligt.
              </p>
              <span className="inline-flex items-center gap-1 mt-4 text-accent font-semibold text-sm group-hover:gap-2 transition-all">
                Starta beställning
                <span aria-hidden>→</span>
              </span>
            </div>
          </Link>

          {/* Sekundär: Se alla produkter */}
          <Link
            href="/produkter"
            className="group flex flex-col rounded-2xl bg-white border-2 border-warm-300 shadow-card hover:shadow-soft hover:border-warm-400 transition-all duration-200 overflow-hidden"
          >
            <div className="bg-warm-200/80 text-gray-800 px-5 py-4">
              <span className="text-sm font-medium text-gray-600">Bläddra</span>
              <h3 className="text-xl font-bold mt-1 text-gray-800">Se alla produkter</h3>
            </div>
            <div className="px-5 py-4 flex-1">
              <p className="text-gray-600 text-sm leading-relaxed">
                Utforska hela sortimentet. Filtrera och välj det du vill, lägg i
                varukorg när du är redo.
              </p>
              <span className="inline-flex items-center gap-1 mt-4 text-earth font-semibold text-sm group-hover:gap-2 transition-all">
                Öppna katalogen
                <span aria-hidden>→</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Kategorier – snabborientering */}
        <section className="mt-12 pt-8 border-t border-warm-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Populära kategorier
          </h3>
          <div className="flex flex-wrap gap-2">
            {["Dirac", "Baatis", "Macwiis", "Unsi", "Övrigt"].map((name) => (
              <span
                key={name}
                className="px-4 py-2 rounded-full bg-warm-100 text-gray-700 text-sm font-medium border border-warm-200"
              >
                {name}
              </span>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-warm-200 bg-warm-100 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-600">
            Östafrikansk Butik – varma toner, enkel beställning · Mobilförst · PWA
          </p>
        </div>
      </footer>
    </div>
  );
}
