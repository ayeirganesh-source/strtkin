"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Clock, PackageCheck, Truck, ArrowLeft } from "lucide-react";

// Initial sample incoming orders from customers
const INITIAL_ORDERS = [
  {
    id: "STRT-894215",
    customerName: "Rahul Sharma",
    mobile: "+91 98765 43210",
    address: "Flat 4B, Skyline Apartments, MG Road, Indiranagar, Bengaluru, Karnataka - 560038",
    item: "Oversized Heavyweight Black Tee",
    variant: "Black / L",
    qty: 1,
    total: 799,
    status: "Pending Confirmation",
    paymentMethod: "Cash on Delivery",
    date: "Oct 13, 2026 - 10:15 AM",
  },
  {
    id: "STRT-543192",
    customerName: "Aman Verma",
    mobile: "+91 87654 32109",
    address: "House 12, Park Street, Connaught Place, New Delhi - 110001",
    item: "Classic Oxford White Button-Down",
    variant: "White / M",
    qty: 1,
    total: 1499,
    status: "Confirmed",
    paymentMethod: "Cash on Delivery",
    date: "Oct 12, 2026 - 04:30 PM",
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState("all");

  const handleConfirmOrder = (id: string) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "Confirmed" } : order
      )
    );
    alert(`Order ${id} confirmed! You can now place this order on your supplier app.`);
  };

  const filteredOrders = activeTab === "all"
    ? orders
    : activeTab === "pending"
    ? orders.filter((o) => o.status === "Pending Confirmation")
    : orders.filter((o) => o.status === "Confirmed");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/" className="text-xs font-semibold text-neutral-500 hover:text-black flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to Storefront
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="text-xs uppercase tracking-widest bg-black text-white px-2 py-0.5">Admin Portal</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight uppercase">Order Management</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Review incoming customer orders, verify details, and manage your drop-shipping workflow.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mt-4 md:mt-0">
          {[
            { id: "all", label: "All Orders" },
            { id: "pending", label: "Pending Confirmation" },
            { id: "confirmed", label: "Confirmed" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs uppercase tracking-wider px-4 py-2 border transition ${
                activeTab === tab.id
                  ? "bg-black text-white border-black font-bold"
                  : "bg-white text-neutral-600 border-neutral-200 hover:border-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 border border-neutral-200 bg-neutral-50">
            <p className="text-neutral-500 font-medium">No orders found in this view.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border border-neutral-200 bg-white p-6 shadow-sm flex flex-col lg:flex-row justify-between gap-6"
            >
              {/* Order Details Left */}
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-black text-lg tracking-tight">{order.id}</span>
                  <span
                    className={`text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold ${
                      order.status === "Pending Confirmation"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className="text-xs text-neutral-400">{order.date}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pt-2 border-t border-neutral-100">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Customer Info</h4>
                    <p className="font-semibold text-neutral-900">{order.customerName}</p>
                    <p className="text-neutral-600">{order.mobile}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Delivery Address</h4>
                    <p className="text-neutral-600 text-xs leading-relaxed">{order.address}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex flex-wrap items-center justify-between text-sm">
                  <div>
                    <span className="font-semibold text-neutral-900">{order.item}</span>
                    <span className="text-neutral-500 text-xs ml-2">({order.variant}) × {order.qty}</span>
                  </div>
                  <div className="font-bold text-neutral-900">
                    Total: ₹{order.total} <span className="text-xs font-normal text-neutral-500">({order.paymentMethod})</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Right */}
              <div className="flex flex-col justify-center gap-3 lg:border-l lg:border-neutral-200 lg:pl-6 min-w-[220px]">
                {order.status === "Pending Confirmation" ? (
                  <button
                    onClick={() => handleConfirmOrder(order.id)}
                    className="w-full bg-black text-white text-xs uppercase tracking-widest py-3 font-bold hover:bg-neutral-800 transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" /> Confirm Order
                  </button>
                ) : (
                  <div className="bg-neutral-100 text-neutral-700 text-xs text-center py-3 font-semibold uppercase tracking-wider">
                    Ready for Supplier App
                  </div>
                )}
                <a
                  href={`https://wa.me/?text=Hi%20${encodeURIComponent(order.customerName)},%20regarding%20your%20STRTKIN%20order%20${order.id}...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-neutral-300 text-neutral-700 text-xs uppercase tracking-widest py-3 text-center font-medium hover:border-black transition"
                >
                  Contact Customer
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
