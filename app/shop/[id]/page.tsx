"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Check, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { getStoredProducts } from "@/app/lib/products";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;

  const [product, setProduct] = useState<any | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isAdded, setIsAdded] = useState<boolean>(false);

  useEffect(() => {
    if (!productId) return;

    const products = getStoredProducts();
    const found = products.find((p: any) => String(p.id) === String(productId));

    if (found) {
      setProduct(found);
      const imagesList = found.images && found.images.length > 0 ? found.images : [found.image];
      setSelectedImage(imagesList[0] || "");
      if (found.sizes && found.sizes.length > 0) {
        setSelectedSize(found.sizes[0]);
      }
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-4 p-4">
        <p className="text-xs font-black uppercase tracking-widest text-neutral-500">
          PRODUCT NOT FOUND
        </p>
        <Link
          href="/shop"
          className="bg-[#FF5500] text-white text-xs font-black uppercase tracking-widest px-6 py-3 hover:bg-[#e04b00] transition"
        >
          BACK TO CATALOG
        </Link>
      </div>
    );
  }

  const imagesList = product.images && product.images.length > 0 ? product.images : [product.image];
  const isOutOfStock = product.inStock === false;

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    const existingCart = localStorage.getItem("strtkin_cart");
    let cartItems = existingCart ? JSON.parse(existingCart) : [];

    const newItem = {
      id: `${product.id}-${selectedSize}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: selectedImage,
      quantity: 1,
    };

    const existingIndex = cartItems.findIndex((item: any) => item.id === newItem.id);
    if (existingIndex > -1) {
      cartItems[existingIndex].quantity += 1;
    } else {
      cartItems.push(newItem);
    }

    localStorage.setItem("strtkin_cart", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("strtkin_cart_updated"));

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FF5500] selection:text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-[#FF5500] transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Apparel Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery Section */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-neutral-950 border border-neutral-800 overflow-hidden relative">
              <img
                src={selectedImage}
                alt={product.name}
                className={`w-full h-full object-cover ${isOutOfStock ? "opacity-50 grayscale" : ""}`}
              />
              {isOutOfStock ? (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black uppercase tracking-widest px-3 py-1.5">
                  OUT OF STOCK
                </span>
              ) : (
                <span className="absolute top-4 left-4 bg-[#FF5500] text-white text-xs font-black uppercase tracking-widest px-3 py-1.5">
                  NEW DROP
                </span>
              )}
            </div>

            {imagesList.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {imagesList.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-square bg-neutral-950 border transition overflow-hidden ${
                      selectedImage === img ? "border-[#FF5500]" : "border-neutral-800 hover:border-neutral-600"
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#FF5500] bg-[#FF5500]/10 border border-[#FF5500]/20 px-3 py-1">
                  {product.category || "STREETWEAR"}
                </span>
                {isOutOfStock && (
                  <span className="text-xs font-black uppercase tracking-widest text-red-500 bg-red-950/40 border border-red-900 px-3 py-1">
                    CURRENTLY UNAVAILABLE
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-white">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm font-bold text-neutral-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-neutral-400 text-sm leading-relaxed pt-2 border-t border-neutral-900">
                {product.description || "Heavyweight drop-shoulder street silhouette designed for high durability and casual fit."}
              </p>

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2 pt-4">
                  <label className="block text-xs font-black uppercase tracking-widest text-neutral-300">
                    Select Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        disabled={isOutOfStock}
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-3 text-xs font-black uppercase tracking-widest transition border ${
                          selectedSize === size
                            ? "bg-[#FF5500] text-white border-[#FF5500]"
                            : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white"
                        } ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Bag */}
              <div className="pt-4">
                <button
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                  className={`w-full text-xs font-black uppercase tracking-widest py-5 transition flex items-center justify-center gap-2 ${
                    isOutOfStock
                      ? "bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700"
                      : isAdded
                      ? "bg-emerald-600 text-white"
                      : "bg-[#FF5500] text-white hover:bg-[#e04b00]"
                  }`}
                >
                  {isOutOfStock ? (
                    "OUT OF STOCK"
                  ) : isAdded ? (
                    <>
                      <Check className="w-4 h-4" /> ADDED TO BAG
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> ADD TO BAG
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Service Guarantees */}
            <div className="border-t border-neutral-800 pt-6 space-y-3">
              <div className="flex items-center gap-3 text-xs text-neutral-400 font-bold">
                <Truck className="w-4 h-4 text-[#FF5500]" /> Express Cash on Delivery Nationwide
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-400 font-bold">
                <ShieldCheck className="w-4 h-4 text-[#FF5500]" /> 100% Heavyweight Combed Cotton
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-400 font-bold">
                <RotateCcw className="w-4 h-4 text-[#FF5500]" /> Hassle-Free Doorstep Exchanges
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}