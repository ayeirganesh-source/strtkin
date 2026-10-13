"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, CheckCircle2, Clock, ArrowRight } from "lucide-react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"cart" | "orders">("cart");

  useEffect(() => {
    // Load customer order history
    const savedOrders = localStorage.getItem("strtkin_user_orders");
    if (savedOrders) {
      try {
        setUserOrders(JSON.parse(savedOrders));
      } catch (e) {
        setUserOrders([]);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto space-y-8">
      
      {/* Page Header & Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-neutral-800 pb-6 gap-4">
        <h1 className="text-3xl font-black uppercase tracking-tight">Shopping Bag & Orders</h1>
        
        <div className="flex bg-neutral-900 border border-neutral-800 p-1">
          <button
            onClick={() => setActiveTab("cart")}
            className={`px-5 py-2 text-xs font-black uppercase tracking-widest transition ${
              activeTab === "cart" ? "bg-[#FF5500] text-white" : "text-neutral-400 hover:text-white"
            }`}
          >
            Cart Items
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-5 py-2 text-xs font-black uppercase tracking-widest transition ${
              activeTab === "orders" ? "bg-[#FF5500] text-white" : "text-neutral-400 hover:text-white"
            }`}
          >
            My Order History ({userOrders.length})
          </button>
        </div>
      </div>

      {/* MY ORDERS TAB */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-black uppercase tracking-wider text-white">Your Placed Orders</h2>
            <p className="text-xs text-neutral-400">Track your Cash on Delivery (COD) fulfillment status and review past purchases.</p>
          </div>

          {userOrders.length === 0 ? (
            <div className="border border-neutral-800 bg-neutral-950 p-16 text-center space-y-4">
              <ShoppingBag className="w-10 h-10 text-neutral-600 mx-auto" />
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                You haven't placed any orders yet.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#FF5500] text-white text-xs uppercase tracking-widest px-6 py-3 font-black hover:bg-[#e04b00] transition"
              >
                Explore Drops <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {userOrders.map((ord, idx) => (
                <div key={ord.id || idx} className="border border-neutral-800 bg-neutral-950 p-6 space-y-4">
                  <div className="flex flex-wrap justify-between items-center gap-2 pb-4 border-b border-neutral-900">
                    <div>
                      <span className="text-xs font-black text-[#FF5500] uppercase tracking-widest">{ord.id}</span>
                      <p className="text-xs text-neutral-400 mt-0.5">Placed on: {ord.date || "Recent"}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest ${
                        ord.status?.includes("CONFIRMED")
                          ? "bg-green-500/10 text-green-400 border border-green-500/30"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {ord.status?.includes("CONFIRMED") ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {ord.status || "PROCESSING (COD)"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-neutral-500 font-bold uppercase tracking-wider block mb-1">Shipping Details</span>
                      <p className="text-neutral-200 font-bold">{ord.customer?.name} ({ord.customer?.phone})</p>
                      <p className="text-neutral-400 mt-0.5">{ord.customer?.address}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <span className="text-neutral-500 font-bold uppercase tracking-wider block mb-1">Total Amount</span>
                      <p className="text-xl font-black text-white">₹{ord.total}</p>
                      <span className="text-[10px] text-neutral-500">(Cash on Delivery)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CART TAB (Your existing cart implementation goes here) */}
      {activeTab === "cart" && (
        <div className="space-y-6">
          {/* Keep your existing cart rendering code here */}
        </div>
      )}

    </div>
  );
}