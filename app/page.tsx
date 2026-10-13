"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Read ONLY items added by you in localStorage
    const savedProducts = localStorage.getItem("strtkin_products");
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        setProducts([]);
      }
    } else {
      setProducts([]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FF5500] selection:text-white pb-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10">
        
        {/* Title Section */}
        <div className="flex justify-between items-end border-b border-neutral-800 pb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#FF5500] block mb-1">
              Live Catalog
            </span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Current Drops
            </h1>
          </div>
          <Link
            href="/admin"
            className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-[#FF5500] transition"
          >
            Control Center &rarr;
          </Link>
        </div>

        {/* Product Grid - Only renders products YOU add */}
        {products.length === 0 ? (
          <div className="border border-neutral-800 bg-neutral-950 p-20 text-center space-y-4">
            <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto" />
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              No live drops available right now. Visit the Admin Control Center to publish your products.
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