"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Top Black Banner */}
      <div className="bg-black text-white text-[11px] font-black uppercase tracking-widest text-center py-2 border-b border-neutral-900">
        CASH ON DELIVERY AVAILABLE ACROSS INDIA • FREE SHIPPING ON ORDERS OVER ₹1,999
      </div>

      {/* Main Navigation Header */}
      <header className="bg-black text-white border-b border-neutral-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo - Navigates to Home Page */}
          <Link href="/" className="text-2xl sm:text-3xl font-black tracking-tighter uppercase">
            STRTKIN<span className="text-[#FF5500]">.IN</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-extrabold uppercase tracking-widest text-neutral-300">
            <Link href="/shop" className="hover:text-white transition">Shop All</Link>
            <Link href="/shop?category=t-shirts" className="hover:text-white transition">Tees</Link>
            <Link href="/shop?category=shirts" className="hover:text-white transition">Shirts</Link>
            <Link href="/shop?category=jeans" className="hover:text-white transition">Jeans</Link>
            <Link href="/shop?category=hoodies" className="hover:text-white transition">Hoodies</Link>
            <Link href="/about" className="hover:text-white transition">About</Link>
          </nav>

          {/* Cart Bag Icon */}
          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-4 py-2.5 hover:border-[#FF5500] transition"
            >
              <ShoppingBag className="w-4 h-4 text-[#FF5500]" />
              <span className="text-xs font-black uppercase tracking-widest">BAG</span>
              {totalItems > 0 && (
                <span className="bg-[#FF5500] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

        </div>
      </header>
    </>
  );
}