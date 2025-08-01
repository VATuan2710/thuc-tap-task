import { createSlice, type PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { CartState, CartItem, Product } from "../types/cart";

// Calculate totals helper function
const calculateTotals = (items: CartItem[]) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return { totalQuantity, totalAmount };
};

// Initial state
const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingItemIndex >= 0) {
        const newQuantity = state.items[existingItemIndex].quantity + quantity;
        if (newQuantity <= product.stock) {
          state.items[existingItemIndex].quantity = newQuantity;
        } else {
          state.error = `Chỉ còn ${product.stock} sản phẩm trong kho`;
          return;
        }
      } else {
        if (quantity <= product.stock) {
          const newItem: CartItem = {
            id: `${product.id}-${Date.now()}`,
            product,
            quantity,
            addedAt: new Date().toISOString(), // Convert to ISO string for serialization
          };
          state.items.push(newItem);
        } else {
          state.error = `Chỉ còn ${product.stock} sản phẩm trong kho`;
          return;
        }
      }

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
      state.error = null;


    },

    // Remove item from cart
    removeFromCart: (state, action: PayloadAction<{ itemId: string }>) => {
      const { itemId } = action.payload;
      state.items = state.items.filter((item: CartItem) => item.id !== itemId);

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;

      console.log(`Item removed - Total items: ${state.totalQuantity}`);
    },

    // Update item quantity
    updateQuantity: (
      state,
      action: PayloadAction<{ itemId: string; quantity: number }>
    ) => {
      const { itemId, quantity } = action.payload;

      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        state.items = state.items.filter((item) => item.id !== itemId);
      } else {
        const itemIndex = state.items.findIndex((item) => item.id === itemId);

        if (itemIndex >= 0) {
          const item = state.items[itemIndex];

          // Check stock limit
          if (quantity <= item.product.stock) {
            state.items[itemIndex].quantity = quantity;
            state.error = null;
          } else {
            state.error = `Chỉ còn ${item.product.stock} sản phẩm trong kho`;
            return;
          }
        }
      }

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;

      console.log(`Quantity updated - Total items: ${state.totalQuantity}`);
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.error = null;

      console.log(`Cart cleared`);
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  clearError,
  setLoading,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotalQuantity = (state: { cart: CartState }) =>
  state.cart.totalQuantity;
export const selectCartTotalAmount = (state: { cart: CartState }) =>
  state.cart.totalAmount;
export const selectCartIsLoading = (state: { cart: CartState }) =>
  state.cart.isLoading;
export const selectCartError = (state: { cart: CartState }) => state.cart.error;

// Computed selectors
export const selectCartSummary = createSelector(
  [(state: { cart: CartState }) => state.cart.totalAmount, 
   (state: { cart: CartState }) => state.cart.totalQuantity],
  (totalAmount, totalQuantity) => {
    const subtotal = totalAmount;
    const tax = Math.round(subtotal * 0.1);
    const shipping = totalQuantity > 0 ? (subtotal > 50000000 ? 0 : 500000) : 0; // Free shipping over 50M VND
    const total = subtotal + tax + shipping;

    return {
      subtotal,
      tax,
      shipping,
      total,
      itemCount: totalQuantity,
    };
  }
);
