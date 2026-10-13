"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function Header() {
  const [cartCount, setCartCount] = useState<number>(0);

  const updateCartCount = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("strtkin_cart");
      if (stored) {
        try {
          const items = JSON.parse(stored);
          const total = items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
          setCartCount(total);
        } catch (e) {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    }
  };

  useEffect(() => {
    updateCartCount();

    window.addEventListener("strtkin_cart_updated", updateCartCount);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("strtkin_cart_updated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <header className="bg-black border-b border-neutral-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-black uppercase tracking-tighter text-white flex items-center">
            STRTKIN<span className="text-[#FF5500]">.IN</span>
          </Link>
          {/* Admin shortcut link */}
          <Link href="/admin" className="text-[10px] font-bold text-neutral-500 hover:text-[#FF5500] uppercase tracking-widest transition">
            [ADMIN]
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Link href="/shop" className="hover:text-[#FF5500] transition">
            SHOP ALL
          </Link>
          <Link href="/shop" className="hover:text-[#FF5500] transition">
            TEES
          </Link>
          <Link href="/shop" className="hover:text-[#FF5500] transition">
            SHIRTS
          </Link>
          <Link href="/shop" className="hover:text-[#FF5500] transition">
            JEANS
          </Link>
          <Link href="/shop" className="hover:text-[#FF5500] transition">
            HOODIES
          </Link>
          <Link href="/about" className="hover:text-[#FF5500] transition">
            ABOUT
          </Link>
        </nav>

        <Link
          href="/cart"
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white border border-neutral-800 bg-neutral-900 px-4 py-2 hover:border-[#FF5500] transition"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#FF5500]" />
          BAG ({cartCount})
        </Link>
      </div>
    </header>
  );
}