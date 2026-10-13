export const DEFAULT_PRODUCTS = [
  {
    id: "1",
    name: 'Urban Royal "Enjoy The Madness" Oversized Tee',
    category: "t-shirts",
    price: 799,
    originalPrice: 1299,
    description: "Premium cotton blend oversized drop-shoulder t-shirt in beige with a bold back graphic print.",
    sizes: ["M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60"
    ],
  },
];

export function getStoredProducts() {
  if (typeof window === "undefined") return DEFAULT_PRODUCTS;
  const saved = localStorage.getItem("strtkin_products");
  if (!saved) {
    localStorage.setItem("strtkin_products", JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
  try {
    const parsed = JSON.parse(saved);
    return parsed;
  } catch (e) {
    return DEFAULT_PRODUCTS;
  }
}

export function saveStoredProducts(products: any[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("strtkin_products", JSON.stringify(products));
  // Notify other components/tabs immediately
  window.dispatchEvent(new Event("strtkin_products_updated"));
}