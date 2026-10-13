"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Load products from localStorage (synced with Admin Panel)
    const savedProducts = localStorage.getItem("strtkin_products");
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        setProducts([]);
      }
    } else {
      setProducts([]);
      localStorage.setItem("strtkin_products", JSON.stringify([]));
    }

    // Load Cart Count
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("strtkin_cart");
      if (savedCart) {
        try {
          const cart = JSON.parse(savedCart);
          const totalQty = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
          setCartCount(totalQty);
        } catch (e) {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FF5500] selection:text-white pb-20">
      
      {/* Top Header / Navigation */}
      <header className="border-b border-neutral-800 bg-black sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-2xl font-black uppercase tracking-tighter text-white">
              STRTKIN.IN
            </Link>
            <Link
              href="/admin"
              className="text-[10px] font-bold uppercase tracking-widest bg-neutral-900 border border-neutral-800 text-neutral-400 px-2 py-1 hover:text-white transition"
            >
              [Admin]
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-neutral-400">
            <Link href="/" className="text-white hover:text-[#FF5500] transition">Shop All</Link>
            <Link href="/admin" className="hover:text-[#FF5500] transition">Control Center</Link>
          </nav>

          <Link
            href="/cart"
            className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-4 py-2 text-xs font-black uppercase tracking-widest hover:border-neutral-600 transition"
          >
            <ShoppingBag className="w-4 h-4 text-[#FF5500]" />
            Bag ({cartCount})
          </Link>
        </div>
      </header>

      {/* Hero / Live Catalog Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10">
        <div className="flex justify-between items-end border-b border-neutral-800 pb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#FF5500] block mb-1">
              Live Catalog
            </span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Current Drops
            </h1>
          </div>
        </div>

        {/* Dynamic Products Grid from LocalStorage */}
        {products.length === 0 ? (
          <div className="border border-neutral-800 bg-neutral-950 p-20 text-center space-y-4">
            <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto" />
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              No live drops available right now. Visit the Admin Control Center to add products.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 bg-[#FF5500] text-white text-xs uppercase tracking-widest px-6 py-3 font-black hover:bg-[#e04b00] transition"
            >
              Go to Admin Panel <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="border border-neutral-800 bg-neutral-950 group space-y-4 p-4 hover:border-neutral-700 transition"
              >
                <div className="aspect-[4/3] bg-neutral-900 overflow-hidden relative border border-neutral-800">
                  <img
                    src={product.image || product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#FF5500] text-white text-[10px] font-black uppercase tracking-widest px-2 py-1">
                    {product.category}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-white truncate">{product.name}</h3>
                  <p className="text-xs text-neutral-400 line-clamp-2">{product.description}</p>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="font-black text-white text-base">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-neutral-500 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <Link
                  href={`/shop/${product.id}`}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs uppercase tracking-widest py-3 font-black hover:bg-[#FF5500] hover:border-[#FF5500] transition flex items-center justify-center gap-2"
                >
                  View Product <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}