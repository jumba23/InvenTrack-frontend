// ZustandInitializers/ProductInitializer.js
"use client";

import { useEffect } from "react";
import { useProduct } from "@/utils/hooks/useProduct";
import { ErrorTypes } from "@/utils/errorHandling/errorTypes";

/**
 * ProductInitializer Component
 *
 * This component is responsible for initializing the product data when the application loads.
 * It uses the useProduct hook to trigger the initial loading of products.
 * Now includes error handling for product loading failures.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to be rendered
 * @returns {React.ReactNode} The child components
 */
export default function ProductInitializer({ children }) {
  const { loadProducts, setError } = useProduct();

  useEffect(() => {
    // Trigger initial product loading when the component mounts
    loadProducts().catch((error) => {
      setError({
        type: ErrorTypes.API_ERROR,
        message: "Failed to load products",
      });
    });
  }, [loadProducts, setError]);

  // Render children without modifying them
  return <>{children}</>;
}
