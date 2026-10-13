"use client";

import { useState, useEffect, use, Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Check, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { getStoredProducts } from "@/app/lib/products";

function ProductDetailContent({ paramsPromise }: { paramsPromise: Promise<{ id: string }> }) {
  const resolvedParams = use(paramsPromise);
  const productId = resolvedParams?.id;

  const [product, setProduct] = useState<any | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [isAdded, setIsAdded] = useState<boolean>(false);

  useEffect(() => {
    const products = getStoredProducts();
    let found = products.find((p: any) => String(p.id) === String(productId));

    // Fallback if navigating to /shop/1 or an old missing ID
    if (!found && products.length > 0) {
      found = products[0];
    }

    if (found) {
      setProduct(found);
      const imagesList =
        found.images && found.images.length > 0
          ? found.images
          : [found.image || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60"];
      setSelectedImage(imagesList[0]);
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

  const imagesList =
    product.images && product.images.length > 0
      ? product.images
      : [product.image || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60"];

  const handleAddToCart = () => {
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Product Images */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-neutral-950 border border-neutral-800 overflow-hidden relative">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-[#FF5500] text-white text-xs font-black uppercase tracking-widest px-3 py-1.5">
                NEW DROP
              </span>
            </div>

            {imagesList.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {imagesList.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-square bg-neutral-950 border transition overflow-hidden ${
                      selectedImage === img
                        ? "border-[#FF5500]"
                        : "border-neutral-800 hover:border-neutral-600"
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details & Add to Bag */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <span className="text-xs font-black uppercase tracking-widest text-[#FF5500] bg-[#FF5500]/10 border border-[#FF5500]/20 px-3 py-1 inline-block">
                {product.category || "STREETWEAR"}
              </span>

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

              <div className="pt-2 border-t border-neutral-900">
                <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
                  Description
                </h4>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {product.description ||
                    "Heavyweight drop-shoulder street silhouette designed for high durability and casual fit."}
                </p>
              </div>

              {/* Sizes Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-neutral-300">
                    Select Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-3 text-xs font-black uppercase tracking-widest transition border ${
                          selectedSize === size
                            ? "bg-[#FF5500] text-white border-[#FF5500]"
                            : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Bag Action */}
              <div className="pt-4">
                <button
                  onClick={handleAddToCart}
                  className={`w-full text-xs font-black uppercase tracking-widest py-5 transition flex items-center justify-center gap-2 ${
                    isAdded ? "bg-emerald-600 text-white" : "bg-[#FF5500] text-white hover:bg-[#e04b00]"
                  }`}
                >
                  {isAdded ? (
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

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <p className="text-xs font-black uppercase tracking-widest text-[#FF5500]">
            LOADING PRODUCT...
          </p>
        </div>
      }
    >
      <ProductDetailContent paramsPromise={params} />
    </Suspense>
  );
}