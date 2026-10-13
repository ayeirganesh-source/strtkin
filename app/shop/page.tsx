"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const DEFAULT_PRODUCTS = [
  {
    id: "1",
    name: "Oversized Heavyweight Black Tee",
    category: "t-shirts",
    price: 799,
    originalPrice: 1299,
    description: "Premium 240 GSM 100% combed cotton oversized t-shirt.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    name: "Classic Oxford White Button-Down",
    category: "shirts",
    price: 1499,
    originalPrice: 2499,
    description: "Tailored Oxford woven cotton shirt.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    name: "Slim Fit Raw Indigo Denim Jeans",
    category: "jeans",
    price: 1999,
    originalPrice: 3499,
    description: "Heavy-duty 14oz raw stretch denim.",
    sizes: ["30", "32", "34", "36"],
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "4",
    name: "Minimalist Black Hoodie",
    category: "hoodies",
    price: 2199,
    originalPrice: 3799,
    description: "Ultra-soft fleece-lined hoodie.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=60",
  },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");

  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sync with URL category parameter
  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory.toLowerCase());
    } else {
      setSelectedCategory("all");
    }
  }, [urlCategory]);

  // Load live updated products from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("strtkin_products");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const normalized = parsed.map((p: any) => ({
          ...p,
          id: String(p.id),
          sizes: typeof p.sizes === "string" ? p.sizes.split(", ").map((s: string) => s.trim()) : p.sizes,
        }));
        setProducts(normalized);
      } catch (e) {
        console.error("Failed to parse products from localStorage", e);
      }
    }
  }, []);

  // Strict category filtering
  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter((p) => {
        const cat = p.category.toLowerCase();
        if (selectedCategory === "t-shirts" || selectedCategory === "tees") {
          return cat === "t-shirts" || cat === "tees";
        }
        return cat === selectedCategory;
      });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FF5500] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Catalog Header Frame */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pb-6 border-b border-neutral-800">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#FF5500] block mb-2">
              STRTKIN.IN STOREFRONT
            </span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white">
              {selectedCategory === "all" ? "COMPLETE APPAREL COLLECTION" : `${selectedCategory} COLLECTION`}
            </h1>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {[
              { label: "ALL", value: "all" },
              { label: "T-SHIRTS", value: "t-shirts" },
              { label: "SHIRTS", value: "shirts" },
              { label: "JEANS", value: "jeans" },
              { label: "HOODIES", value: "hoodies" },
            ].map((cat) => (
              <Link
                key={cat.value}
                href={cat.value === "all" ? "/shop" : `/shop?category=${cat.value}`}
                className={`px-5 py-2.5 text-xs font-extrabold uppercase tracking-widest transition border ${
                  selectedCategory === cat.value
                    ? "bg-[#FF5500] text-white border-[#FF5500] shadow-lg shadow-[#FF5500]/20"
                    : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-28 border border-neutral-800 bg-neutral-950/50">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              NO PRODUCTS FOUND IN THE "{selectedCategory}" CATEGORY.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/shop/${product.id}`} className="group block space-y-3">
                <div className="aspect-[4/5] bg-neutral-950 overflow-hidden relative border border-neutral-800/80 group-hover:border-[#FF5500]/60 transition duration-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <span className="absolute top-3 left-3 bg-[#FF5500] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1">
                    SAVE 40%
                  </span>
                </div>
                
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#FF5500] block">
                    {product.category}
                  </span>
                  <h3 className="font-extrabold text-sm text-neutral-100 group-hover:text-[#FF5500] transition truncate uppercase tracking-tight">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-3 pt-1">
                    <span className="font-black text-sm text-white">₹{product.price}</span>
                    <span className="text-xs text-neutral-500 line-through font-medium">₹{product.originalPrice}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-xs uppercase font-extrabold tracking-widest bg-black text-neutral-500">LOADING CATALOG...</div>}>
      <ShopContent />
    </Suspense>
  );
}