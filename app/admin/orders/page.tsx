"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, Trash2 } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/admin/products" className="text-xs font-semibold text-neutral-500 hover:text-black flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Manage Products
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="text-xs uppercase tracking-widest bg-black text-white px-2 py-0.5">Admin Portal</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight uppercase">COD Order Verification Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Review incoming Cash on Delivery orders placed by customers, verify phone numbers, and confirm fulfillment.
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="border border-neutral-200 bg-white overflow-hidden shadow-sm">
        {orders.length === 0 ? (
          <div className="text-center py-20 text-neutral-400 text-sm uppercase tracking-widest">
            No customer orders received yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200 text-xs uppercase tracking-wider text-neutral-500">
                  <th className="p-4">Order ID & Date</th>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-sm">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50 transition">
                    <td className="p-4">
                      <span className="font-bold block text-neutral-900">{order.id}</span>
                      <span className="text-xs text-neutral-400">{order.date}</span>
                    </td>
                    <td className="p-4 space-y-0.5">
                      <span className="font-semibold block text-neutral-900">{order.customer?.name}</span>
                      <span className="text-xs text-neutral-600 block">{order.customer?.phone}</span>
                      <span className="text-xs text-neutral-500 block max-w-xs">{order.customer?.address}</span>
                    </td>
                    <td className="p-4 text-xs text-neutral-700 max-w-xs">{order.items}</td>
                    <td className="p-4 font-bold text-neutral-900">₹{order.total}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                        order.status === "CONFIRMED & FORWARDED" 
                          ? "bg-green-50 text-green-700 border border-green-200" 
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {order.status === "CONFIRMED & FORWARDED" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {order.status !== "CONFIRMED & FORWARDED" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "CONFIRMED & FORWARDED")}
                          className="bg-black text-white text-xs uppercase tracking-wider px-4 py-2 font-bold hover:bg-neutral-800 transition"
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