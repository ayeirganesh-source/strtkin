"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Package, ShoppingBag } from "lucide-react";
import { getStoredProducts, saveStoredProducts } from "@/app/lib/products";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  // New product form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("TEES");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");

  const loadAdminData = () => {
    // Load products safely
    setProducts(getStoredProducts());

    // Load orders safely
    if (typeof window !== "undefined") {
      const storedOrders = localStorage.getItem("strtkin_orders");
      if (storedOrders) {
        try {
          setOrders(JSON.parse(storedOrders));
        } catch (e) {
          setOrders([]);
        }
      } else {
        setOrders([
          {
            id: "ORD-1001",
            date: "Today",
            customer: "Arjun Verma",
            phone: "+91 98765 43210",
            address: "Bandra West, Mumbai, MH",
            items: [{ name: '"Madness" Oversized Tee', size: "L", quantity: 1, price: 799 }],
            total: 799,
            status: "PROCESSING",
          },
        ]);
      }
    }
  };

  useEffect(() => {
    setMounted(true);
    loadAdminData();

    window.addEventListener("strtkin_products_updated", loadAdminData);
    window.addEventListener("storage", loadAdminData);

    return () => {
      window.removeEventListener("strtkin_products_updated", loadAdminData);
      window.removeEventListener("storage", loadAdminData);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xs font-black uppercase tracking-widest text-[#FF5500]">
          LOADING ADMIN CONTROL CENTER...
        </p>
      </div>
    );
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const imgArray = images
      ? images.split(",").map((s) => s.trim())
      : ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60"];

    const newProduct = {
      id: String(Date.now()),
      name,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      category,
      description: description || "Heavyweight drop-shoulder street silhouette cut for maximum comfort.",
      image: imgArray[0],
      images: imgArray,
      sizes: ["S", "M", "L", "XL"],
    };

    const updated = [newProduct, ...products];
    setProducts(updated);
    saveStoredProducts(updated);

    // Reset Form
    setName("");
    setPrice("");
    setOriginalPrice("");
    setDescription("");
    setImages("");
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter((p) => String(p.id) !== String(id));
    setProducts(updated);
    saveStoredProducts(updated);
  };

  const totalRevenue = orders.reduce((sum, ord) => sum + Number(ord.total || 0), 0);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FF5500] selection:text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Header Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-neutral-800 pb-6 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link
                href="/shop"
                className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-[#FF5500] transition flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> BACK TO STOREFRONT
              </Link>
              <span className="text-neutral-600">/</span>
              <span className="text-xs font-black uppercase tracking-widest text-[#FF5500] bg-[#FF5500]/10 border border-[#FF5500]/20 px-2 py-0.5">
                ADMIN CONTROL ROOM
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              STRTKIN CONTROL CENTER
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 bg-neutral-950 p-1 border border-neutral-800">
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest transition ${
                activeTab === "orders"
                  ? "bg-[#FF5500] text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" /> ORDERS ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest transition ${
                activeTab === "products"
                  ? "bg-[#FF5500] text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Package className="w-3.5 h-3.5" /> PRODUCTS ({products.length})
            </button>
          </div>
        </div>

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border border-neutral-800 bg-neutral-950 p-5 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                  TOTAL ORDERS RECEIVED
                </span>
                <p className="text-3xl font-black text-white">{orders.length}</p>
              </div>
              <div className="border border-neutral-800 bg-neutral-950 p-5 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                  ESTIMATED REVENUE
                </span>
                <p className="text-3xl font-black text-[#FF5500]">₹{totalRevenue}</p>
              </div>
              <div className="border border-neutral-800 bg-neutral-950 p-5 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                  FULFILLMENT STATUS
                </span>
                <p className="text-3xl font-black text-emerald-500">100% ACTIVE</p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="py-20 text-center border border-neutral-800 bg-neutral-950">
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  No customer orders received yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord, idx) => (
                  <div
                    key={ord.id || idx}
                    className="border border-neutral-800 bg-neutral-950 p-6 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-900 gap-2">
                      <div>
                        <span className="text-xs font-black text-[#FF5500] uppercase tracking-widest">
                          {ord.id || `ORD-${1000 + idx}`}
                        </span>
                        <h3 className="text-base font-bold text-white mt-0.5">{ord.customer}</h3>
                        <p className="text-xs text-neutral-400">{ord.phone} • {ord.address}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-lg font-black text-white">₹{ord.total}</span>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                          {ord.status || "PROCESSING (COD)"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                        ITEMS ORDERED:
                      </span>
                      <div className="flex flex-wrap gap-3">
                        {ord.items &&
                          ord.items.map((item: any, itemIdx: number) => (
                            <div
                              key={itemIdx}
                              className="bg-neutral-900 border border-neutral-800 px-3 py-2 text-xs font-bold text-neutral-300"
                            >
                              {item.name} ({item.size || "M"}) × {item.quantity || 1} — ₹{item.price}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            <div className="border border-neutral-800 bg-neutral-950 p-6 space-y-5">
              <div className="border-b border-neutral-800 pb-3">
                <span className="text-xs font-black uppercase tracking-widest text-[#FF5500]">
                  ADD NEW APPAREL
                </span>
                <h3 className="text-lg font-black uppercase tracking-tight text-white mt-0.5">
                  CREATE PRODUCT DROP
                </h3>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-4 text-xs font-bold uppercase tracking-widest">
                <div>
                  <label className="block text-neutral-400 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder='e.g., "MADNESS" OVERSIZED TEE'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black border border-neutral-800 px-4 py-3 text-white focus:border-[#FF5500] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-400 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      required
                      placeholder="799"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-black border border-neutral-800 px-4 py-3 text-white focus:border-[#FF5500] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      placeholder="1299"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="w-full bg-black border border-neutral-800 px-4 py-3 text-white focus:border-[#FF5500] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-black border border-neutral-800 px-4 py-3 text-white focus:border-[#FF5500] outline-none"
                  >
                    <option value="TEES">TEES</option>
                    <option value="SHIRTS">SHIRTS</option>
                    <option value="JEANS">JEANS</option>
                    <option value="HOODIES">HOODIES</option>
                    <option value="OUTERWEAR">OUTERWEAR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Image URLs (Comma-separated)</label>
                  <textarea
                    rows={2}
                    placeholder="https://image1.jpg, https://image2.jpg"
                    value={images}
                    onChange={(e) => setImages(e.target.value)}
                    className="w-full bg-black border border-neutral-800 px-4 py-3 text-white focus:border-[#FF5500] outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Heavyweight combed cotton street silhouette..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-black border border-neutral-800 px-4 py-3 text-white focus:border-[#FF5500] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FF5500] text-white py-4 font-black hover:bg-[#e04b00] transition flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> PUBLISH TO STOREFRONT
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-neutral-400 mb-2">
                ACTIVE STORE PRODUCTS ({products.length})
              </h3>

              {products.length === 0 ? (
                <div className="py-20 text-center border border-neutral-800 bg-neutral-950">
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                    No products added yet. Use the form on the left.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {products.map((p) => {
                    const img =
                      p.images && p.images.length > 0
                        ? p.images[0]
                        : p.image || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60";

                    return (
                      <div
                        key={p.id}
                        className="border border-neutral-800 bg-neutral-950 p-4 flex gap-4 items-center justify-between"
                      >
                        <div className="flex gap-3 items-center">
                          <img
                            src={img}
                            alt={p.name}
                            className="w-16 h-20 object-cover bg-neutral-900 border border-neutral-800"
                          />
                          <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase text-[#FF5500]">
                              {p.category || "STREETWEAR"}
                            </span>
                            <h4 className="font-bold text-xs text-white line-clamp-1">{p.name}</h4>
                            <p className="text-xs font-black text-white">₹{p.price}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="text-neutral-500 hover:text-red-500 transition p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}