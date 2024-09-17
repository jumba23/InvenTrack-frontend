// stores/supplierStore.js

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { fetchSuppliers } from "@/utils/api/supplierServices";

/**
 * Supplier Store
 *
 * This Zustand store manages the state for suppliers in the application.
 */
const useSupplierStore = create(
  persist(
    (set) => ({
      suppliers: [],
      loading: false,
      error: null,

      setSuppliers: (suppliers) => set({ suppliers }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      loadSuppliers: async () => {
        set({ loading: true });
        try {
          const data = await fetchSuppliers();
          set({ suppliers: data, error: null });
        } catch (error) {
          console.error("Failed to load suppliers:", error);
          set({ error: "Failed to load suppliers. Please try again later." });
        } finally {
          set({ loading: false });
        }
      },

      addSupplier: (supplier) =>
        set((state) => ({ suppliers: [...state.suppliers, supplier] })),
      updateSupplier: (updatedSupplier) =>
        set((state) => ({
          suppliers: state.suppliers.map((s) =>
            s.id === updatedSupplier.id ? updatedSupplier : s
          ),
        })),
      deleteSupplier: (supplierId) =>
        set((state) => ({
          suppliers: state.suppliers.filter((s) => s.id !== supplierId),
        })),

      reset: () => set({ suppliers: [], loading: false, error: null }),
    }),
    {
      name: "supplier-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSupplierStore;
