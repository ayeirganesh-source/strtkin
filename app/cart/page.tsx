"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FF5500] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <h1 className="text-4xl font-black uppercase tracking-tight mb-8 pb-4 border-b border-neutral-800">
          SHOPPING BAG ({cart.length})
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-24 border border-neutral-800 bg-neutral-950/50 space-y-4">
            <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto" />
            <p className="text-xs font-extrabold uppercase tracking-widest text-neutral-400">
              YOUR SHOPPING BAG IS CURRENTLY EMPTY.
            </p>
            <div>
              <Link
                href="/shop"
                className="inline-block bg-[#FF5500] text-white text-xs font-black uppercase tracking-widest px-8 py-4 hover:bg-[#e04b00] transition"
              >
                EXPLORE CATALOG
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="border border-neutral-800 bg-neutral-950 p-4 sm:p-6 flex gap-6 items-center"
                >
                  <div className="w-20 h-24 sm:w-24 sm:h-28 bg-neutral-900 border border-neutral-800 overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <h3 className="font-extrabold text-sm uppercase tracking-tight text-white">{item.name}</h3>
                    <p className="text-xs text-neutral-400">SIZE: <span className="text-white font-bold">{item.size}</span></p>
                    <p className="font-black text-white text-base pt-1">₹{item.price}</p>
                  </div>

                  {/* Quantity Switcher */}
                  <div className="flex items-center border border-neutral-800 bg-black">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="px-3 py-1 text-sm font-bold hover:bg-neutral-800 text-neutral-300"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-black">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="px-3 py-1 text-sm font-bold hover:bg-neutral-800 text-neutral-300"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="p-2 text-neutral-500 hover:text-red-500 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border border-neutral-800 bg-neutral-950 p-6 space-y-6">
              <h2 className="text-lg font-black uppercase tracking-wider pb-4 border-b border-neutral-800">
                CART SUMMARY
              </h2>

              <div className="space-y-3 text-xs font-semibold">
                <div className="flex justify-between text-neutral-400">
                  <span>SUBTOTAL</span>
                  <span className="text-white font-black">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>SHIPPING</span>
                  <span className="text-green-400 font-black">FREE</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-4 border-t border-neutral-800">
                  <span>ESTIMATED TOTAL</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-[#FF5500] text-white text-xs font-black uppercase tracking-widest py-4 transition flex items-center justify-center gap-2 hover:bg-[#e04b00]"
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