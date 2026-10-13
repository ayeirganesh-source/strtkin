"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FF5500] selection:text-white relative overflow-hidden">
      {/* Background Image with Atmospheric Gradient Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2000&auto=format&fit=crop"
          alt="Streetwear Urban Background"
          className="w-full h-full object-cover object-center opacity-30 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-28 sm:py-36 border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#FF5500] text-[11px] font-black tracking-widest uppercase mb-6">
            <span>BRAND ETHOS — STRTKIN.IN</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6 max-w-5xl">
            BORN IN THE CITY. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500">
              BUILT TO BE WORN HARD.
            </span>
          </h1>
          <p className="text-neutral-300 max-w-2xl text-base sm:text-lg font-normal leading-relaxed">
            STRTKIN.in was forged to bridge the gap between heavy-gauge Indian textiles and raw, uncompromised streetwear culture. We engineer heavyweight essentials built for the concrete layout.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-neutral-800/80 bg-black/60 backdrop-blur-md p-8 space-y-4 hover:border-[#FF5500]/50 transition duration-300">
            <div className="w-12 h-12 bg-[#FF5500] text-white flex items-center justify-center font-black text-sm tracking-wider shadow-lg shadow-[#FF5500]/20">
              01
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-white">Heavyweight GSM Fabrics</h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              We source ultra-dense combed cotton and fleece-lined fabrics built to hold structure, withstand repeated wash cycles, and retain shape in any climate.
            </p>
          </div>

          <div className="border border-neutral-800/80 bg-black/60 backdrop-blur-md p-8 space-y-4 hover:border-[#FF5500]/50 transition duration-300">
            <div className="w-12 h-12 bg-[#FF5500] text-white flex items-center justify-center font-black text-sm tracking-wider shadow-lg shadow-[#FF5500]/20">
              02
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-white">Precision Oversized Cut</h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              Every drop features drop-shoulder boxy silhouettes engineered specifically for absolute ease of movement and modern urban street styling.
            </p>
          </div>

          <div className="border border-neutral-800/80 bg-black/60 backdrop-blur-md p-8 space-y-4 hover:border-[#FF5500]/50 transition duration-300">
            <div className="w-12 h-12 bg-[#FF5500] text-white flex items-center justify-center font-black text-sm tracking-wider shadow-lg shadow-[#FF5500]/20">
              03
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-white">Pan-India COD Fulfillment</h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              Direct verification dashboards and rapid courier networks ensure reliable delivery across all Indian pin codes with secure Cash on Delivery options.
            </p>
          </div>
        </div>

        {/* Guarantees Bar */}
        <div className="border-t border-b border-neutral-800/80 bg-neutral-950/40 backdrop-blur-sm py-12 px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <Truck className="w-7 h-7 text-[#FF5500] shrink-0" />
            <div>
              <span className="font-bold uppercase tracking-wider text-xs block text-white mb-1">Free Shipping Over ₹1,999</span>
              <span className="text-xs text-neutral-400 font-light">Available across all pin codes in India</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <ShieldCheck className="w-7 h-7 text-[#FF5500] shrink-0" />
            <div>
              <span className="font-bold uppercase tracking-wider text-xs block text-white mb-1">Verified COD Service</span>
              <span className="text-xs text-neutral-400 font-light">Pay cash upon door-step delivery</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <RefreshCw className="w-7 h-7 text-[#FF5500] shrink-0" />
            <div>
              <span className="font-bold uppercase tracking-wider text-xs block text-white mb-1">7-Day Easy Exchange</span>
              <span className="text-xs text-neutral-400 font-light">Hassle-free size and product replacements</span>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="text-center py-12 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">READY TO EXPLORE THE DROP?</h2>
          <div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 bg-[#FF5500] text-white text-xs uppercase tracking-widest px-10 py-5 font-black hover:bg-[#e04b00] transition duration-300 shadow-xl shadow-[#FF5500]/20"
            >
              Shop Full Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}