"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Truck, ShieldCheck, RefreshCw } from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Read ONLY items added manually in Admin (defaults stripped)
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

    // Read Cart Quantity
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
      
      {/* Announcement Bar */}
      <div className="bg-[#FF5500] text-black text-[11px] font-black uppercase tracking-widest text-center py-2 px-4 flex justify-center items-center gap-2">
        <Truck className="w-3.5 h-3.5" /> FREE EXPRESS SHIPPING ON ORDERS OVER ₹199 | CASH ON DELIVERY AVAILABLE
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        
        {/* Category Navigation Bar */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4 overflow-x-auto gap-4">
          <div className="flex items-center gap-6 text-xs font-extrabold uppercase tracking-widest text-neutral-400 min-w-max">
            <Link href="/" className="text-[#FF5500] hover:text-white transition">Shop All</Link>
            <Link href="/shop?category=tees" className="hover:text-white transition">Tees</Link>
            <Link href="/shop?category=shirts" className="hover:text-white transition">Shirts</Link>
            <Link href="/shop?category=jeans" className="hover:text-white transition">Jeans</Link>
            <Link href="/shop?category=hoodies" className="hover:text-white transition">Hoodies</Link>
          </div>
          <Link
            href="/admin"
            className="text-[10px] font-black uppercase tracking-widest bg-neutral-900 border border-neutral-800 text-neutral-300 px-3 py-1.5 hover:border-[#FF5500] transition min-w-max"
          >
            Admin Control Room &rarr;
          </Link>
        </div>

        {/* Section Heading */}
        <div className="flex justify-between items-end border-b border-neutral-800 pb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#FF5500] block mb-1">
              Live Catalog
            </span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
              CURRENT DROPS
            </h1>
          </div>
        </div>

        {/* Dynamic Products Grid */}
        {products.length === 0 ? (
          <div className="border border-neutral-800 bg-neutral-950 p-20 text-center space-y-4">
            <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto" />
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              No live drops available right now. Visit the Admin Control Center to add your products.
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
                  href={`/cart`}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs uppercase tracking-widest py-3 font-black hover:bg-[#FF5500] hover:border-[#FF5500] transition flex items-center justify-center gap-2"
                >
                  View Product <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Store Trust / Value Props Footer Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-neutral-800">
          <div className="flex items-center gap-4 bg-neutral-950 border border-neutral-800 p-4">
            <Truck className="w-8 h-8 text-[#FF5500]" />
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider">Fast COD Shipping</h4>
              <p className="text-[11px] text-neutral-400">Verified cash-on-delivery across India</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-neutral-950 border border-neutral-800 p-4">
            <ShieldCheck className="w-8 h-8 text-[#FF5500]" />
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider">100% Premium Cotton</h4>
              <p className="text-[11px] text-neutral-400">Heavyweight streetwear craftsmanship</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-neutral-950 border border-neutral-800 p-4">
            <RefreshCw className="w-8 h-8 text-[#FF5500]" />
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider">Easy Size Exchange</h4>
              <p className="text-[11px] text-neutral-400">Hassle-free replacement policy</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}