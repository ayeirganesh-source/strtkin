"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("strtkin_cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart changes to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("strtkin_cart", JSON.stringify(newCart));
  };

  const addToCart = (item: CartItem) => {
    const existingIndex = cart.findIndex(
      (i) => i.id === item.id && i.size === item.size
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += item.quantity;
      saveCart(updated);
    } else {
      saveCart([...cart, item]);
    }
  };

  const removeFromCart = (id: string, size: string) => {
    const updated = cart.filter((i) => !(i.id === id && i.size === size));
    saveCart(updated);
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    const updated = cart.map((i) =>
      i.id === id && i.size === size ? { ...i, quantity } : i
    );
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
    localStorage.removeItem("strtkin_cart");
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}