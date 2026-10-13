"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const INITIAL_PRODUCTS = [
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

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sync state with URL category parameter
  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory.toLowerCase());
    } else {
      setSelectedCategory("all");
    }
  }, [urlCategory]);

  // Load from localStorage
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
        console.error("Failed to parse products", e);
      }
    }
  }, []);

  // Strict filtering by category
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-neutral-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">STRTKIN.in Storefront</span>
          <h1 className="text-3xl font-black uppercase tracking-tight mt-1">
            {selectedCategory === "all" ? "Complete Apparel Collection" : `${selectedCategory} Collection`}
          </h1>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          {[
            { label: "All", value: "all" },
            { label: "T-Shirts", value: "t-shirts" },
            { label: "Shirts", value: "shirts" },
            { label: "Jeans", value: "jeans" },
            { label: "Hoodies", value: "hoodies" },
          ].map((cat) => (
            <Link
              key={cat.value}
              href={cat.value === "all" ? "/shop" : `/shop?category=${cat.value}`}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition border ${
                selectedCategory === cat.value
                  ? "bg-black text-white border-black"
                  : "bg-white text-neutral-600 border-neutral-300 hover:border-black"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-neutral-500 uppercase tracking-widest text-sm">
          No products found in the "{selectedCategory}" category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/shop/${product.id}`} className="group block">
              <div className="aspect-[4/5] bg-neutral-100 overflow-hidden relative mb-4 border border-neutral-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                  Save 40%
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">{product.category}</span>
                <h3 className="font-bold text-sm text-neutral-900 group-hover:underline truncate">{product.name}</h3>
                <div className="flex items-center gap-3 pt-1">
                  <span className="font-bold text-sm">₹{product.price}</span>
                  <span className="text-xs text-neutral-400 line-through">₹{product.originalPrice}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm uppercase tracking-widest">Loading Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}