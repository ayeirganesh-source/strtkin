"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Load products from localStorage or use fallback sample if empty
    const savedProducts = localStorage.getItem("strtkin_products");
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        if (parsed.length > 0) {
          setProducts(parsed);
        } else {
          // Default initial product if admin deleted everything
          const defaultProduct = {
            id: "1",
            name: "Heavyweight Boxy Tee",
            category: "t-shirts",
            price: 799,
            originalPrice: 1299,
            description: "Premium heavy cotton streetwear tee with relaxed boxy fit.",
            image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60"
          };
          setProducts([defaultProduct]);
          localStorage.setItem("strtkin_products", JSON.stringify([defaultProduct]));
        }
      } catch (e) {
        setProducts([]);
      }
    } else {
      const defaultProduct = {
        id: "1",
        name: "Heavyweight Boxy Tee",
        category: "t-shirts",
        price: 799,
        originalPrice: 1299,
        description: "Premium heavy cotton streetwear tee with relaxed boxy fit.",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60"
      };
      setProducts([defaultProduct]);
      localStorage.setItem("strtkin_products", JSON.stringify([defaultProduct]));
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

        {/* Dynamic Products Grid */}
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
      </main>
    </div>
  );
}