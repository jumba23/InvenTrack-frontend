// utils/hooks/useSupplier.js

import { useAuth } from "@/context/AuthContext";
import useSupplierStore from "@/stores/supplierStore";
import { useCallback } from "react";
import { useEffect } from "react";

/**
 * useSupplier Hook
 *
 * This custom hook provides access to the supplier store and manages supplier data loading.
 * It integrates with the authentication state to ensure suppliers are loaded when a user is authenticated.
 *
 * Features:
 * - Provides access to all supplier store states and actions
 * - Automatically loads suppliers when authenticated and no suppliers are loaded
 * - Integrates with AuthContext for authentication state
 *
 * @returns {Object} The entire supplier store state and actions
 */
export function useSupplier() {
  const { authState } = useAuth();
  const supplierStore = useSupplierStore();

  // Memoize the loadSuppliers function to avoid re-renders
  const loadSuppliers = useCallback(() => {
    if (
      authState.isAuthenticated &&
      supplierStore.suppliers.length === 0 &&
      !supplierStore.loading
    ) {
      supplierStore.loadSuppliers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    authState.isAuthenticated,
    supplierStore.suppliers.length,
    supplierStore.loading,
  ]);

  useEffect(() => {
    loadSuppliers();
  }, [loadSuppliers]);

  return supplierStore;
}
