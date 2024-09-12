import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { fetchProducts } from "@/utils/api/apiService";

/**
 * Product Store
 *
 * This Zustand store manages the state for products in the application.
 * It provides actions for loading products, updating the product list,
 * and managing UI-related states like selected category and form rendering.
 *
 * The store uses the persist middleware to save its state in localStorage,
 * allowing for data persistence across page reloads.
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

      setProducts: (products) => set({ products }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setRenderForm: (render) => set({ renderForm: render }),
      setIsNewProduct: (isNew) => set({ isNewProduct: isNew }),

      loadProducts: async () => {
        set({ loading: true });
        try {
          const data = await fetchProducts();
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
        }),
    }),
    {
      name: "product-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useProductStore;
