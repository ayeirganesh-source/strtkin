import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from "lucide-react";

const CATEGORIES = [
  {
    name: "T-Shirts",
    slug: "t-shirts",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Shirts",
    slug: "shirts",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Jeans",
    slug: "jeans",
    image:
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Hoodies & Jackets",
    slug: "hoodies-and-jackets",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-neutral-900 text-white py-24 md:py-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative max-w-4xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full text-neutral-300">
            Autumn / Winter Collection
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
            Style That Speaks For Itself
          </h1>
          <p className="text-lg text-neutral-400 max-w-xl mx-auto">
            Discover modern menswear, premium shirts, everyday denim, and essential outerwear.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="w-full sm:w-auto bg-white text-black px-8 py-4 font-semibold rounded-none hover:bg-neutral-200 transition flex items-center justify-center gap-2"
            >
              SHOP THE COLLECTION <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="border-b border-neutral-200 py-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-3 p-4">
            <Truck className="w-6 h-6 text-neutral-900" />
            <div className="text-left">
              <h4 className="font-semibold text-sm">Cash on Delivery</h4>
              <p className="text-xs text-neutral-500">Pay securely when your order arrives</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 p-4">
            <ShieldCheck className="w-6 h-6 text-neutral-900" />
            <div className="text-left">
              <h4 className="font-semibold text-sm">Verified Quality</h4>
              <p className="text-xs text-neutral-500">Handpicked menswear fabrics</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 p-4">
            <RefreshCw className="w-6 h-6 text-neutral-900" />
            <div className="text-left">
              <h4 className="font-semibold text-sm">Easy Confirmations</h4>
              <p className="text-xs text-neutral-500">Streamlined order tracking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Shop By Category</h2>
            <p className="text-sm text-neutral-500 mt-1">Explore our essential menswear lineup.</p>
          </div>
          <Link href="/shop" className="text-sm font-semibold underline underline-offset-4 hover:text-neutral-600">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              href={`/shop?category=${cat.slug}`}
              className="group relative bg-neutral-900 aspect-[4/5] flex items-end p-6 overflow-hidden rounded-sm"
            >
              {/* Background Image with Hover Zoom */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-90 transition-all duration-500"
              />

              {/* Gradient Overlay for Readable Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Category Label */}
              <div className="relative z-10 text-white">
                <h3 className="font-bold text-lg tracking-wide">{cat.name}</h3>
                <span className="text-xs text-neutral-300 flex items-center gap-1 mt-1 group-hover:translate-x-1 transition-transform">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}