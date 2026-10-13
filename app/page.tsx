import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-16 py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-100 p-12 md:p-24 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            Modern Menswear.
          </h1>
          <p className="text-neutral-600 max-w-xl mx-auto text-sm md:text-base">
            Discover everyday essentials and contemporary apparel built for style and comfort.
          </p>
          <div>
            <Link
              href="/shop"
              className="inline-block bg-black text-white text-xs uppercase tracking-widest px-8 py-4 font-bold hover:bg-neutral-800 transition"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}