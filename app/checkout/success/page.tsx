"use client";

import Link from "next/link";
import { CheckCircle2, ShoppingBag } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 text-green-600 rounded-full mb-6">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      
      <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Order Placed Successfully!</h1>
      <p className="text-sm text-neutral-600 mb-2">
        Thank you for shopping with <span className="font-semibold text-black">STRTKIN.in</span>. Your order has been placed via Cash on Delivery.
      </p>
      <p className="text-xs text-neutral-400 mb-8">
        We have sent a confirmation and order details to your email.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-2 bg-black text-white text-xs uppercase tracking-widest px-8 py-4 font-semibold hover:bg-neutral-800 transition"
        >
          <ShoppingBag className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}