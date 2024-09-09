"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { fetchProducts } from "@/utils/api/apiService";
import { useAuth } from "@/context/AuthContext"; // Import useAuth hook

/**
 * ProductContext and Provider
 *
 * This module defines the ProductContext and ProductProvider for the application.
 * It manages the state related to products, including product data, loading state,
 * error handling, and category selection.
 *
 * Key features:
 * - Manages product state and related functions
 * - Implements product preloading after authentication
 * - Provides functions for product CRUD operations
 * - Allows category selection and form rendering control
 *
 * Usage:
 * - Wrap the application or relevant part of the component tree with ProductProvider
 * - Use the useProduct hook to access product state and functions in child components
 */

const ProductContext = createContext({
  products: [],
  loading: true,
  error: "",
  selectedCategory: "Service",
  renderForm: false,
  isNewProduct: true,
  setProducts: () => {},
  setLoading: () => {},
  setError: () => {},
  setSelectedCategory: () => {},
  setRenderForm: () => {},
  setIsNewProduct: () => {},
  loadProducts: () => {},
});

export function useProduct() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const router = useRouter();
  const { authState } = useAuth(); // Get auth state

  const [products, setProducts] = useState([]);
  const [isNewProduct, setIsNewProduct] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Service");
  const [renderForm, setRenderForm] = useState(false);

  const loadProducts = useCallback(async () => {
    if (!authState.isAuthenticated) return;
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
      setError("");
    } catch (error) {
      console.error("Failed to load products:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [authState.isAuthenticated]);

  // Effect to load products when authenticated
  useEffect(() => {
    if (authState.isAuthenticated) {
      loadProducts();
    }
  }, [authState.isAuthenticated, loadProducts]);

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      products,
      loading,
      error,
      selectedCategory,
      renderForm,
      isNewProduct,
      setProducts,
      setLoading,
      setError,
      setSelectedCategory,
      setRenderForm,
      setIsNewProduct,
      loadProducts,
    }),
    [
      products,
      loading,
      error,
      selectedCategory,
      renderForm,
      isNewProduct,
      loadProducts,
    ]
  );

  console.log("ProductContext value:", contextValue);

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}
