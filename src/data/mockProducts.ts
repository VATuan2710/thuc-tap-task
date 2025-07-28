import type { Product } from "../types/cart";

export const mockProducts: Product[] = [
  {
    id: "laptop-1",
    name: 'MacBook Pro 14" M3',
    price: 45990000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    description:
      "Powerful laptop with M3 chip, 16GB RAM, 512GB SSD. Perfect for developers and creatives.",
    category: "Electronics",
    stock: 15,
    rating: 4.8,
  },
  {
    id: "phone-1",
    name: "iPhone 15 Pro Max",
    price: 32990000,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    description:
      "Latest iPhone with titanium design, A17 Pro chip, and advanced camera system.",
    category: "Electronics",
    stock: 25,
    rating: 4.9,
  },
  {
    id: "headphones-1",
    name: "Sony WH-1000XM5",
    price: 8990000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    description:
      "Industry-leading noise canceling headphones with 30-hour battery life.",
    category: "Audio",
    stock: 30,
    rating: 4.7,
  },
  {
    id: "watch-1",
    name: "Apple Watch Series 9",
    price: 10990000,
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400",
    description:
      "Advanced health monitoring, fitness tracking, and seamless iPhone integration.",
    category: "Wearables",
    stock: 20,
    rating: 4.6,
  },
  {
    id: "tablet-1",
    name: 'iPad Pro 12.9"',
    price: 26990000,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
    description:
      "Professional tablet with M2 chip, Liquid Retina display, and Apple Pencil support.",
    category: "Electronics",
    stock: 12,
    rating: 4.8,
  },
  {
    id: "speaker-1",
    name: "HomePod mini",
    price: 2790000,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    description:
      "Compact smart speaker with amazing sound and Siri intelligence.",
    category: "Audio",
    stock: 35,
    rating: 4.5,
  },
  {
    id: "camera-1",
    name: "Canon EOS R6 Mark II",
    price: 67990000,
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
    description:
      "Full-frame mirrorless camera with 24.2MP sensor and advanced autofocus.",
    category: "Photography",
    stock: 8,
    rating: 4.9,
  },
  {
    id: "gaming-1",
    name: "PlayStation 5",
    price: 13990000,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
    description:
      "Next-gen gaming console with ray tracing, 3D audio, and lightning-fast SSD.",
    category: "Gaming",
    stock: 10,
    rating: 4.8,
  },
  {
    id: "keyboard-1",
    name: "Magic Keyboard",
    price: 3690000,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    description:
      "Wireless keyboard with scissor mechanism and Lightning connector.",
    category: "Accessories",
    stock: 40,
    rating: 4.4,
  },
  {
    id: "mouse-1",
    name: "Magic Mouse",
    price: 2290000,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    description: "Multi-Touch wireless mouse with optimized foot design.",
    category: "Accessories",
    stock: 45,
    rating: 4.2,
  },
  {
    id: "monitor-1",
    name: "Studio Display",
    price: 43990000,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
    description:
      "27-inch 5K Retina display with 600 nits brightness and P3 wide color.",
    category: "Electronics",
    stock: 6,
    rating: 4.7,
  },
  {
    id: "charger-1",
    name: "MagSafe Charger",
    price: 1190000,
    image: "https://images.unsplash.com/photo-1609592606130-0bb4fef1cad3?w=400",
    description:
      "Wireless charger with perfect alignment for iPhone 12 and later.",
    category: "Accessories",
    stock: 60,
    rating: 4.3,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter((product) => product.category === category);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const getAllCategories = (): string[] => {
  const categories = mockProducts.map((product) => product.category);
  return [...new Set(categories)].sort();
};
