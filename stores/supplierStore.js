// stores/supplierStore.js

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { fetchSuppliers } from "@/utils/api/supplierServices";

/**
 * Supplier Store
 *
 * This Zustand store manages the state for suppliers in the application.
 * It provides actions to load suppliers from the API and update the store state.
 * The store also manages the loading and error states for the supplier data.
 * The store uses persisted state to store the supplier data in local storage.
 * The store also manages the state for rendering the supplier form and snackbar messages.
 *
 *
 */
const useSupplierStore = create(
  persist(
    (set) => ({
      suppliers: [],
      loading: false,
      error: null,
      renderForm: false,
      isNewSupplier: true,

      // Snackbar state
      snackbar: {
        open: false,
        message: "",
        severity: "success", // Can be 'success', 'error', 'info', 'warning'
      },

      //Actions
      setSuppliers: (suppliers) => set({ suppliers }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      setRenderForm: (render) => set({ renderForm: render }),
      setIsNewSupplier: (isNew) => set({ isNewSupplier: isNew }),

      // Snackbar actions
      setSnackbar: (snackbar) => set({ snackbar }),

      // load suppliers
      loadSuppliers: async () => {
        set({ loading: true });
        try {
          const data = await fetchSuppliers(); //API call to get supplier data
          set({ suppliers: data, error: null });
        } catch (error) {
          console.error("Failed to load suppliers:", error);
          set({ error: "Failed to load suppliers. Please try again later." });
        } finally {
          set({ loading: false });
        }
      },

      reset: () =>
        set({
          suppliers: [],
          loading: false,
          error: null,
          renderForm: false,
          isNewSupplier: true,
          snackbar: { open: false, message: "", severity: "success" }, // Reset snackbar state
        }),
    }),
    {
      name: "supplier-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSupplierStore;
