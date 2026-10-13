"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, Phone, Trash2, PackageCheck } from "lucide-react";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"ALL" | "PENDING" | "CONFIRMED">("ALL");

  // Load real customer orders from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("strtkin_orders");
    if (saved) {
      try {
        setOrders(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse orders from localStorage", e);
      }
    }
  }, []);

  const updateOrderStatus = (id: string, newStatus: string) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
    localStorage.setItem("strtkin_orders", JSON.stringify(updated));
  };

  const handleDeleteOrder = (id: string) => {
    const updated = orders.filter((order) => order.id !== id);
    setOrders(updated);
    localStorage.setItem("strtkin_orders", JSON.stringify(updated));
  };

  // Filter orders based on active tab
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "PENDING") {
      return order.status !== "CONFIRMED & FORWARDED" && order.status !== "CONFIRMED";
    }
    if (activeTab === "CONFIRMED") {
      return order.status === "CONFIRMED & FORWARDED" || order.status === "CONFIRMED";
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      {/* Navigation Header */}
      <div className="mb-8 pb-6 border-b border-neutral-200">
        <div className="flex items-center gap-2 mb-3">
          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-black flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Storefront
          </Link>
          <span className="text-neutral-300">/</span>
          <span className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-2.5 py-1">
            Admin Portal
          </span>
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tight text-neutral-900">
          Order Management
        </h1>
        <p className="text-sm font-medium text-neutral-500 mt-1">
          Review incoming customer orders, verify details, and manage your drop-shipping workflow.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTab("ALL")}
          className={`px-5 py-2.5 text-xs font-extrabold uppercase tracking-widest transition border ${
            activeTab === "ALL"
              ? "bg-black text-white border-black"
              : "bg-white text-neutral-600 border-neutral-300 hover:border-black"
          }`}
        >
          All Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab("PENDING")}
          className={`px-5 py-2.5 text-xs font-extrabold uppercase tracking-widest transition border ${
            activeTab === "PENDING"
              ? "bg-black text-white border-black"
              : "bg-white text-neutral-600 border-neutral-300 hover:border-black"
          }`}
        >
          Pending Confirmation
        </button>
        <button
          onClick={() => setActiveTab("CONFIRMED")}
          className={`px-5 py-2.5 text-xs font-extrabold uppercase tracking-widest transition border ${
            activeTab === "CONFIRMED"
              ? "bg-black text-white border-black"
              : "bg-white text-neutral-600 border-neutral-300 hover:border-black"
          }`}
        >
          Confirmed
        </button>
      </div>

      {/* Order Cards List */}
      {filteredOrders.length === 0 ? (
        <div className="border border-neutral-200 bg-white p-16 text-center space-y-3 shadow-sm">
          <PackageCheck className="w-10 h-10 text-neutral-300 mx-auto" />
          <p className="text-xs font-extrabold uppercase tracking-widest text-neutral-400">
            No Customer Orders Found
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border border-neutral-200 bg-white p-6 shadow-sm space-y-6 hover:border-neutral-400 transition"
            >
              {/* Card Top: Order ID, Status Badge & Date */}
              <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-black uppercase tracking-tight text-neutral-900">
                    {order.id}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest ${
                      order.status === "CONFIRMED & FORWARDED" || order.status === "CONFIRMED"
                        ? "bg-green-100 text-green-800 border border-green-300"
                        : "bg-amber-100 text-amber-800 border border-amber-300"
                    }`}
                  >
                    {order.status === "CONFIRMED & FORWARDED" || order.status === "CONFIRMED" ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                    {order.status}
                  </span>
                </div>
                <span className="text-xs font-semibold text-neutral-400">{order.date}</span>
              </div>

              {/* Card Body: Customer Info & Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 block mb-1">
                    Customer Info
                  </span>
                  <span className="font-extrabold block text-neutral-900">{order.customer?.name}</span>
                  <span className="text-xs font-semibold text-neutral-600">{order.customer?.phone}</span>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 block mb-1">
                    Delivery Address
                  </span>
                  <span className="text-xs font-medium text-neutral-700 leading-relaxed block">
                    {order.customer?.address}
                  </span>
                </div>
              </div>

              {/* Items & Pricing */}
              <div className="flex flex-wrap justify-between items-center pt-4 border-t border-neutral-100 text-sm gap-2">
                <div className="font-semibold text-neutral-800">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 block mb-0.5">
                    Items Ordered
                  </span>
                  {order.items}
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-500 font-medium">Total: </span>
                  <span className="text-lg font-black text-neutral-900">₹{order.total}</span>
                  <span className="text-xs text-neutral-400 font-medium block">(Cash on Delivery)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {order.status !== "CONFIRMED & FORWARDED" && order.status !== "CONFIRMED" && (
                  <button
                    onClick={() => updateOrderStatus(order.id, "CONFIRMED & FORWARDED")}
                    className="bg-black text-white text-xs uppercase tracking-widest py-3.5 font-black hover:bg-neutral-800 transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Confirm Order
                  </button>
                )}

                <a
                  href={`tel:${order.customer?.phone}`}
                  className="border border-neutral-300 text-neutral-800 text-xs uppercase tracking-widest py-3.5 font-bold hover:bg-neutral-50 transition flex items-center justify-center gap-2 text-center"
                >
                  <Phone className="w-3.5 h-3.5" /> Contact Customer
                </a>

                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  className="border border-neutral-200 text-red-600 text-xs uppercase tracking-widest py-3.5 font-bold hover:bg-red-50 hover:border-red-200 transition flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}