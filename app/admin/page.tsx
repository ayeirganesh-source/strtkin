"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [isLoaded, setIsLoaded] = useState(false);
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
    setIsLoaded(true);
    try {
      const storedProds = localStorage.getItem("strtkin_products");
      if (storedProds) setProducts(JSON.parse(storedProds));

      const storedOrders = localStorage.getItem("strtkin_orders");
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        setOrders([
          {
            id: "ORD-1001",
            customer: "Arjun Verma",
            phone: "+91 98765 43210",
            address: "Bandra West, Mumbai",
            total: 799,
            items: [{ name: '"Madness" Oversized Tee', size: "L", quantity: 1, price: 799 }],
          },
        ]);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-sans">
        <p className="text-xs font-black uppercase tracking-widest text-[#FF5500]">
          LOADING CONTROL ROOM...
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
      description: description || "Heavyweight drop-shoulder street silhouette.",
      image: imgArray[0],
      images: imgArray,
      sizes: ["S", "M", "L", "XL"],
    };

    const updated = [newProduct, ...products];
    setProducts(updated);
    localStorage.setItem("strtkin_products", JSON.stringify(updated));
    window.dispatchEvent(new Event("strtkin_products_updated"));

    setName("");
    setPrice("");
    setOriginalPrice("");
    setDescription("");
    setImages("");
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("strtkin_products", JSON.stringify(updated));
    window.dispatchEvent(new Event("strtkin_products_updated"));
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-neutral-800 pb-6 gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#FF5500]">
            CONTROL ROOM
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight mt-1">STRTKIN ADMIN</h1>
        </div>
        <Link
          href="/shop"
          className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition"
        >
          ← BACK TO STOREFRONT
        </Link>
      </header>

      {/* Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition ${
            activeTab === "orders" ? "bg-[#FF5500] text-white" : "bg-neutral-900 text-neutral-400 hover:text-white"
          }`}
        >
          ORDERS ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition ${
            activeTab === "products" ? "bg-[#FF5500] text-white" : "bg-neutral-900 text-neutral-400 hover:text-white"
          }`}
        >
          PRODUCTS ({products.length})
        </button>
      </div>

      {/* ORDERS TAB CONTENT */}
      {activeTab === "orders" && (
        <section className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-widest text-neutral-400">
            CUSTOMER ORDERS
          </h2>
          {orders.length === 0 ? (
            <div className="p-10 border border-neutral-800 bg-neutral-950 text-center">
              <p className="text-xs text-neutral-500 uppercase font-bold">No orders recorded.</p>
            </div>
          ) : (
            orders.map((ord, idx) => (
              <div key={ord.id || idx} className="border border-neutral-800 bg-neutral-950 p-6 space-y-3">
                <div className="flex justify-between items-center border-b border-neutral-900 pb-3">
                  <div>
                    <span className="text-xs font-black text-[#FF5500]">{ord.id}</span>
                    <h3 className="text-sm font-bold mt-0.5">{ord.customer}</h3>
                    <p className="text-xs text-neutral-400">{ord.phone} • {ord.address}</p>
                  </div>
                  <span className="text-lg font-black">₹{ord.total}</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {ord.items?.map((item: any, i: number) => (
                    <span key={i} className="bg-neutral-900 border border-neutral-800 px-3 py-1 text-xs font-bold text-neutral-300">
                      {item.name} ({item.size}) × {item.quantity}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </section>
      )}

      {/* PRODUCTS TAB CONTENT */}
      {activeTab === "products" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <form
            onSubmit={handleAddProduct}
            className="border border-neutral-800 bg-neutral-950 p-6 space-y-4 text-xs font-bold uppercase tracking-widest"
          >
            <h2 className="text-sm font-black text-[#FF5500] border-b border-neutral-800 pb-3">
              ADD NEW DROP
            </h2>

            <div className="space-y-1">
              <label className="text-neutral-400">Product Title</label>
              <input
                type="text"
                required
                placeholder='"MADNESS" TEE'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black border border-neutral-800 p-3 text-white focus:border-[#FF5500] outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-neutral-400">Price (₹)</label>
                <input
                  type="number"
                  required
                  placeholder="799"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-black border border-neutral-800 p-3 text-white focus:border-[#FF5500] outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-neutral-400">Original Price</label>
                <input
                  type="number"
                  placeholder="1299"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full bg-black border border-neutral-800 p-3 text-white focus:border-[#FF5500] outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-black border border-neutral-800 p-3 text-white focus:border-[#FF5500] outline-none"
              >
                <option value="TEES">TEES</option>
                <option value="SHIRTS">SHIRTS</option>
                <option value="JEANS">JEANS</option>
                <option value="HOODIES">HOODIES</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400">Image URLs (comma separated)</label>
              <textarea
                rows={2}
                placeholder="https://images.unsplash.com/..."
                value={images}
                onChange={(e) => setImages(e.target.value)}
                className="w-full bg-black border border-neutral-800 p-3 text-white focus:border-[#FF5500] outline-none resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400">Description</label>
              <textarea
                rows={2}
                placeholder="Heavyweight cotton silhouette..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-black border border-neutral-800 p-3 text-white focus:border-[#FF5500] outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF5500] text-white py-4 font-black hover:bg-[#e04b00] transition"
            >
              PUBLISH DROP
            </button>
          </form>

          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-neutral-400">
              STORE PRODUCTS ({products.length})
            </h2>

            {products.length === 0 ? (
              <div className="p-10 border border-neutral-800 bg-neutral-950 text-center">
                <p className="text-xs text-neutral-500 uppercase font-bold">No products published yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((p) => (
                  <div key={p.id} className="border border-neutral-800 bg-neutral-950 p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image || p.images?.[0]}
                        alt={p.name}
                        className="w-14 h-16 object-cover bg-neutral-900 border border-neutral-800"
                      />
                      <div>
                        <span className="text-[10px] font-black uppercase text-[#FF5500]">{p.category}</span>
                        <h4 className="font-bold text-xs text-white line-clamp-1">{p.name}</h4>
                        <p className="text-xs font-black">₹{p.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="text-neutral-500 hover:text-red-500 text-xs font-black uppercase transition p-2"
                    >
                      DELETE
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}