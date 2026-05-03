import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { CategoryNavRail } from "@/components/CategoryNavRail";

export const metadata: Metadata = {
  title: "Östafrikansk Butik – Dirac, Baatis, Macwiis & Unsi",
  description:
    "Kläder och produkter med östafrikanskt tema – somaliska, etiopiska och eritreanska traditioner.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#b53a2e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className="min-h-screen lg:pr-56">
        <CartProvider>{children}</CartProvider>
        <Suspense fallback={null}>
          <CategoryNavRail />
        </Suspense>
      </body>
    </html>
  );
}
