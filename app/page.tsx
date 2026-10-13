"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCart } from "./context/CartContext";

export default function HomePage() {
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FF5500] selection:text-white">
      {/* Top Ticker Bar */}
      <div className="bg-black border-b border-neutral-800 text-[10px] font-bold tracking-widest uppercase py-2.5 overflow-hidden whitespace-nowrap">
        <div className="inline-flex gap-8 animate-marquee items-center text-neutral-300">
          <span>FREE SHIPPING ACROSS INDIA OVER ₹1,999</span>
          <span className="text-[#FF5500]">■</span>
          <span className="text-white">DROP 04 — CONCRETE SEASON — OUT NOW</span>
          <span className="text-[#FF5500]">■</span>
          <span>7-DAY EASY EXCHANGES</span>
          <span className="text-[#FF5500]">■</span>
          <span>MADE IN INDIA</span>
          <span className="text-[#FF5500]">■</span>
          <span>FREE SHIPPING ACROSS INDIA OVER ₹1,999</span>
          <span className="text-[#FF5500]">■</span>
          <span className="text-white">DROP 04 — CONCRETE SEASON — OUT NOW</span>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="bg-[#FAF9F6] text-black border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-3xl font-black tracking-tighter uppercase flex items-center">
            STRTKIN<span className="text-[#FF5500]">.in</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-neutral-800">
            <Link href="/shop" className="hover:text-[#FF5500] transition">Shop All</Link>
            <Link href="/shop?category=tees" className="hover:text-[#FF5500] transition">Tees</Link>
            <Link href="/shop?category=hoodies" className="hover:text-[#FF5500] transition">Hoodies</Link>
            <Link href="/shop?category=outerwear" className="hover:text-[#FF5500] transition">Outerwear</Link>
          </nav>

          {/* Shopping Bag Icon */}
          <Link
            href="/cart"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#FF5500] transition"
          >
            <span>BAG</span>
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF5500] text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="relative min-h-[calc(100vh-105px)] flex items-end justify-start overflow-hidden bg-neutral-950">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2000&auto=format&fit=crop"
            alt="Streetwear City Background"
            className="w-full h-full object-cover object-center opacity-40 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32 w-full">
          {/* Tag */}
          <div className="text-[#FF5500] text-xs font-extrabold tracking-widest uppercase mb-4 flex items-center gap-2">
            <span>DROP 04 — CONCRETE SEASON</span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-6 max-w-4xl text-neutral-100">
            BORN ON <br />
            THE STREET<span className="inline-block w-4 h-4 sm:w-6 sm:h-6 bg-[#FF5500] ml-2 align-baseline" />
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-neutral-300 max-w-lg mb-8 font-medium leading-relaxed">
            Heavyweight essentials and statement outerwear, cut in India for the city-born. Built to be worn hard.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/shop"
              className="bg-[#FF5500] text-white text-xs uppercase tracking-widest px-8 py-4 font-extrabold hover:bg-[#e04b00] transition flex items-center gap-2"
            >
              Shop The Drop <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/about"
              className="border border-neutral-600 bg-black/40 backdrop-blur-sm text-white text-xs uppercase tracking-widest px-8 py-4 font-bold hover:bg-white hover:text-black transition"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}