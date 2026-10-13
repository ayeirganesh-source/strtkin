"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Trash2,
  Plus,
  Edit,
  ShoppingBag,
  Package,
  X,
  Upload,
  Lock,
  LogOut,
} from "lucide-react";
import { getStoredProducts, saveStoredProducts } from "../lib/products";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeAdminTab, setActiveAdminTab] = useState<"ORDERS" | "PRODUCTS">("PRODUCTS");
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "t-shirts",
    price: "",
    originalPrice: "",
    description: "",
    sizes: "M, L, XL",
    images: [] as string[],
  });

  useEffect(() => {
    const authStatus = sessionStorage.getItem("strtkin_admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const savedOrders = localStorage.getItem("strtkin_orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error("Failed to parse orders", e);
      }
    }

    setProducts(getStoredProducts());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput === "admin" && passwordInput === "strtkin2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("strtkin_admin_auth", "true");
      setLoginError("");
    } else {
      setLoginError("Invalid username or password credentials.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("strtkin_admin_auth");
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "t-shirts",
      price: "",
      originalPrice: "",
      description: "",
      sizes: "M, L, XL",
      images: [],
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
      images: product.images || (product.image ? [product.image] : []),
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product from your storefront?")) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      saveStoredProducts(updated);
    }
  };

  const handleMultipleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const readers: Promise<string>[] = Array.from(files).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then((newImages) => {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...newImages],
        }));
      });
    }
  };

  const removeImageAt = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
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
      images: formData.images,
      image: formData.images[0] || "",
    };

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map((p) => (p.id === editingProduct.id ? formattedProduct : p));
    } else {
      updatedProducts = [formattedProduct, ...products];
    }

    setProducts(updatedProducts);
    saveStoredProducts(updatedProducts);
    setIsModalOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full border border-neutral-800 bg-neutral-950 p-8 space-y-6">
          <div className="text-center space-y-2">
            <Lock className="w-10 h-10 text-[#FF5500] mx-auto" />
            <h1 className="text-2xl font-black uppercase tracking-tight">ADMIN ACCESS PORTAL</h1>
            <p className="text-xs text-neutral-400">Enter secure administrative credentials to proceed.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">USERNAME</label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 p-3 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">PASSWORD</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 p-3 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                placeholder="••••••••"
              />
            </div>

            {loginError && <p className="text-xs text-red-500 font-semibold">{loginError}</p>}

            <button
              type="submit"
              className="w-full bg-[#FF5500] text-white text-xs font-black uppercase tracking-widest py-4 hover:bg-[#e04b00] transition"
            >
              UNLOCK ADMIN DASHBOARD
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-[#FF5500] selection:text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
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
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-neutral-900 border border-neutral-800 p-1">
              <button
                onClick={() => setActiveAdminTab("ORDERS")}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest transition ${
                  activeAdminTab === "ORDERS"
                    ? "bg-[#FF5500] text-white shadow-lg"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <ShoppingBag className="w-4 h-4" /> Orders ({orders.length})
              </button>
              <button
                onClick={() => setActiveAdminTab("PRODUCTS")}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest transition ${
                  activeAdminTab === "PRODUCTS"
                    ? "bg-[#FF5500] text-white shadow-lg"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Package className="w-4 h-4" /> Products ({products.length})
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="p-3 border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PRODUCTS TAB */}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border border-neutral-800 bg-neutral-900/60 p-4 space-y-4 hover:border-neutral-700 transition"
                >
                  <div className="aspect-[4/3] bg-neutral-950 overflow-hidden relative border border-neutral-800">
                    <img
                      src={product.images && product.images.length > 0 ? product.images[0] : product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border border-neutral-800">
                      {product.images?.length || 1} Photo(s)
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-white truncate">{product.name}</h3>
                    <div className="flex items-center gap-3 pt-2">
                      <span className="font-black text-white">₹{product.price}</span>
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
                      className="bg-red-950/40 border border-red-900/50 text-red-400 hover:bg-red-600 hover:text-white text-xs uppercase tracking-wider px-3 py-2 font-bold transition flex items-center justify-center"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL */}
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
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                      Sizes
                    </label>
                    <input
                      type="text"
                      value={formData.sizes}
                      onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                    Upload Photos From Gallery
                  </label>
                  
                  <label className="w-full cursor-pointer bg-neutral-950 border border-dashed border-neutral-700 hover:border-[#FF5500] p-4 text-center transition flex flex-col items-center justify-center gap-1 mb-3">
                    <Upload className="w-5 h-5 text-[#FF5500]" />
                    <span className="text-xs font-bold text-neutral-300">Click to Select Photos</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleMultipleImageUpload}
                      className="hidden"
                    />
                  </label>

                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 pt-2">
                      {formData.images.map((img, idx) => (
                        <div key={idx} className="relative aspect-square border border-neutral-800 bg-neutral-950 group">
                          <img src={img} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImageAt(idx)}
                            className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs opacity-90 hover:opacity-100"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-white focus:outline-none focus:border-[#FF5500]"
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