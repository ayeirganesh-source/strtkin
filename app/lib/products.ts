export const INITIAL_PRODUCTS = [
  {
    id: "1",
    name: 'Urban Royal "Enjoy The Madness" Oversized Graphic Tee',
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
  if (typeof window === "undefined") return INITIAL_PRODUCTS;
  
  const saved = localStorage.getItem("strtkin_products_v2");
  if (!saved) {
    localStorage.setItem("strtkin_products_v2", JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  
  try {
    const parsed = JSON.parse(saved);
    return parsed;
  } catch (e) {
    return INITIAL_PRODUCTS;
  }
}

export function saveStoredProducts(products: any[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("strtkin_products_v2", JSON.stringify(products));
  window.dispatchEvent(new Event("strtkin_products_updated"));
}