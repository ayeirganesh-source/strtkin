"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Truck } from "lucide-react";

export default function CheckoutPage() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    houseNo: "",
    buildingName: "",
    street: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    deliveryInstructions: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = "STRT-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black tracking-tight uppercase mb-2">Order Submitted!</h1>
        <p className="text-sm text-neutral-500 mb-6">
          Thank you for shopping with STRTKIN.in. Your Cash on Delivery order has been logged.
        </p>

        <div className="bg-neutral-50 border border-neutral-200 p-6 text-left max-w-md mx-auto mb-8 space-y-2 text-sm">
          <p><strong className="font-semibold">Order ID:</strong> #{orderId}</p>
          <p><strong className="font-semibold">Payment Method:</strong> Cash on Delivery (COD)</p>
          <p><strong className="font-semibold">Status:</strong> Pending Confirmation</p>
          <p><strong className="font-semibold">Deliver To:</strong> {formData.fullName}</p>
          <p className="text-xs text-neutral-500 pt-2 border-t border-neutral-200">
            * Note: Our verification team will process your order shortly before dispatch.
          </p>
        </div>

        <Link
          href="/shop"
          className="inline-block bg-black text-white text-xs uppercase tracking-widest px-8 py-4 font-semibold hover:bg-neutral-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black tracking-tight uppercase mb-8 pb-4 border-b border-neutral-200">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Delivery Details Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-bold tracking-tight mb-4">1. Customer Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    required
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200">
              <h2 className="text-lg font-bold tracking-tight mb-4">2. Delivery Address (India)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600">Flat / House No. *</label>
                  <input
                    type="text"
                    name="houseNo"
                    required
                    value={formData.houseNo}
                    onChange={handleChange}
                    className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="Flat 4B"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600">Building / Apartment</label>
                  <input
                    type="text"
                    name="buildingName"
                    value={formData.buildingName}
                    onChange={handleChange}
                    className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="Skyline Apartments"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600">Street / Road *</label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={formData.street}
                    onChange={handleChange}
                    className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="MG Road"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600">Area / Locality *</label>
                  <input
                    type="text"
                    name="area"
                    required
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="Indiranagar"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="Bengaluru"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600">State *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="Karnataka"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600">PIN Code *</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="560038"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600">Country</label>
                  <input
                    type="text"
                    disabled
                    value="India"
                    className="w-full border border-neutral-200 bg-neutral-100 p-3 text-sm text-neutral-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="pt-6 border-t border-neutral-200">
              <h2 className="text-lg font-bold tracking-tight mb-4">3. Payment Method</h2>
              <div className="border border-black p-4 bg-neutral-50 flex items-center gap-3">
                <input type="radio" checked readOnly className="accent-black w-4 h-4" />
                <div>
                  <span className="font-bold text-sm block">Cash on Delivery (COD)</span>
                  <span className="text-xs text-neutral-500">Pay with cash when your package is delivered to your doorstep.</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white text-sm uppercase tracking-widest py-4 font-bold hover:bg-neutral-800 transition"
            >
              Place Order (Cash On Delivery)
            </button>
          </form>
        </div>

        {/* Order Summary Side Panel */}
        <div className="lg:col-span-5">
          <div className="bg-neutral-50 border border-neutral-200 p-6 sticky top-24">
            <h2 className="text-lg font-bold tracking-tight mb-4 border-b border-neutral-200 pb-3">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-20 bg-neutral-200 relative flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60"
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-xs space-y-1">
                  <h4 className="font-bold text-sm">Oversized Heavyweight Black Tee</h4>
                  <p className="text-neutral-500">Size: L | Color: Black</p>
                  <p className="font-semibold text-neutral-900">Qty: 1 × ₹799</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm border-t border-neutral-200 pt-4">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span>₹799</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-neutral-200 pt-3">
                <span>Total Payable</span>
                <span>₹799</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-200 space-y-2">
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <Truck className="w-4 h-4 text-black" /> Free standard shipping across India
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <ShieldCheck className="w-4 h-4 text-black" /> Verified cash collection at delivery
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
