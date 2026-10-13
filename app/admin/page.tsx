"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("TEES");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");

  useEffect(() => {
    setMounted(true);
    try {
      const p = localStorage.getItem("strtkin_products");
      if (p) setProducts(JSON.parse(p));
      const o = localStorage.getItem("strtkin_orders");
      if (o) setOrders(JSON.parse(o));
    } catch (err) {}
  }, []);

  if (!mounted) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    const newP = {
      id: String(Date.now()),
      name,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      category,
      description,
      image: images ? images.split(",")[0].trim() : "",
      images: images ? images.split(",").map(s => s.trim()) : [],
      sizes: ["S", "M", "L", "XL"]
    };
    const updated = [newP, ...products];
    setProducts(updated);
    localStorage.setItem("strtkin_products", JSON.stringify(updated));
    window.dispatchEvent(new Event("strtkin_products_updated"));
    setName(""); setPrice(""); setOriginalPrice(""); setDescription(""); setImages("");
  };

  const handleDelete = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem("strtkin_products", JSON.stringify(updated));
    window.dispatchEvent(new Event("strtkin_products_updated"));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
        <h1 className="text-2xl font-black uppercase">Admin Control Center</h1>
        <Link href="/shop" className="text-xs font-bold text-[#FF5500]">← BACK TO STORE</Link>
      </div>

      <div className="flex gap-4 border-b border-neutral-800 pb-4">
        <button 
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 text-xs font-black uppercase ${activeTab === "orders" ? "bg-[#FF5500] text-white" : "bg-neutral-900 text-neutral-400"}`}
        >
          Orders ({orders.length})
        </button>
        <button 
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 text-xs font-black uppercase ${activeTab === "products" ? "bg-[#FF5500] text-white" : "bg-neutral-900 text-neutral-400"}`}
        >
          Products ({products.length})
        </button>
      </div>

      {activeTab === "orders" ? (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-neutral-500 text-xs">No orders found.</p>
          ) : (
            orders.map((ord, idx) => (
              <div key={idx} className="border border-neutral-800 p-4 bg-neutral-950 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#FF5500]">{ord.id || `ORD-${idx+1}`}</span>
                  <span>₹{ord.total}</span>
                </div>
                <p className="text-xs text-neutral-300">{ord.customer} • {ord.phone} • {ord.address}</p>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleAdd} className="border border-neutral-800 p-6 bg-neutral-950 space-y-4 text-xs font-bold uppercase">
            <h2 className="text-sm font-black text-[#FF5500]">Add Product</h2>
            <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-black border border-neutral-800 p-3 text-white" />
            <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required className="w-full bg-black border border-neutral-800 p-3 text-white" />
            <input type="number" placeholder="Original Price" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} className="w-full bg-black border border-neutral-800 p-3 text-white" />
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-black border border-neutral-800 p-3 text-white">
              <option value="TEES">TEES</option>
              <option value="SHIRTS">SHIRTS</option>
              <option value="JEANS">JEANS</option>
              <option value="HOODIES">HOODIES</option>
            </select>
            <textarea placeholder="Image URLs (comma separated)" value={images} onChange={e => setImages(e.target.value)} className="w-full bg-black border border-neutral-800 p-3 text-white" />
            <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-black border border-neutral-800 p-3 text-white" />
            <button type="submit" className="w-full bg-[#FF5500] text-white p-3 font-black">Publish Product</button>
          </form>

          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-black text-neutral-400">Manage Products ({products.length})</h2>
            {products.length === 0 ? (
              <p className="text-neutral-500 text-xs">No products uploaded.</p>
            ) : (
              products.map(p => (
                <div key={p.id} className="border border-neutral-800 p-4 bg-neutral-950 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-xs text-white">{p.name}</p>
                    <p className="text-xs text-[#FF5500]">₹{p.price}</p>
                  </div>
                  <button onClick={() => handleDelete(p.id)} className="text-xs font-bold text-red-500 hover:underline">Delete</button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
