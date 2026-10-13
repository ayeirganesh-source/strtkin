"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FF5500] selection:text-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-neutral-950 border-b border-neutral-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[#FF5500] text-xs font-black tracking-widest uppercase mb-3 block">
            Brand Ethos — STRTKIN.in
          </span>
          <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            BORN IN THE CITY. <br />
            BUILT TO BE WORN HARD.
          </h1>
          <p className="text-neutral-400 max-w-2xl text-base sm:text-lg font-medium leading-relaxed">
            STRTKIN.in was created to bridge the gap between heavy-gauge Indian textiles and raw, uncompromised streetwear culture. We design heavyweight essentials engineered for the modern street layout.
          </p>
        </div>
      </section>

      {/* Brand Values / Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-neutral-800 p-8 bg-neutral-900/50 space-y-4">
            <div className="w-10 h-10 bg-[#FF5500] text-white flex items-center justify-center font-black text-lg">
              01
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight">Heavyweight GSM Fabrics</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              We source ultra-dense combed cotton and fleece lined fabrics built to hold structure, withstand repeated wash cycles, and retain shape.
            </p>
          </div>

          <div className="border border-neutral-800 p-8 bg-neutral-900/50 space-y-4">
            <div className="w-10 h-10 bg-[#FF5500] text-white flex items-center justify-center font-black text-lg">
              02
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight">Precision Oversized Cut</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Every drop features drop-shoulder boxy cuts engineered specifically for ease of movement and modern urban styling.
            </p>
          </div>

          <div className="border border-neutral-800 p-8 bg-neutral-900/50 space-y-4">
            <div className="w-10 h-10 bg-[#FF5500] text-white flex items-center justify-center font-black text-lg">
              03
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight">pan-India COD Fulfillment</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Direct verification and rapid shipping options ensure reliable delivery across all Indian pin codes with Cash on Delivery options.
            </p>
          </div>
        </div>

        {/* Guarantees Bar */}
        <div className="border-t border-b border-neutral-800 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <Truck className="w-6 h-6 text-[#FF5500]" />
            <span className="font-bold uppercase tracking-wider text-sm">Free Shipping Over ₹1,999</span>
            <span className="text-xs text-neutral-400">Available across all pin codes in India</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#FF5500]" />
            <span className="font-bold uppercase tracking-wider text-sm">Verified COD Service</span>
            <span className="text-xs text-neutral-400">Pay cash upon door-step delivery</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RefreshCw className="w-6 h-6 text-[#FF5500]" />
            <span className="font-bold uppercase tracking-wider text-sm">7-Day Easy Exchange</span>
            <span className="text-xs text-neutral-400">Hassle-free size and product replacements</span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8 space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tight">READY TO EXPLORE THE DROP?</h2>
          <div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#FF5500] text-white text-xs uppercase tracking-widest px-8 py-4 font-bold hover:bg-[#e04b00] transition"
            >
              Shop Full Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}