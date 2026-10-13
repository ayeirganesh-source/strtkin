"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Trash2, ArrowLeft, Package } from "lucide-react";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Oversized Heavyweight Black Tee",
    category: "t-shirts",
    price: 799,
    originalPrice: 1299,
    stock: 25,
    sizes: "S, M, L, XL",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Classic Oxford White Button-Down",
    category: "shirts",
    price: 1499,
    originalPrice: 2499,
    stock: 18,
    sizes: "S, M, L, XL",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Slim Fit Raw Indigo Denim Jeans",
    category: "jeans",
    price: 1999,
    originalPrice: 3499,
    stock: 12,
    sizes: "30, 32, 34, 36",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60",
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [showAddForm, setShowAddForm] = useState(false);

  // Load products from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("strtkin_products");
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse products", e);
      }
    }
  }, []);

  // Save products to localStorage on update
  const updateProductsStorage = (updatedList: typeof INITIAL_PRODUCTS) => {
    setProducts(updatedList);
    localStorage.setItem("strtkin_products", JSON.stringify(updatedList));
  };

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "t-shirts",
    price: 999,
    originalPrice: 1499,
    stock: 20,
    sizes: "S, M, L, XL",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const productItem = {
      id: Date.now(),
      ...newProduct,
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice),
      stock: Number(newProduct.stock),
    };
    const updated = [productItem, ...products];
    updateProductsStorage(updated);
    setShowAddForm(false);
    setNewProduct({
      name: "",
      category: "t-shirts",
      price: 999,
      originalPrice: 1499,
      stock: 20,
      sizes: "S, M, L, XL",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60",
    });
  };

  const handleDeleteProduct = (id: number) => {
    const updated = products.filter((p) => p.id !== id);
    updateProductsStorage(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/admin/orders" className="text-xs font-semibold text-neutral-500 hover:text-black flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to Orders
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="text-xs uppercase tracking-widest bg-black text-white px-2 py-0.5">Admin Portal</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight uppercase">Product Catalog Management</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Add, update, or remove clothing items displayed on your storefront catalog.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="mt-4 md:mt-0 bg-black text-white text-xs uppercase tracking-widest px-6 py-3 font-bold hover:bg-neutral-800 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> {showAddForm ? "Cancel" : "Add New Product"}
        </button>
      </div>

      {/* Add Product Form Modal / Section */}
      {showAddForm && (
        <div className="bg-neutral-50 border border-neutral-200 p-6 mb-8">
          <h2 className="text-lg font-bold tracking-tight mb-4">Add New Apparel Item</h2>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600">Product Name *</label>
              <input
                type="text"
                name="name"
                required
                value={newProduct.name}
                onChange={handleInputChange}
                placeholder="e.g. Heavyweight Hoodie"
                className="w-full border border-neutral-300 p-2.5 text-sm focus:outline-none focus:border-black bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600">Category *</label>
              <select
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="w-full border border-neutral-300 p-2.5 text-sm focus:outline-none focus:border-black bg-white uppercase"
              >
                <option value="t-shirts">T-Shirts</option>
                <option value="shirts">Shirts</option>
                <option value="jeans">Jeans</option>
                <option value="hoodies & jackets">Hoodies & Jackets</option>
                <option value="trousers">Trousers</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600">Selling Price (₹) *</label>
              <input
                type="number"
                name="price"
                required
                value={newProduct.price}
                onChange={handleInputChange}
                className="w-full border border-neutral-300 p-2.5 text-sm focus:outline-none focus:border-black bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600">Original Price (₹)</label>
              <input
                type="number"
                name="originalPrice"
                value={newProduct.originalPrice}
                onChange={handleInputChange}
                className="w-full border border-neutral-300 p-2.5 text-sm focus:outline-none focus:border-black bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600">Stock Quantity *</label>
              <input
                type="number"
                name="stock"
                required
                value={newProduct.stock}
                onChange={handleInputChange}
                className="w-full border border-neutral-300 p-2.5 text-sm focus:outline-none focus:border-black bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600">Sizes Available *</label>
              <input
                type="text"
                name="sizes"
                required
                value={newProduct.sizes}
                onChange={handleInputChange}
                placeholder="S, M, L, XL"
                className="w-full border border-neutral-300 p-2.5 text-sm focus:outline-none focus:border-black bg-white"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600">Image URL *</label>
              <input
                type="url"
                name="image"
                required
                value={newProduct.image}
                onChange={handleInputChange}
                className="w-full border border-neutral-300 p-2.5 text-sm focus:outline-none focus:border-black bg-white"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3 pt-2">
              <button
                type="submit"
                className="bg-black text-white text-xs uppercase tracking-widest px-8 py-3 font-bold hover:bg-neutral-800 transition"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Product Table */}
      <div className="border border-neutral-200 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-xs uppercase tracking-wider text-neutral-500">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Sizes</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-sm">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-50 transition">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-12 h-14 bg-neutral-100 flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="font-semibold text-neutral-900">{product.name}</span>
                  </td>
                  <td className="p-4 uppercase text-xs text-neutral-600 font-medium">{product.category}</td>
                  <td className="p-4">
                    <span className="font-bold">₹{product.price}</span>{" "}
                    <span className="text-xs text-neutral-400 line-through">₹{product.originalPrice}</span>
                  </td>
                  <td className="p-4 font-semibold text-neutral-700">{product.stock} units</td>
                  <td className="p-4 text-xs text-neutral-500">{product.sizes}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 text-neutral-400 hover:text-red-600 transition"
                      title="Delete product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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