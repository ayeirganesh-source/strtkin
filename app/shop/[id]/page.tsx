"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck, Check } from "lucide-react";
import { useCart } from "@/app/context/CartContext"; // <-- Import useCart

const ALL_PRODUCTS = [
  {
    id: "1",
    name: "Oversized Heavyweight Black Tee",
    category: "t-shirts",
    price: 799,
    originalPrice: 1299,
    description: "Premium 240 GSM 100% combed cotton oversized t-shirt. Built for comfort and an effortless street silhouette.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    name: "Classic Oxford White Button-Down",
    category: "shirts",
    price: 1499,
    originalPrice: 2499,
    description: "Tailored Oxford woven cotton shirt. Versatile look for elevated casualwear.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    name: "Slim Fit Raw Indigo Denim Jeans",
    category: "jeans",
    price: 1999,
    originalPrice: 3499,
    description: "Heavy-duty 14oz raw stretch denim. Modern slim tapered fit with custom branded hardware.",
    sizes: ["30", "32", "34", "36"],
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "4",
    name: "Minimalist Black Hoodie",
    category: "hoodies",
    price: 2199,
    originalPrice: 3799,
    description: "Ultra-soft fleece-lined hoodie featuring drop shoulders and double-layered hood structure.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=60",
  },
];

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const { addToCart } = useCart(); // <-- Initialize useCart hook

  const product = ALL_PRODUCTS.find((p) => p.id === productId) || ALL_PRODUCTS[0];

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    // Add item to global cart context and localStorage
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: selectedSize,
      image: product.image,
    });

    setAdded(true);
    setTimeout(() => {
      router.push("/cart");
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-black mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-[4/5] bg-neutral-100 overflow-hidden border border-neutral-200">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Product Details & Purchase Actions */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">{product.category}</span>
            <h1 className="text-3xl font-black uppercase tracking-tight mt-1">{product.name}</h1>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-2xl font-bold">₹{product.price}</span>
              <span className="text-sm text-neutral-400 line-through">₹{product.originalPrice}</span>
              <span className="text-xs font-bold bg-black text-white px-2 py-0.5 uppercase tracking-wider">Save 40%</span>
            </div>
          </div>

          <p className="text-sm text-neutral-600 leading-relaxed border-t border-neutral-200 pt-4">{product.description}</p>

          {/* Size Picker */}
          <div className="border-t border-neutral-200 pt-4 space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800">
              Select Size: <span className="text-neutral-500">{selectedSize}</span>
            </label>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 text-xs font-bold transition border ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-800 border-neutral-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 space-y-3">
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white text-xs uppercase tracking-widest py-4 font-bold hover:bg-neutral-800 transition flex items-center justify-center gap-2"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-green-400" /> Added to Bag
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
                </>
              )}
            </button>
          </div>

          {/* Guarantees */}
          <div className="border-t border-neutral-200 pt-6 space-y-3 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-neutral-800" />
              <span>Cash on Delivery Available Across India • Free Shipping on ₹999+</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neutral-800" />
              <span>100% Verified Quality & Easy 7-Day Doorstep Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm uppercase tracking-widest">Loading Product...</div>}>
      <ProductDetailContent />
    </Suspense>
  );
}