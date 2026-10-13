"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Phone,
  Trash2,
  PackageCheck,
  Plus,
  Edit,
  ShoppingBag,
  Package,
  X,
  Upload,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [activeAdminTab, setActiveAdminTab] = useState<"ORDERS" | "PRODUCTS">("ORDERS");

  // Orders State
  const [orders, setOrders] = useState<any[]>([]);
  const [orderFilter, setOrderFilter] = useState<"ALL" | "PENDING" | "CONFIRMED">("ALL");

  // Products State (Starts empty, fully dynamic)
  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "t-shirts",
    price: "",
    originalPrice: "",
    description: "",
    sizes: "S, M, L, XL",
    image: "",
  });

  // Load Orders & Products from LocalStorage
  useEffect(() => {
    // Orders
    const savedOrders = localStorage.getItem("strtkin_orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error("Failed to parse orders", e);
      }
    }

    // Products
    const savedProducts = localStorage.getItem("strtkin_products");
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        setProducts([]);
      }
    } else {
      setProducts([]);
      localStorage.setItem("strtkin_products", JSON.stringify([]));
    }
  }, []);

  // Order Operations
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

  const filteredOrders = orders.filter((order) => {
    if (orderFilter === "PENDING") return order.status !== "CONFIRMED & FORWARDED" && order.status !== "CONFIRMED";
    if (orderFilter === "CONFIRMED") return order.status === "CONFIRMED & FORWARDED" || order.status === "CONFIRMED";
    return true;
  });

  // Product Operations
  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "t-shirts",
      price: "",
      originalPrice: "",
      description: "",
      sizes: "S, M, L, XL",
      image: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      originalPrice: String(product.originalPrice || ""),
      description: product.description || "",
      sizes: Array.isArray(product.sizes) ? product.sizes.join(", ") : product.sizes,
      image: product.image,
    });
    setIsModalOpen(true);
  };

  // Handle local file upload from computer using FileReader
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("strtkin_products", JSON.stringify(updated));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedProduct = {
      id: editingProduct ? editingProduct.id : String(Date.now()),
      name: formData.name,
      category: formData.category.toLowerCase(),
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : Number(formData.price) * 1.5,
      description: formData.description,
      sizes: formData.sizes.split(",").map((s) => s.trim()),
      image: formData.image || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60",
    };

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map((p) => (p.id === editingProduct.id ? formattedProduct : p));
    } else {
      updatedProducts = [formattedProduct, ...products];
    }

    setProducts(updatedProducts);
    localStorage.setItem("strtkin_products", JSON.stringify(updatedProducts));
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-[#FF5500] selection:text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Navigation Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-neutral-800 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link
                href="/shop"
                className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-[#FF5500] flex items-center gap-1.5 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Storefront
              </Link>
              <span className="text-neutral-700">/</span>
              <span className="text-[10px] font-black uppercase tracking-widest bg-[#FF5500] text-white px-2 py-0.5">
                Admin Control Room
              </span>
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tight text-white">
              STRTKIN Control Center
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Manage live customer orders, verify Cash on Delivery, and edit product catalog items.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-neutral-900 border border-neutral-800 p-1">
            <button
              onClick={() => setActiveAdminTab("ORDERS")}
              className={
                activeAdminTab === "ORDERS"
                  ? "flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest transition bg-[#FF5500] text-white shadow-lg"
                  : "flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest transition text-neutral-400 hover:text-white"
              }
            >
              <ShoppingBag className="w-4 h-4" /> Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveAdminTab("PRODUCTS")}
              className={
                activeAdminTab === "PRODUCTS"
                  ? "flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest transition bg-[#FF5500] text-white shadow-lg"
                  : "flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest transition text-neutral-400 hover:text-white"
              }
            >
              <Package className="w-4 h-4" /> Products ({products.length})
            </button>
          </div>
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeAdminTab === "ORDERS" && (
          <div className="space-y-6">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setOrderFilter("ALL")}
                className={
                  orderFilter === "ALL"
                    ? "px-4 py-2 text-xs font-bold uppercase tracking-wider transition border bg-white text-black border-white"
                    : "px-4 py-2 text-xs font-bold uppercase tracking-wider transition border bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-600"
                }
              >
                All Orders ({orders.length})
              </button>
              <button
                onClick={() => setOrderFilter("PENDING")}
                className={
                  orderFilter === "PENDING"
                    ? "px-4 py-2 text-xs font-bold uppercase tracking-wider transition border bg-white text-black border-white"
                    : "px-4 py-2 text-xs font-bold uppercase tracking-wider transition border bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-600"
                }
              >
                Pending Verification
              </button>
              <button
                onClick={() => setOrderFilter("CONFIRMED")}
                className={
                  orderFilter === "CONFIRMED"
                    ? "px-4 py-2 text-xs font-bold uppercase tracking-wider transition border bg-white text-black border-white"
                    : "px-4 py-2 text-xs font-bold uppercase tracking-wider transition border bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-600"
                }
              >
                Confirmed & Forwarded
              </button>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="border border-neutral-800 bg-neutral-900/40 p-16 text-center space-y-3">
                <PackageCheck className="w-10 h-10 text-neutral-600 mx-auto" />
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  No Customer Orders Found
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-neutral-800 bg-neutral-900/60 p-6 space-y-4 hover:border-neutral-700 transition"
                  >
                    <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-neutral-800">
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-black uppercase tracking-tight text-white">
                          {order.id}
                        </span>
                        <span
                          className={
                            order.status === "CONFIRMED & FORWARDED" || order.status === "CONFIRMED"
                              ? "inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest bg-green-500/10 text-green-400 border border-green-500/30"
                              : "inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/30"
                          }
                        >
                          {order.status === "CONFIRMED & FORWARDED" || order.status === "CONFIRMED" ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <Clock className="w-3.5 h-3.5" />
                          )}
                          {order.status}
                        </span>
                      </div>
                      <span className="text-xs text-neutral-500">{order.date}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-1">
                          Customer Info
                        </span>
                        <span className="font-bold block text-neutral-200">{order.customer?.name}</span>
                        <span className="text-xs font-semibold text-[#FF5500]">{order.customer?.phone}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-1">
                          Delivery Address
                        </span>
                        <span className="text-xs text-neutral-400 leading-relaxed block">
                          {order.customer?.address}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-between items-center pt-3 border-t border-neutral-800/80 gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-0.5">
                          Items
                        </span>
                        <span className="text-xs font-medium text-neutral-300">{order.items}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-neutral-400">Total: </span>
                        <span className="text-lg font-black text-white">₹{order.total}</span>
                        <span className="text-[10px] text-neutral-500 block">(COD)</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      {order.status !== "CONFIRMED & FORWARDED" && order.status !== "CONFIRMED" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "CONFIRMED & FORWARDED")}
                          className="bg-[#FF5500] text-white text-xs uppercase tracking-widest px-5 py-2.5 font-extrabold hover:bg-[#e04b00] transition flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Confirm Order
                        </button>
                      )}
                      <a
                        href={"tel:" + order.customer?.phone}
                        className="border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest px-5 py-2.5 font-bold hover:bg-neutral-800 transition flex items-center gap-2"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call Customer
                      </a>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="p-2.5 text-neutral-500 hover:text-red-500 transition ml-auto"
                        title="Delete Order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRODUCT MANAGEMENT */}
        {activeAdminTab === "PRODUCTS" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold uppercase tracking-wider text-neutral-300">
                Live Store Catalog ({products.length} Items)
              </h2>
              <button
                onClick={openCreateModal}
                className="bg-[#FF5500] text-white text-xs uppercase tracking-widest px-6 py-3 font-black hover:bg-[#e04b00] transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add New Product
              </button>
            </div>

            {products.length === 0 ? (
              <div className="border border-neutral-800 bg-neutral-900/40 p-16 text-center space-y-3">
                <Package className="w-10 h-10 text-neutral-600 mx-auto" />
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  No products in catalog yet. Click "Add New Product" to publish items.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border border-neutral-800 bg-neutral-900/60 p-4 space-y-4 hover:border-neutral-700 transition"
                  >
                    <div className="aspect-[4/3] bg-neutral-950 overflow-hidden relative border border-neutral-800">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border border-neutral-800">
                        {product.category}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-white truncate">{product.name}</h3>
                      <p className="text-xs text-neutral-400 line-clamp-2">{product.description}</p>
                      <div className="flex items-center gap-3 pt-2">
                        <span className="font-black text-white">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-neutral-500 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-neutral-800">
                      <button
                        onClick={() => openEditModal(product)}
                        className="flex-1 bg-neutral-800 text-white text-xs uppercase tracking-wider py-2 font-bold hover:bg-white hover:text-black transition flex items-center justify-center gap-1.5"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 border border-neutral-800 text-neutral-400 hover:text-red-500 hover:border-red-500 transition"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* EDIT / ADD PRODUCT MODAL WITH COMPUTER FILE UPLOAD */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg p-6 space-y-6 relative text-white max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-black uppercase tracking-tight">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                    Product Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                    placeholder="e.g. Heavyweight Boxy Tee"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                    >
                      <option value="t-shirts">Tees</option>
                      <option value="shirts">Shirts</option>
                      <option value="jeans">Jeans</option>
                      <option value="hoodies">Hoodies</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                      placeholder="799"
                    />
                  </div>
                </div>

                {/* COMPUTER FILE UPLOAD */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                    Upload Product Image from Computer
                  </label>
                  <div className="flex items-center gap-3 bg-neutral-950 border border-neutral-800 p-3">
                    <label className="cursor-pointer bg-neutral-800 hover:bg-[#FF5500] text-white text-xs uppercase font-bold px-4 py-2 transition flex items-center gap-2">
                      <Upload className="w-3.5 h-3.5" /> Choose File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>
                    <span className="text-xs text-neutral-400 truncate">
                      {formData.image ? "Image loaded successfully ✓" : "No file chosen"}
                    </span>
                  </div>
                  {formData.image && (
                    <div className="mt-2 w-20 h-20 border border-neutral-800 relative overflow-hidden">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                    Sizes (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                    placeholder="S, M, L, XL"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                    placeholder="Short product description..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FF5500] text-white text-xs uppercase tracking-widest py-4 font-black hover:bg-[#e04b00] transition"
                >
                  {editingProduct ? "Save Changes" : "Publish Product"}
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}