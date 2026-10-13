"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Filter } from "lucide-react";
import { getStoredProducts } from "../lib/products";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const loadProducts = () => {
    setProducts(getStoredProducts());
  };

  useEffect(() => {
    loadProducts();

    window.addEventListener("strtkin_products_updated", loadProducts);
    window.addEventListener("storage", loadProducts);

    return () => {
      window.removeEventListener("strtkin_products_updated", loadProducts);
      window.removeEventListener("storage", loadProducts);
    };
  }, []);

  const filteredProducts =
    selectedCategory === "ALL"
      ? products
      : products.filter(
          (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FF5500] selection:text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-neutral-800 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#FF5500]">
              STRTKIN.IN STOREFRONT
            </span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mt-1">
              COMPLETE APPAREL COLLECTION
            </h1>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {["ALL", "T-SHIRTS", "SHIRTS", "JEANS", "HOODIES"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-black uppercase tracking-widest px-4 py-2 transition ${
                  selectedCategory === cat
                    ? "bg-[#FF5500] text-white"
                    : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center border border-neutral-800 bg-neutral-950">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              No products found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
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
                    {product.originalPrice && (
                      <span className="absolute top-3 left-3 bg-[#FF5500] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1">
                        SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-bold text-sm text-white group-hover:text-[#FF5500] transition line-clamp-2">
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-900">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-white">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs font-bold text-neutral-500 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}