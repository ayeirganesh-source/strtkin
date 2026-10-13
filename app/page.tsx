"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { getStoredProducts } from "./lib/products";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);

  const loadProducts = () => {
    setProducts(getStoredProducts());
  };

  useEffect(() => {
    loadProducts();

    // Listen for custom update event and localStorage storage events
    window.addEventListener("strtkin_products_updated", loadProducts);
    window.addEventListener("storage", loadProducts);

    return () => {
      window.removeEventListener("strtkin_products_updated", loadProducts);
      window.removeEventListener("storage", loadProducts);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FF5500] selection:text-white">
      {/* Hero Section */}
      <section className="relative border-b border-neutral-800 bg-neutral-950 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl space-y-6">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF5500] bg-[#FF5500]/10 border border-[#FF5500]/20 px-3 py-1">
              NEW SEASON DROP 2026
            </span>
            <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none text-white">
              HEAVYWEIGHT <br />
              <span className="text-[#FF5500]">STREETWEAR</span>
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Designed for maximum comfort and durability. Premium drop-shoulder oversized fits crafted with heavy 240+ GSM fabrics and bold artistic prints.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="bg-[#FF5500] text-white text-xs font-black uppercase tracking-widest px-8 py-4 hover:bg-[#e04b00] transition flex items-center gap-2"
              >
                EXPLORE CATALOG <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Storefront Catalog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-10 pb-4 border-b border-neutral-800">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#FF5500]">
              STRTKIN STOREFRONT
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white mt-1">
              LATEST COLLECTION
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-white transition flex items-center gap-1"
          >
            VIEW ALL <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center border border-neutral-800 bg-neutral-950">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              No products uploaded yet. Add products via /admin dashboard.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const displayImage =
                product.images && product.images.length > 0
                  ? product.images[0]
                  : product.image;

              return (
                <Link
                  key={product.id}
                  href={`/shop/${product.id}`}
                  className="group border border-neutral-800 bg-neutral-950 overflow-hidden hover:border-[#FF5500] transition flex flex-col"
                >
                  <div className="aspect-[4/5] bg-neutral-900 relative overflow-hidden">
                    <img
                      src={displayImage}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#FF5500] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1">
                      NEW DROP
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 block mb-1">
                        {product.category || "TEES"}
                      </span>
                      <h3 className="font-bold text-base text-white group-hover:text-[#FF5500] transition line-clamp-2">
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-900">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-white">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs font-bold text-neutral-500 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-[#FF5500] flex items-center gap-1">
                        <ShoppingBag className="w-3.5 h-3.5" /> BUY NOW
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Trust Highlights */}
      <section className="border-t border-neutral-800 bg-neutral-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <Truck className="w-8 h-8 text-[#FF5500] shrink-0" />
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-white">ALL INDIA SHIPPING</h4>
              <p className="text-xs text-neutral-400 mt-1">Cash on delivery available nationwide.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <ShieldCheck className="w-8 h-8 text-[#FF5500] shrink-0" />
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-white">VERIFIED QUALITY</h4>
              <p className="text-xs text-neutral-400 mt-1">Heavyweight combed cotton blend fabrics.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <RotateCcw className="w-8 h-8 text-[#FF5500] shrink-0" />
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-white">EASY EXCHANGES</h4>
              <p className="text-xs text-neutral-400 mt-1">Hassle-free 7-day doorstep replacement.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}