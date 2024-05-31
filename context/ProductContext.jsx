"use client";
// use client indicates this module is intended for client-side usage only.

import React, { createContext, useContext, useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { fetchProducts } from "@/utils/api/apiService";

// /** ======================================== SUMMARY ========================================

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

export function useProduct() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const router = useRouter();

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

  console.log("ProductProvider value: ", value);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
