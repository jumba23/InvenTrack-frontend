"use client";
// use client indicates this module is intended for client-side usage only.

import React, { createContext, useContext, useState, useEffect } from "react";

import { useRouter } from "next/navigation";

// /** ======================================== SUMMARY ========================================

export function useAuth() {
  return useContext(ProductProvider);
}

export function ProductProvider({ children }) {
  const router = useRouter();

  // Create product provider context that keeps track of the product state
  const ProductContext = createContext({
    products: [],
    loading: true,
    error: "",
    selectedCategory: "Service",
    renderForm: false,
    setProducts: () => {},
    setLoading: () => {},
    setError: () => {},
    setSelectedCategory: () => {},
    setRenderForm: () => {},
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Service");
  const [renderForm, setRenderForm] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      });
  }, []);

  const value = {
    products,
    loading,
    error,
    selectedCategory,
    renderForm,
    setProducts,
    setLoading,
    setError,
    setSelectedCategory,
    setRenderForm,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
