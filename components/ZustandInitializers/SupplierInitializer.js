// components/ZustandInitializers/SupplierInitializer.js

"use client";

import { useEffect } from "react";
import { useSupplier } from "@/utils/hooks/useSupplier";

/**
 * SupplierInitializer Component
 *
 * This component is responsible for initializing the supplier data when the application loads.
 * It uses the useSupplier hook to trigger the initial loading of suppliers.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to be rendered
 * @returns {React.ReactNode} The child components
 */
export default function SupplierInitializer({ children }) {
  const { loadSuppliers } = useSupplier();

  useEffect(() => {
    // Trigger initial supplier loading when the component mounts
    loadSuppliers();
  }, [loadSuppliers]);

  // Render children without modifying them
  return <>{children}</>;
}
