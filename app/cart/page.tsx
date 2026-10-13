"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const loadCart = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("strtkin_cart");
      if (stored) {
        try {
          setCartItems(JSON.parse(stored));
        } catch (e) {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    }
  };

  useEffect(() => {
    loadCart();

    window.addEventListener("strtkin_cart_updated", loadCart);
    window.addEventListener("storage", loadCart);

    return () => {
      window.removeEventListener("strtkin_cart_updated", loadCart);
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    const updated = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean);

    setCartItems(updated);
    localStorage.setItem("strtkin_cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("strtkin_cart_updated"));
  };

  const removeItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("strtkin_cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("strtkin_cart_updated"));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FF5500] selection:text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex justify-between items-end mb-8 pb-4 border-b border-neutral-800">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#FF5500]">
              YOUR BAG
            </span>
            <h1 className="text-4xl font-black uppercase tracking-tight text-white mt-1">
              SHOPPING BAG ({cartItems.reduce((a, b) => a + b.quantity, 0)})
            </h1>
          </div>
          <Link
            href="/shop"
            className="text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-white transition flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> CONTINUE SHOPPING
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="py-24 text-center border border-neutral-800 bg-neutral-950 space-y-4">
            <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto" />
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              YOUR BAG IS CURRENTLY EMPTY
            </p>
            <Link
              href="/shop"
              className="inline-block bg-[#FF5500] text-white text-xs font-black uppercase tracking-widest px-8 py-4 hover:bg-[#e04b00] transition"
            >
              EXPLORE DROPS
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Bag Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-neutral-800 bg-neutral-950 p-4 flex gap-4 items-center justify-between"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover bg-neutral-900 border border-neutral-800"
                    />
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-white">{item.name}</h3>
                      <p className="text-xs text-neutral-400 font-bold uppercase">
                        SIZE: <span className="text-white">{item.size || "M"}</span>
                      </p>
                      <p className="text-sm font-black text-[#FF5500]">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-neutral-800 bg-black">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-3 py-1 text-xs font-bold hover:bg-neutral-800"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-3 py-1 text-xs font-bold hover:bg-neutral-800"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-neutral-500 hover:text-red-500 transition p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border border-neutral-800 bg-neutral-950 p-6 space-y-6">
              <h2 className="text-lg font-black uppercase tracking-tight text-white border-b border-neutral-800 pb-4">
                ORDER SUMMARY
              </h2>

              <div className="space-y-3 text-xs font-bold uppercase tracking-widest">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-white">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Shipping</span>
                  <span className="text-[#FF5500]">FREE</span>
                </div>
                <div className="border-t border-neutral-800 pt-3 flex justify-between text-sm text-white font-black">
                  <span>Total</span>
                  <span className="text-[#FF5500]">₹{subtotal}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-[#FF5500] text-white text-xs font-black uppercase tracking-widest py-4 hover:bg-[#e04b00] transition flex items-center justify-center gap-2"
              >
                PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}