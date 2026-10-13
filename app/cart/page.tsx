"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartPage() {
  // Sample cart item for STRTKIN.in
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Oversized Heavyweight Black Tee",
      size: "L",
      color: "Black",
      price: 799,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60",
    },
  ]);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.toUpperCase() === "STRTKIN10") {
      setDiscount(100);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Try STRTKIN10");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const finalTotal = subtotal - discount;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-6 text-neutral-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black uppercase tracking-tight mb-2">Your Cart is Empty</h1>
        <p className="text-sm text-neutral-500 mb-8">Discover our latest arrivals and add your favorite apparel to the cart.</p>
        <Link
          href="/shop"
          className="inline-block bg-black text-white text-xs uppercase tracking-widest px-8 py-4 font-semibold hover:bg-neutral-800 transition"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black tracking-tight uppercase mb-8 pb-4 border-b border-neutral-200">
        Shopping Cart ({cartItems.length})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 sm:gap-6 pb-6 border-b border-neutral-200 items-center">
              <div className="w-20 sm:w-24 aspect-[4/5] bg-neutral-100 relative flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-sm sm:text-base text-neutral-900">{item.name}</h3>
                <p className="text-xs text-neutral-500">Size: {item.size} | Color: {item.color}</p>
                <div className="font-bold text-sm pt-1">₹{item.price}</div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center border border-neutral-300">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="px-3 py-1 text-sm font-bold hover:bg-neutral-100 transition"
                >
                  -
                </button>
                <span className="px-3 py-1 text-sm font-semibold">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="px-3 py-1 text-sm font-bold hover:bg-neutral-100 transition"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemoveItem(item.id)}
                className="p-2 text-neutral-400 hover:text-black transition"
                title="Remove item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary & Checkout */}
        <div className="lg:col-span-4">
          <div className="bg-neutral-50 border border-neutral-200 p-6 sticky top-24 space-y-6">
            <h2 className="text-lg font-bold tracking-tight border-b border-neutral-200 pb-3">Cart Summary</h2>

            {/* Coupon Form */}
            <form onSubmit={applyCoupon} className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. STRTKIN10"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 border border-neutral-300 p-2.5 text-xs uppercase focus:outline-none focus:border-black"
                />
                <button
                  type="submit"
                  className="bg-neutral-900 text-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-black transition"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-xs text-red-600">{couponError}</p>}
              {discount > 0 && <p className="text-xs text-green-600 font-semibold">Coupon applied successfully (-₹{discount})</p>}
            </form>

            <div className="space-y-2 text-sm border-t border-neutral-200 pt-4">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-neutral-200 pt-3">
                <span>Estimated Total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-black text-white text-xs uppercase tracking-widest py-4 font-bold text-center block hover:bg-neutral-800 transition"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4 inline ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}