import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "STRTKIN.in | Modern Men's Fashion",
  description: "Discover modern menswear and everyday essentials.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black antialiased`}>
        <CartProvider>
          {/* Announcement Bar */}
          <div className="bg-black text-white text-xs py-2 text-center tracking-widest uppercase">
            Cash on Delivery Available Across India • Free Shipping on Orders Over ₹999
          </div>

          {/* Dynamic Header */}
          <Header />

          {/* Main Content */}
          <main className="min-h-screen">{children}</main>

          {/* Footer */}
          <footer className="bg-neutral-900 text-white pt-16 pb-12 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div>
                <h3 className="text-lg font-bold tracking-tight mb-4">STRTKIN.in</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Premium modern menswear and everyday essentials built for contemporary style.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-wider uppercase mb-4 text-neutral-300">Quick Links</h4>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li><Link href="/shop" className="hover:text-white transition">Shop All</Link></li>
                  <li><Link href="/shop?category=new-arrivals" className="hover:text-white transition">New Arrivals</Link></li>
                  <li><Link href="/shop?category=best-sellers" className="hover:text-white transition">Best Sellers</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-wider uppercase mb-4 text-neutral-300">Customer Care</h4>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li><Link href="/checkout" className="hover:text-white transition">Cash on Delivery Info</Link></li>
                  <li><a href="mailto:strtkin.in@gmail.com" className="hover:text-white transition">strtkin.in@gmail.com</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-wider uppercase mb-4 text-neutral-300">Secure Operations</h4>
                <p className="text-neutral-400 text-sm">
                  Orders are processed securely with Cash on Delivery verification.
                </p>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-neutral-800 text-center text-xs text-neutral-500">
              &copy; 2026 STRTKIN.in. All rights reserved.
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}