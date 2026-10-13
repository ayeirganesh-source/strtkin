"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { CheckCircle2, Truck } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (cart.length === 0 && !isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center py-24">
        <div className="text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">YOUR BAG IS EMPTY</p>
          <Link href="/shop" className="inline-block bg-[#FF5500] text-white text-xs font-black uppercase tracking-widest px-6 py-3">
            GO TO STORE
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `STRK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleString(),
      customer: {
        name: formData.name,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      },
      items: cart.map((i) => `${i.name} (${i.size}) x ${i.quantity}`).join(", "),
      total: totalPrice,
      status: "PENDING VERIFICATION",
    };

    const existingOrders = JSON.parse(localStorage.getItem("strtkin_orders") || "[]");
    localStorage.setItem("strtkin_orders", JSON.stringify([newOrder, ...existingOrders]));

    clearCart();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center py-24 px-4">
        <div className="max-w-md w-full border border-neutral-800 bg-neutral-950 p-8 text-center space-y-6">
          <CheckCircle2 className="w-16 h-16 text-[#FF5500] mx-auto" />
          <h1 className="text-3xl font-black uppercase tracking-tight">ORDER PLACED SUCCESSFULLY</h1>
          <p className="text-xs text-neutral-400 leading-relaxed font-normal">
            Thank you for shopping with STRTKIN.in. Our team will verify your Cash on Delivery phone number prior to dispatch.
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="w-full bg-[#FF5500] text-white text-xs font-black uppercase tracking-widest py-4 hover:bg-[#e04b00] transition"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FF5500] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <h1 className="text-4xl font-black uppercase tracking-tight mb-8 pb-4 border-b border-neutral-800">
          CHECKOUT
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Shipping Form */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-black uppercase tracking-wider text-neutral-300">SHIPPING INFORMATION</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">FULL NAME</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 p-3.5 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                  placeholder="Rahul Sharma"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">PHONE NUMBER (FOR COD VERIFICATION)</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 p-3.5 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">EMAIL ADDRESS</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 p-3.5 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                placeholder="rahul@example.com"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">STREET ADDRESS</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 p-3.5 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                placeholder="House No., Street Name, Area"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">CITY</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 p-3.5 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">STATE</label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 p-3.5 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">PINCODE</label>
                <input
                  type="text"
                  required
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 p-3.5 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                />
              </div>
            </div>

            <div className="p-4 border border-neutral-800 bg-neutral-950 flex items-center gap-3">
              <Truck className="w-5 h-5 text-[#FF5500]" />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                PAYMENT METHOD: CASH ON DELIVERY (COD)
              </span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border border-neutral-800 bg-neutral-950 p-6 space-y-6">
            <h2 className="text-lg font-black uppercase tracking-wider pb-4 border-b border-neutral-800">
              ORDER SUMMARY
            </h2>

            <div className="space-y-3">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between text-xs font-semibold">
                  <span className="text-neutral-300 truncate max-w-[180px]">
                    {item.name} ({item.size}) x {item.quantity}
                  </span>
                  <span className="text-white font-black">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-800 flex justify-between text-base font-black">
              <span>TOTAL AMOUNT</span>
              <span className="text-[#FF5500]">₹{totalPrice}</span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF5500] text-white text-xs font-black uppercase tracking-widest py-4 transition hover:bg-[#e04b00]"
            >
              CONFIRM COD ORDER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}