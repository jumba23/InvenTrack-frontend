import { useEffect } from "react";
import { useProduct } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";

/**
 * useProductLoader Hook
 *
 * This custom hook manages the loading of products in components.
 * It ensures that products are loaded when the component mounts if the user is authenticated
 * and products haven't been loaded yet.
 *
 * @returns {Object} An object containing the products array and loading state
 */
export function useProductLoader() {
  const { products, loading, loadProducts } = useProduct();
  const { authState } = useAuth();

  useEffect(() => {
    if (authState.isAuthenticated && products.length === 0 && !loading) {
      loadProducts();
    }
  }, [authState.isAuthenticated, products.length, loading, loadProducts]);

  return { products, loading };
}
