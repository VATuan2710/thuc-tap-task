export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
  rating: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  addedAt: string; // ISO string for serialization
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  isLoading: boolean;
  error: string | null;
}

export interface CartSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  itemCount: number;
} 