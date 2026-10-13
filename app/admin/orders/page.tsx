"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, Trash2, PackageCheck } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  // Load real customer orders from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("strtkin_orders");
    if (saved) {
      try {
        setOrders(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse orders", e);
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      {/* Navigation & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Link
              href="/admin/products"
              className="text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-black flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Manage Products
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-2.5 py-1">
              Admin Portal
            </span>
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tight text-neutral-900">
            COD Order Verification Dashboard
          </h1>
          <p className="text-sm font-medium text-neutral-500 mt-1">
            Review incoming Cash on Delivery orders placed by customers, verify phone numbers, and confirm fulfillment.
          </p>
        </div>
      </div>

      {/* Orders Container */}
      <div className="border border-neutral-200 bg-white overflow-hidden shadow-sm">
        {orders.length === 0 ? (
          <div className="text-center py-24 space-y-3">
            <PackageCheck className="w-10 h-10 text-neutral-300 mx-auto" />
            <p className="text-xs font-extrabold uppercase tracking-widest text-neutral-400">
              No Customer Orders Received Yet
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200 text-[11px] font-extrabold uppercase tracking-widest text-neutral-500">
                  <th className="p-4">Order ID & Date</th>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-sm font-medium">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50/80 transition">
                    <td className="p-4">
                      <span className="font-extrabold block text-neutral-900 uppercase tracking-wide">
                        {order.id}
                      </span>
                      <span className="text-xs text-neutral-400 font-normal">{order.date}</span>
                    </td>
                    <td className="p-4 space-y-0.5">
                      <span className="font-bold block text-neutral-900">{order.customer?.name}</span>
                      <span className="text-xs font-semibold text-neutral-600 block">{order.customer?.phone}</span>
                      <span className="text-xs text-neutral-500 block max-w-xs font-normal">
                        {order.customer?.address}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-semibold text-neutral-800 max-w-xs">
                      {order.items}
                    </td>
                    <td className="p-4 font-black text-neutral-900 text-base">₹{order.total}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest ${
                          order.status === "CONFIRMED & FORWARDED"
                            ? "bg-green-100 text-green-800 border border-green-300"
                            : "bg-amber-100 text-amber-800 border border-amber-300"
                        }`}
                      >
                        {order.status === "CONFIRMED & FORWARDED" ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {order.status !== "CONFIRMED & FORWARDED" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "CONFIRMED & FORWARDED")}
                          className="bg-black text-white text-[11px] uppercase tracking-widest px-4 py-2.5 font-black hover:bg-neutral-800 transition"
                        >
                          Verify & Confirm
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="p-2 text-neutral-400 hover:text-red-600 transition inline-block align-middle"
                        title="Delete Order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}