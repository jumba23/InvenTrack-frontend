"use client";
// use client indicates this module is intended for client-side usage only.

import React, { createContext, useContext, useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { fetchProducts } from "@/utils/api/apiService";

/** ======================================== SUMMARY ========================================
  * ProductProvider acts as the context provider for the application's product state.
  * It initializes and manages the state related to products, including the product data,
  * loading state during data fetching, and the selected product category.
  * The component also encapsulates the logic for fetching products and setting the selected category.
  
  * Functionality:
  * - Upon mounting, it fetches the product data from the API and updates the product state.
  * - It provides functions to set the product data, loading state, error state, and selected category.
  * - It makes the product state and functions available to the entire application via the ProductContext.Provider.
  * 
  * The ProductProvider is crucial for maintaining a consistent product experience throughout the application.
  * It leverages React's Context API to allow child components to consume product state and functionalities easily.
  * 
  * Usage:
  * - Wrap the application's component tree with ProductProvider to provide a global product context.
  * - Access the product state and functions using the 'useProduct' hook within any child component.
  * ===========================================================================================
 */

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

// Custom hook to access the product context
export function useProduct() {
  return useContext(ProductContext);
}

// Product provider component that wraps the application to provide product context
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

  // console.log("ProductProvider value: ", value);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
