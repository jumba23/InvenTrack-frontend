//components/ZustandInitializers/ProductInitializer.js
"use client";

import { useEffect, useRef } from "react";
import { useProduct } from "@/utils/hooks/useProduct";

/**
 * ProductInitializer Component
 *
 * This component is responsible for initializing the product data when the application loads.
 * It uses the useProduct hook to trigger the initial loading of products.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to be rendered
 * @returns {React.ReactNode} The child components
 */
export default function ProductInitializer({ children }) {
  const { loadProducts } = useProduct();
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      // Initialize only once
      mounted.current = true;
      loadProducts();
    }
  }, [loadProducts]);

  // Render children without modifying them
  return <>{children}</>;
}
