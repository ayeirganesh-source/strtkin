"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, CheckCircle2, Clock, ArrowRight, Trash2, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"cart" | "orders">("cart");

  // Checkout Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    // Load Cart Items
    const savedCart = localStorage.getItem("strtkin_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        setCartItems([]);
      }
    }

    // Load Customer Order History
    const savedOrders = localStorage.getItem("strtkin_user_orders");
    if (savedOrders) {
      try {
        setUserOrders(JSON.parse(savedOrders));
      } catch (e) {
        setUserOrders([]);
      }
    }
  }, []);

  const updateQuantity = (index: number, delta: number) => {
    const updated = [...cartItems];
    updated[index].quantity = (updated[index].quantity || 1) + delta;
    if (updated[index].quantity <= 0) {
      updated.splice(index, 1);
    }
    setCartItems(updated);
    localStorage.setItem("strtkin_cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const removeItem = (index: number) => {
    const updated = cartItems.filter((_, idx) => idx !== index);
    setCartItems(updated);
    localStorage.setItem("strtkin_cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const newOrder = {
      id: "ORD-" + Date.now().toString().slice(-4),
      date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      customer: { name, phone, address },
      items: cartItems.map(item => `${item.name} (${item.size || "M"}) x${item.quantity || 1}`).join(", "),
      total: subtotal,
      status: "PENDING (COD)"
    };

    // Save to Customer Orders
    const updatedUserOrders = [newOrder, ...userOrders];
    setUserOrders(updatedUserOrders);
    localStorage.setItem("strtkin_user_orders", JSON.stringify(updatedUserOrders));

    // Save to Admin Orders
    const adminOrders = JSON.parse(localStorage.getItem("strtkin_orders") || "[]");
    localStorage.setItem("strtkin_orders", JSON.stringify([newOrder, ...adminOrders]));

    // Clear Cart
    setCartItems([]);
    localStorage.removeItem("strtkin_cart");
    window.dispatchEvent(new Event("storage"));

    setOrderSuccess(true);
    setActiveTab("orders");
  };

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
            Cart Items ({cartItems.length})
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

      {orderSuccess && (
        <div className="bg-green-500/10 border border-green-500/30 p-4 text-green-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Order placed successfully via Cash on Delivery! Track status below.
        </div>
      )}

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
                Explore Catalog <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {userOrders.map((ord, idx) => (
                <div key={ord.id || idx} className="border border-neutral-800 bg-neutral-950 p-6 space-y-4">
                  <div className="flex flex-wrap justify-between items-center gap-2 pb-4 border-b border-neutral-900">
                    <div>
                      <span className="text-xs font-black text-[#FF5500] uppercase tracking-widest">{ord.id}</span>
                      <p className="text-xs text-neutral-400 mt-0.5">Placed on: {ord.date}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest ${
                        ord.status?.includes("CONFIRMED")
                          ? "bg-green-500/10 text-green-400 border border-green-500/30"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {ord.status?.includes("CONFIRMED") ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {ord.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-neutral-500 font-bold uppercase tracking-wider block mb-1">Shipping Details</span>
                      <p className="text-neutral-200 font-bold">{ord.customer?.name} ({ord.customer?.phone})</p>
                      <p className="text-neutral-400 mt-0.5">{ord.customer?.address}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <span className="text-neutral-500 font-bold uppercase tracking-wider block mb-1">Items & Total</span>
                      <p className="text-neutral-300 font-medium mb-1">{ord.items}</p>
                      <p className="text-xl font-black text-white">₹{ord.total} <span className="text-[10px] text-neutral-500 font-normal">(COD)</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CART ITEMS TAB */}
      {activeTab === "cart" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="border border-neutral-800 bg-neutral-950 p-16 text-center space-y-4">
                <ShoppingBag className="w-10 h-10 text-neutral-600 mx-auto" />
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  Your bag is currently empty.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-[#FF5500] text-white text-xs uppercase tracking-widest px-6 py-3 font-black hover:bg-[#e04b00] transition"
                >
                  Start Shopping <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div key={idx} className="border border-neutral-800 bg-neutral-950 p-4 flex gap-4 items-center">
                  <div className="w-20 h-20 bg-neutral-900 border border-neutral-800 flex-shrink-0 overflow-hidden">
                    <img src={item.image || item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-bold text-sm">{item.name}</h3>
                    <p className="text-xs text-neutral-400">Size: <span className="text-white font-bold">{item.size || "M"}</span></p>
                    <p className="font-black text-white">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 p-1">
                    <button onClick={() => updateQuantity(idx, -1)} className="p-1 hover:text-[#FF5500] transition">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold px-2">{item.quantity || 1}</span>
                    <button onClick={() => updateQuantity(idx, 1)} className="p-1 hover:text-[#FF5500] transition">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button onClick={() => removeItem(idx)} className="p-2 text-neutral-500 hover:text-red-500 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Checkout Form Sidebar */}
          {cartItems.length > 0 && (
            <div className="border border-neutral-800 bg-neutral-950 p-6 space-y-6 h-fit">
              <h2 className="text-sm font-black uppercase tracking-wider pb-4 border-b border-neutral-900">
                Order Summary (COD)
              </h2>
              <div className="flex justify-between text-sm font-bold">
                <span className="text-neutral-400">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <form onSubmit={handleCheckout} className="space-y-4 pt-4 border-t border-neutral-900">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 p-3 text-xs text-white focus:outline-none focus:border-[#FF5500]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 p-3 text-xs text-white focus:outline-none focus:border-[#FF5500]"
                    placeholder="9876543210"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Delivery Address</label>
                  <textarea
                    rows={3}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 p-3 text-xs text-white focus:outline-none focus:border-[#FF5500]"
                    placeholder="Street, City, Pincode"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#FF5500] text-white text-xs uppercase tracking-widest py-4 font-black hover:bg-[#e04b00] transition"
                >
                  Confirm COD Order (₹{subtotal})
                </button>
              </form>
            </div>
          )}
        </div>
      )}

    </div>
  );
}