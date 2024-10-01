//app/inventory/product/[id]/page.jsx

"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { ProductForm } from "@/components/Forms/ProductForm";
import { useProduct } from "@/utils/hooks/useProduct";
import { fetchProductById, updateProduct } from "@/utils/api/productService";
import { Snackbar, Alert } from "@mui/material";
import Spinner from "@/components/Spinners/Spinner";

/**
 * EditProductPage Component
 *
 * This component handles editing an existing product. It fetches the current product data based
 * on the product ID from the URL and renders the ProductForm component for the user to update the product.
 * Upon form submission, it only updates the fields that have changed.
 *
 * The component manages the following key behaviors:
 * - Fetch product data when the page loads or when the product ID changes.
 * - Handle form submission, only sending changed fields to the server.
 * - Display a success or error message using Snackbar after an update attempt.
 * - Prevents form re-render or data refetch after a failed API request to ensure better UX.
 *
 * Features:
 * - Product data loading using Zustand store (`useProduct` hook).
 * - Conditional rendering for loading and error states.
 * - Snackbar notifications for success and failure states.
 * - Next.js routing for navigation upon form submission or cancellation.
 */

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const {
    products,
    setProducts,
    loading,
    setLoading,
    setError,
    snackbar,
    setSnackbar,
  } = useProduct();
  const [productData, setProductData] = useState(null);
  const [isFetched, setIsFetched] = useState(false);

  /**
   * Fetches the product data when the component mounts or the product ID changes.
   * Ensures the product data is only fetched once (controlled by `isFetched`).
   */
  useEffect(() => {
    const loadProductData = async () => {
      if (!params.id || isFetched) return; // Avoid fetching if ID is missing or already fetched

      try {
        setLoading(true);
        const data = await fetchProductById(params.id);
        setProductData(data);
        setIsFetched(true); // Mark as fetched to avoid re-fetching
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Failed to load product data. Please try again.");
        setSnackbar({
          open: true,
          message: "Failed to load product data.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
  }, [params.id, isFetched, setLoading, setError, setSnackbar]);

  /**
   * Handles the form submission for updating a product.
   * Only fields that have changed compared to the initial data are sent in the API request.
   *
   * @param {Object} updatedData - The updated product data from the form.
   * @param {Function} setErrorMessage - Function to set the error message in case of failure.
   */
  const handleFormSubmit = useCallback(
    async (updatedData, setErrorMessage) => {
      if (!params.id) {
        setErrorMessage("Product ID is missing.");
        return;
      }

      // Determine which fields have changed
      const changedFields = Object.keys(updatedData).reduce((acc, key) => {
        if (
          JSON.stringify(updatedData[key]) !== JSON.stringify(productData[key])
        ) {
          acc[key] = updatedData[key];
        }
        return acc;
      }, {});

      // If no fields have changed, notify and skip the update
      if (Object.keys(changedFields).length === 0) {
        setSnackbar({
          open: true,
          message: "No changes made.",
          severity: "info",
        });
        return;
      }

      try {
        setLoading(true);

        // Call the API to update the product
        await updateProduct(params.id, changedFields, setErrorMessage);

        // Update the product in the local state
        setProducts(
          products.map((product) =>
            product.id === params.id
              ? { ...product, ...changedFields }
              : product
          )
        );

        // Notify the user of success and redirect to the inventory page
        setSnackbar({
          open: true,
          message: "Product updated successfully.",
          severity: "success",
        });
        router.push("/inventory");
      } catch (error) {
        console.error("Error updating product:", error);
        setErrorMessage("Failed to update product.");

        // Show an error notification in case of failure
        setSnackbar({
          open: true,
          message: "Failed to update product. Please try again.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    },
    [
      params.id,
      productData,
      router,
      setLoading,
      setProducts,
      products,
      setSnackbar,
    ]
  );

  /**
   * Handles cancellation of the form by redirecting to the inventory page.
   */
  const handleFormClose = useCallback(() => {
    router.push("/inventory");
  }, [router]);

  // Show loading spinner while fetching product data
  if (loading) return <Spinner />;

  // If no product data, don't render the form
  if (!productData) return null;

  // Snackbar for success and error messages
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  return (
    <>
      <ProductForm
        initialData={productData}
        onSubmit={handleFormSubmit}
        onCancel={handleFormClose}
        isNewProduct={false}
      />

      {/* Snackbar to display success or error messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditProductPage;
