"use client";

import Link from "next/link";
import { ShoppingBag, User, Search } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cartItems } = useCart();
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
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
              {totalCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}