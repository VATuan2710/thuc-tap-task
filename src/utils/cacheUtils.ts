import type { CartItem } from "../types/cart";

const CART_STORAGE_KEY = "shopping_cart";

type StorageType = "localStorage" | "sessionStorage";

export const cacheUtils = {
  saveCart: (
    cartItems: CartItem[],
    storageType: StorageType = "localStorage"
  ): void => {
    try {
      const storage =
        storageType === "localStorage" ? localStorage : sessionStorage;

      const cartData = {
        items: cartItems,
        savedAt: new Date().toISOString(),
      };

      const serializedCart = JSON.stringify(cartData);

      storage.setItem(CART_STORAGE_KEY, serializedCart);

      console.log(`Cart saved to ${storageType}:`, cartItems.length, "items");
    } catch (error) {
      console.error(`Error saving cart to ${storageType}:`, error);

      // Handle quota exceeded error
      if (error instanceof Error && error.name === "QuotaExceededError") {
        console.warn("Storage quota exceeded, clearing old data...");
        cacheUtils.clearCart(storageType);
      }
    }
  },

  // Load cart from CACHE
  loadCart: (storageType: StorageType = "localStorage"): CartItem[] => {
    try {
      const storage =
        storageType === "localStorage" ? localStorage : sessionStorage;
      const cartData = storage.getItem(CART_STORAGE_KEY);

      if (!cartData) {
        console.log(`No cart found in ${storageType}`);
        return [];
      }
      const parsedData = JSON.parse(cartData);
      if (!parsedData.items || !Array.isArray(parsedData.items)) {
        console.warn(`Invalid cart data in ${storageType}`);
        return [];
      }

      // Convert addedAt back to Date objects
      const items =
        parsedData.items?.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt),
        })) || [];

      console.log(`Cart loaded from ${storageType}:`, items.length, "items");
      return items;
    } catch (error) {
      console.error(`Error loading cart from ${storageType}:`, error);
      return [];
    }
  },

  // Clear CACHE
  clearCart: (storageType: StorageType = "localStorage"): void => {
    try {
      const storage =
        storageType === "localStorage" ? localStorage : sessionStorage;

      storage.removeItem(CART_STORAGE_KEY);

      console.log(`Cart cleared from ${storageType}`);
    } catch (error) {
      console.error(`Error clearing cart from ${storageType}:`, error);
    }
  },

  // Check if cart exists in CACHE
  hasCart: (storageType: StorageType = "localStorage"): boolean => {
    try {
      const storage =
        storageType === "localStorage" ? localStorage : sessionStorage;
      return !!storage.getItem(CART_STORAGE_KEY);
    } catch (error) {
      return false;
    }
  },
};
