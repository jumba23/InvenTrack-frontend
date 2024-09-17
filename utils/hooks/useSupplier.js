// utils/hooks/useSupplier.js

import useSupplierStore from "@/stores/supplierStore";

/**
 * useSupplier Hook
 *
 * This custom hook provides access to the supplier store and its actions.
 *
 * @returns {Object} The supplier store state and actions.
 */
export const useSupplier = () => {
  return useSupplierStore();
};
