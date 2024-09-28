//stores/productStore.js

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { fetchProducts } from "@/utils/api/productService";

/**
 * Product Store
 *
 * This Zustand store manages the state for products in the application.
 * It provides actions for loading products, updating the product list,
 * and managing UI-related states like selected category and form rendering.
 *
 * The store uses the persist middleware to save its state in localStorage,
 * allowing for data persistence across page reloads.
 *
 * This Zustand store manages the state for products and UI elements like the snackbar
 * and other global UI-related states.
 */
const useProductStore = create(
  persist(
    (set, get) => ({
      products: [],
      loading: false,
      error: null,
      selectedCategory: "Service",
      renderForm: false,
      isNewProduct: true,

      // Snackbar state
      snackbar: {
        open: false,
        message: "",
        severity: "success", // Can be 'success', 'error', 'info', 'warning'
      },

      // Actions
      setProducts: (products) => set({ products }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setRenderForm: (render) => set({ renderForm: render }),
      setIsNewProduct: (isNew) => set({ isNewProduct: isNew }),

      // Snackbar actions
      setSnackbar: (snackbar) => set({ snackbar }),

      loadProducts: async () => {
        set({ loading: true });
        try {
          const data = await fetchProducts(); // API call to get product data
          set({ products: data, error: null });
        } catch (error) {
          console.error("Failed to load products:", error);
          set({ error: "Failed to load products. Please try again later." });
        } finally {
          set({ loading: false });
        }
      },

      reset: () =>
        set({
          products: [],
          loading: false,
          error: null,
          selectedCategory: "Service",
          renderForm: false,
          isNewProduct: true,
          snackbar: { open: false, message: "", severity: "success" }, // Reset snackbar state
        }),
    }),
    {
      name: "product-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useProductStore;
