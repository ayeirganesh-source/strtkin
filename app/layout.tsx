import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ShoppingBag, User, Search } from "lucide-react";

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
        {/* Announcement Bar */}
        <div className="bg-black text-white text-xs py-2 text-center tracking-widest uppercase">
          Cash on Delivery Available Across India • Free Shipping on Orders Over ₹999
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-xl font-black tracking-tighter">
                STRTKIN<span className="text-neutral-400">.in</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
                <Link href="/shop" className="hover:text-black transition">Shop</Link>
                <Link href="/shop?category=t-shirts" className="hover:text-black transition">T-Shirts</Link>
                <Link href="/shop?category=shirts" className="hover:text-black transition">Shirts</Link>
                <Link href="/shop?category=jeans" className="hover:text-black transition">Jeans</Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/shop" className="p-2 text-neutral-600 hover:text-black transition">
                <Search className="w-5 h-5" />
              </Link>
              <Link href="/admin/login" className="p-2 text-neutral-600 hover:text-black transition" title="Admin Portal">
                <User className="w-5 h-5" />
              </Link>
              <Link href="/cart" className="p-2 text-neutral-600 hover:text-black transition relative flex items-center">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </Link>
            </div>
          </div>
        </header>

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
&copy; 2026 STRTKIN.in. All rights reserved.          </div>
        </footer>
      </body>
    </html>
  );
}
