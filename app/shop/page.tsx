"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ALL_PRODUCTS = [
  {
    id: "1",
    name: "Oversized Heavyweight Black Tee",
    category: "t-shirts",
    price: 799,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    name: "Classic Oxford White Button-Down",
    category: "shirts",
    price: 1499,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    name: "Slim Fit Raw Indigo Denim Jeans",
    category: "jeans",
    price: 1999,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "4",
    name: "Minimalist Black Hoodie",
    category: "hoodies",
    price: 2199,
    originalPrice: 3799,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=60",
  },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");

  const filteredProducts =
    selectedCategory === "all" || !selectedCategory
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-neutral-200">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Men's Catalog</h1>
          <p className="text-sm text-neutral-500 mt-1">Explore our latest drops and essential menswear.</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          {["all", "t-shirts", "shirts", "jeans", "hoodies"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs uppercase tracking-wider px-4 py-2 font-semibold transition border ${
                selectedCategory === cat
                  ? "bg-black text-white border-black"
                  : "bg-white text-neutral-700 border-neutral-300 hover:border-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/shop/${product.id}`} className="group cursor-pointer space-y-3 block">
            <div className="aspect-[4/5] bg-neutral-100 relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <span className="absolute top-2 left-2 bg-black text-white text-[10px] uppercase px-2 py-1 tracking-widest font-bold">
                New
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-neutral-900 group-hover:underline">{product.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-sm">₹{product.price}</span>
                <span className="text-xs text-neutral-400 line-through">₹{product.originalPrice}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
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