import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "STRTKIN.in | Modern Men's Fashion",
  description: "Discover modern menswear and everyday essentials.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const phoneNumber = "+91 79811 42874";
  const whatsappDigits = "917981142874";

  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased selection:bg-[#FF5500] selection:text-white`}>
        <CartProvider>
          {/* Dynamic Header */}
          <Header />

          {/* Main Content */}
          <main className="min-h-screen">{children}</main>

          {/* Dark Industrial Footer */}
          <footer className="bg-neutral-950 text-white pt-16 pb-12 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div>
                <h3 className="text-lg font-black tracking-tight uppercase mb-4">STRTKIN.in</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Premium modern menswear and everyday essentials engineered for contemporary urban style.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-black tracking-widest uppercase mb-4 text-[#FF5500]">Quick Links</h4>
                <ul className="space-y-2 text-xs font-medium text-neutral-400">
                  <li><Link href="/shop" className="hover:text-white transition">Shop All</Link></li>
                  <li><Link href="/shop?category=t-shirts" className="hover:text-white transition">Tees</Link></li>
                  <li><Link href="/shop?category=hoodies" className="hover:text-white transition">Hoodies</Link></li>
                  <li><Link href="/about" className="hover:text-white transition">Our Story</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-black tracking-widest uppercase mb-4 text-[#FF5500]">Customer Care</h4>
                <ul className="space-y-2 text-xs font-medium text-neutral-400">
                  <li>
                    <a href={`tel:${phoneNumber}`} className="hover:text-white transition block">
                      Call Support: {phoneNumber}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://wa.me/${whatsappDigits}?text=Hi%20STRTKIN.in,%20I%20have%20a%20query%20regarding%20an%20order.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 transition font-bold block"
                    >
                      • WhatsApp Chat Support
                    </a>
                  </li>
                  <li>
                    <a href="mailto:strtkin.in@gmail.com" className="hover:text-white transition block">
                      strtkin.in@gmail.com
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-black tracking-widest uppercase mb-4 text-[#FF5500]">Secure Operations</h4>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Orders are processed securely with Cash on Delivery phone verification prior to dispatch.
                </p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-neutral-900 text-center text-[11px] text-neutral-600 font-bold uppercase tracking-widest">
              &copy; 2026 STRTKIN.in. All rights reserved.
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}