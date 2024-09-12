"use client";

import { useEffect } from "react";
import useProductStore from "@/stores/productStore";
import { useAuth } from "@/context/AuthContext";

/**
 * useProduct Hook
 *
 * This custom hook provides access to the product store and manages product data loading.
 * It integrates with the authentication state to ensure products are loaded when a user is authenticated.
 *
 * Features:
 * - Provides access to all product store states and actions
 * - Automatically loads products when authenticated and no products are loaded
 * - Integrates with AuthContext for authentication state
 *
 * @returns {Object} The entire product store state and actions
 */
export function useProduct() {
  const { authState } = useAuth();
  const productStore = useProductStore();

  useEffect(
    () => {
      // Load products if authenticated and no products are loaded
      if (
        authState.isAuthenticated &&
        productStore.products.length === 0 &&
        !productStore.loading
      ) {
        productStore.loadProducts();
      }
    },
    // eslint-disable-next-line
    [
      authState.isAuthenticated,
      productStore.products.length,
      productStore.loading,
      productStore.loadProducts,
    ]
  );

  return productStore;
}
