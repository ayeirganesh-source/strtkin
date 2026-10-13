"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);

    // Format new order object
    const newOrder = {
      id: `STRK-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      customer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      },
      items: cartItems
        .map((item) => `${item.name} (${item.size}) x ${item.quantity}`)
        .join(", "),
      total: subtotal,
      status: "PENDING VERIFICATION",
    };

    // Retrieve existing orders and prepend new order
    try {
      const existingOrders = JSON.parse(localStorage.getItem("strtkin_orders") || "[]");
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem("strtkin_orders", JSON.stringify(updatedOrders));
    } catch (e) {
      console.error("Failed to save order to localStorage", e);
    }

    // Simulate network delay, clear cart, and redirect
    setTimeout(() => {
      clearCart();
      router.push("/checkout/success");
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black tracking-tight uppercase mb-8 pb-4 border-b border-neutral-200">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Shipping Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          <h2 className="text-lg font-bold tracking-tight">Shipping Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">Full Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">Phone Number</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">Email Address</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black" />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">Street Address</label>
            <input type="text" name="address" required value={formData.address} onChange={handleChange} className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">City</label>
              <input type="text" name="city" required value={formData.city} onChange={handleChange} className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">State</label>
              <input type="text" name="state" required value={formData.state} onChange={handleChange} className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">Pincode</label>
              <input type="text" name="pincode" required value={formData.pincode} onChange={handleChange} className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black" />
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200">
            <h2 className="text-lg font-bold tracking-tight mb-2">Payment Method</h2>
            <div className="border border-black p-4 bg-neutral-50 flex items-center gap-3">
              <input type="radio" checked readOnly className="accent-black" />
              <span className="text-sm font-semibold">Cash on Delivery (COD) - Available Across India</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || cartItems.length === 0}
            className="w-full bg-black text-white text-xs uppercase tracking-widest py-4 font-bold hover:bg-neutral-800 transition disabled:opacity-50"
          >
            {isSubmitting ? "Placing Order..." : "Place Order (COD)"}
          </button>
        </form>

        {/* Order Review Sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-neutral-50 border border-neutral-200 p-6 space-y-4">
            <h2 className="text-lg font-bold tracking-tight border-b border-neutral-200 pb-3">Order Summary</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between items-center text-sm">
                  <span className="text-neutral-600">{item.name} ({item.size}) x {item.quantity}</span>
                  <span className="font-semibold">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}