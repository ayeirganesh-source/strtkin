"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <>
      {/* Top Black Banner */}
      <div className="bg-black text-white text-[11px] font-bold tracking-widest uppercase py-2.5 text-center border-b border-neutral-800">
        CASH ON DELIVERY AVAILABLE ACROSS INDIA • FREE SHIPPING ON ORDERS OVER ₹1,999
      </div>

      {/* Main Navigation Header */}
      <header className="bg-[#FAF9F6] text-black border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-3xl font-black tracking-tighter uppercase flex items-center">
            STRTKIN<span className="text-[#FF5500]">.in</span>
          </Link>

          {/* Navigation Links with Category Query Params */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-neutral-800">
            <Link href="/shop" className="hover:text-[#FF5500] transition">Shop All</Link>
            <Link href="/shop?category=t-shirts" className="hover:text-[#FF5500] transition">Tees</Link>
            <Link href="/shop?category=shirts" className="hover:text-[#FF5500] transition">Shirts</Link>
            <Link href="/shop?category=jeans" className="hover:text-[#FF5500] transition">Jeans</Link>
            <Link href="/shop?category=hoodies" className="hover:text-[#FF5500] transition">Hoodies</Link>
          </nav>

          {/* Shopping Bag Icon */}
          <Link
            href="/cart"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#FF5500] transition"
          >
            <span>BAG</span>
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF5500] text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>
        </div>
      </header>
    </>
  );
}