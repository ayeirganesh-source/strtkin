"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, CheckCircle, Clock, Truck, ShieldCheck } from "lucide-react";

// Mock incoming Cash on Delivery orders for STRTKIN.in
const INITIAL_ORDERS = [
  {
    id: "STRK-8492",
    customerName: "Rahul Sharma",
    phone: "+91 98765 43210",
    address: "Flat 402, Skyline Apartments, Banjara Hills, Hyderabad, TS - 500034",
    items: "Oversized Heavyweight Black Tee (L) x 1",
    total: 799,
    paymentMethod: "Cash on Delivery",
    status: "Pending Verification",
    date: "2026-10-13 10:15 AM",
  },
  {
    id: "STRK-8491",
    customerName: "Aman Verma",
    phone: "+91 91234 56789",
    address: "House No 12, MG Road, Sector 14, Gurgaon, HR - 122001",
    items: "Slim Fit Raw Indigo Denim Jeans (32) x 1",
    total: 1999,
    paymentMethod: "Cash on Delivery",
    status: "Confirmed & Forwarded",
    date: "2026-10-12 04:30 PM",
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setOrders(
      orders.map((order) => (order.id === id ? { ...order, status: newStatus } : order))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-widest bg-black text-white px-2 py-0.5 font-bold">Admin Portal</span>
            <span className="text-neutral-300">/</span>
            <Link href="/admin/products" className="text-xs font-semibold text-neutral-500 hover:text-black">
              Manage Products →
            </Link>
          </div>
          <h1 className="text-3xl font-black tracking-tight uppercase">COD Order Verification Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Review incoming Cash on Delivery orders, verify phone numbers, and confirm fulfillment.
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="border border-neutral-200 bg-white overflow-hidden shadow-sm">
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
                  <td className="p-4 align-top">
                    <span className="font-bold text-neutral-900">{order.id}</span>
                    <p className="text-xs text-neutral-400 mt-0.5">{order.date}</p>
                  </td>
                  <td className="p-4 align-top space-y-1">
                    <p className="font-semibold text-neutral-900">{order.customerName}</p>
                    <p className="text-xs text-neutral-600">{order.phone}</p>
                    <p className="text-xs text-neutral-500 max-w-xs">{order.address}</p>
                  </td>
                  <td className="p-4 align-top text-xs text-neutral-700 font-medium">{order.items}</td>
                  <td className="p-4 align-top font-bold">₹{order.total}</td>
                  <td className="p-4 align-top">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${
                        order.status === "Pending Verification"
                          ? "bg-amber-50 text-amber-800 border border-amber-200"
                          : "bg-green-50 text-green-800 border border-green-200"
                      }`}
                    >
                      {order.status === "Pending Verification" ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 align-top text-right space-y-2">
                    {order.status === "Pending Verification" ? (
                      <button
                        onClick={() => handleUpdateStatus(order.id, "Confirmed & Forwarded")}
                        className="bg-black text-white text-[11px] uppercase tracking-wider px-4 py-2 font-bold hover:bg-neutral-800 transition block w-full"
                      >
                        Verify & Confirm
                      </button>
                    ) : (
                      <span className="text-xs text-green-600 font-semibold block pt-1">Forwarded to Supplier</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}