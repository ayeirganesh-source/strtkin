"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck, Check } from "lucide-react";
import { useCart } from "../../context/CartContext";

const DEFAULT_PRODUCTS = [
  {
    id: "1",
    name: "Oversized Heavyweight Black Tee",
    category: "t-shirts",
    price: 799,
    originalPrice: 1299,
    description: "Premium 240 GSM 100% combed cotton oversized t-shirt built for structure and durability.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    name: "Classic Oxford White Button-Down",
    category: "shirts",
    price: 1499,
    originalPrice: 2499,
    description: "Tailored Oxford woven cotton shirt designed for modern street styling.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    name: "Slim Fit Raw Indigo Denim Jeans",
    category: "jeans",
    price: 1999,
    originalPrice: 3499,
    description: "Heavy-duty 14oz raw stretch denim built to withstand daily wear.",
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

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!params?.id) return;
    const productId = String(params.id);
    const saved = localStorage.getItem("strtkin_products");

    let allProducts: any[] = DEFAULT_PRODUCTS;
    if (saved) {
      try {
        allProducts = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse products from localStorage", e);
      }
    }

    const found = allProducts.find((p: any) => String(p.id) === productId);
    if (found) {
      let normalizedSizes: string[] = [];
      if (typeof found.sizes === "string") {
        normalizedSizes = (found.sizes as string).split(",").map((s) => s.trim());
      } else if (Array.isArray(found.sizes)) {
        normalizedSizes = found.sizes;
      }

      setProduct({ ...found, sizes: normalizedSizes });
      if (normalizedSizes.length > 0) {
        setSelectedSize(normalizedSizes[0]);
      }
    }
  }, [params?.id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center py-24">
        <div className="text-center space-y-4">
          <p className="text-xs font-black uppercase tracking-widest text-neutral-500">
            Product Not Found
          </p>
          <Link
            href="/shop"
            className="inline-block bg-[#FF5500] text-white text-xs font-black uppercase tracking-widest px-6 py-3"
          >
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.image,
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FF5500] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-[#FF5500] flex items-center gap-2 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="aspect-[4/5] bg-neutral-950 overflow-hidden relative border border-neutral-800">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-[#FF5500] text-white text-[11px] font-black uppercase tracking-widest px-3 py-1">
              SAVE 40%
            </span>
          </div>

          {/* Product Details & Actions */}
          <div className="space-y-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#FF5500] block mb-2">
                {product.category}
              </span>
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-white">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-neutral-500 line-through font-bold">
                    ₹{product.originalPrice}
                  </span>
                )}
                <span className="text-[10px] font-black uppercase tracking-widest bg-neutral-900 border border-neutral-800 px-2.5 py-1 text-neutral-300">
                  INCLUSIVE OF ALL TAXES
                </span>
              </div>
            </div>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal border-t border-b border-neutral-800/80 py-6">
              {product.description}
            </p>

            {/* Size Options */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                <span className="text-neutral-400">
                  SELECT SIZE: <span className="text-white font-black">{selectedSize}</span>
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {product.sizes &&
                  product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 text-xs font-black uppercase tracking-widest transition border flex items-center justify-center ${
                        selectedSize === size
                          ? "bg-[#FF5500] text-white border-[#FF5500] shadow-lg shadow-[#FF5500]/20"
                          : "bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
              </div>
            </div>

            {/* Add to Shopping Bag */}
            <div className="space-y-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full py-5 text-xs font-black uppercase tracking-widest transition flex items-center justify-center gap-3 ${
                  added
                    ? "bg-green-600 text-white"
                    : "bg-white text-black hover:bg-[#FF5500] hover:text-white"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" /> ADDED TO BAG
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" /> ADD TO SHOPPING BAG
                  </>
                )}
              </button>
            </div>

            {/* Guarantees */}
            <div className="space-y-3 pt-6 border-t border-neutral-800/80 text-xs font-medium text-neutral-400">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-[#FF5500] shrink-0" />
                <span>Cash on Delivery Available Across India • Free Shipping on ₹1,999+</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#FF5500] shrink-0" />
                <span>100% Verified Quality & Easy 7-Day Doorstep Exchanges</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}