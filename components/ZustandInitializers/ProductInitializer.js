"use client";

import { useEffect } from "react";
import { useProduct } from "@/utils/hooks/useProduct";

export default function ProductInitializer({ children }) {
  const { loadProducts } = useProduct();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return <>{children}</>;
}
