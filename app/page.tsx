"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { getStoredProducts } from "./lib/products";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);

  const refreshProducts = () => {
    setProducts(getStoredProducts());
  };

  useEffect(() => {
    refreshProducts();

    window.addEventListener("strtkin_products_updated", refreshProducts);
    window.addEventListener("storage", refreshProducts);

    return () => {
      window.removeEventListener("strtkin_products_updated", refreshProducts);
      window.removeEventListener("storage", refreshProducts);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-black font-sans selection:bg-[#FF5500] selection:text-white">
      {/* Top Announcement Bar / Marquee */}
      <div className="bg-black text-white text-[11px] font-bold uppercase tracking-widest py-2.5 px-4 overflow-hidden border-b border-neutral-800">
        <div className="flex justify-between items-center max-w-7xl mx-auto whitespace-nowrap gap-6 text-neutral-300">
          <span className="flex items-center gap-2">
            FREE SHIPPING ACROSS INDIA OVER ₹1,999 <span className="text-[#FF5500]">■</span>
          </span>
          <span className="hidden sm:flex items-center gap-2">
            DROP 04 — CONCRETE SEASON — OUT NOW <span className="text-[#FF5500]">■</span>
          </span>
          <span className="hidden md:flex items-center gap-2">
            7-DAY EASY EXCHANGES <span className="text-[#FF5500]">■</span>
          </span>
          <span className="hidden lg:flex items-center gap-2">
            MADE IN INDIA <span className="text-[#FF5500]">■</span>
          </span>
        </div>
      </div>

      {/* Off-White Header Navigation */}
      <header className="bg-[#F4F1EA] border-b border-neutral-300 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black uppercase tracking-tighter text-black flex items-center">
            STRTKIN<span className="text-[#FF5500]">.IN</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-neutral-800">
            <Link href="/shop" className="hover:text-[#FF5500] transition">
              SHOP ALL
            </Link>
            <Link href="/shop" className="hover:text-[#FF5500] transition">
              TEES
            </Link>
            <Link href="/shop" className="hover:text-[#FF5500] transition">
              HOODIES
            </Link>
            <Link href="/shop" className="hover:text-[#FF5500] transition">
              OUTERWEAR
            </Link>
          </nav>

          <Link
            href="/shop"
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black border border-black px-4 py-2 hover:bg-black hover:text-white transition"
          >
            BAG <ShoppingBag className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-black text-white min-h-[85vh] flex items-end pb-16 pt-28 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1600&auto=format&fit=crop&q=80"
            alt="Born On The Street Hero"
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-6">
          <span className="text-xs font-black uppercase tracking-widest text-[#FF5500] block">
            DROP 04 — CONCRETE SEASON
          </span>

          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none text-white max-w-4xl">
            BORN ON <br />
            THE STREET<span className="inline-block w-4 h-4 sm:w-6 sm:h-6 bg-[#FF5500] ml-2"></span>
          </h1>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
            Heavyweight essentials and statement outerwear, cut in India for the city-born. Built to be worn hard.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="bg-[#FF5500] text-white text-xs font-black uppercase tracking-widest px-8 py-4 hover:bg-[#e04b00] transition flex items-center gap-2"
            >
              SHOP THE DROP <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop"
              className="border border-neutral-400 text-white text-xs font-black uppercase tracking-widest px-8 py-4 hover:bg-white hover:text-black transition"
            >
              OUR STORY
            </Link>
          </div>
        </div>
      </section>

      {/* Storefront Product Catalog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-12 pb-4 border-b border-neutral-300">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#FF5500]">
              LIVE CATALOG
            </span>
            <h2 className="text-4xl font-black uppercase tracking-tight text-black mt-1">
              CURRENT DROPS
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-black uppercase tracking-widest text-neutral-600 hover:text-black transition flex items-center gap-1"
          >
            VIEW ALL CATALOG <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center border border-neutral-300 bg-[#EAE6DF]">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">
              No products uploaded yet. Add items in /admin dashboard.
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
                  className="group border border-neutral-300 bg-white overflow-hidden hover:border-[#FF5500] transition flex flex-col shadow-sm"
                >
                  <div className="aspect-[4/5] bg-neutral-200 relative overflow-hidden">
                    <img
                      src={displayImage}
                      alt={product.name}
                      className={`w-full h-full object-cover group-hover:scale-105 transition duration-500 ${
                        product.inStock === false ? "opacity-50 grayscale" : ""
                      }`}
                    />
                    {product.inStock === false ? (
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1">
                        OUT OF STOCK
                      </span>
                    ) : (
                      <span className="absolute top-3 left-3 bg-[#FF5500] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1">
                        NEW DROP
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 block mb-1">
                        {product.category || "STREETWEAR"}
                      </span>
                      <h3 className="font-bold text-base text-black group-hover:text-[#FF5500] transition line-clamp-2">
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-black">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs font-bold text-neutral-400 line-through">
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

      {/* Trust Highlights Section */}
      <section className="border-t border-neutral-300 bg-[#EAE6DF] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <Truck className="w-8 h-8 text-[#FF5500] shrink-0" />
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-black">ALL INDIA SHIPPING</h4>
              <p className="text-xs text-neutral-600 mt-1">Cash on delivery available nationwide.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <ShieldCheck className="w-8 h-8 text-[#FF5500] shrink-0" />
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-black">VERIFIED QUALITY</h4>
              <p className="text-xs text-neutral-600 mt-1">Heavyweight combed cotton blend fabrics.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <RotateCcw className="w-8 h-8 text-[#FF5500] shrink-0" />
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-black">EASY EXCHANGES</h4>
              <p className="text-xs text-neutral-600 mt-1">Hassle-free 7-day doorstep replacement.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}