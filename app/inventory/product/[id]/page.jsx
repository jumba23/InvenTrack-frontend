"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import ProductForm from "@/components/Forms/ProductForm";
import { useProduct } from "@/utils/hooks/useProduct";
import { fetchProductById, updateProduct } from "@/utils/api/apiService";
import ErrorDisplay from "@/components/ErrorDisplay/ErrorDisplay";
import { ErrorTypes } from "@/utils/errorHandling/errorTypes";

/**
 * EditProductPage Component
 *
 * This component handles the editing of existing products. It fetches the product data,
 * renders the ProductForm with the current data, and processes form submissions.
 * It implements partial updates by only sending changed fields to the server.
 * It also includes enhanced error handling for various scenarios.
 */
const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const { products, setProducts, setLoading } = useProduct();
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Fetches the product data when the component mounts or the product ID changes
   */
  useEffect(() => {
    const loadProductData = async () => {
      if (!params.id) {
        setError({
          type: ErrorTypes.VALIDATION_ERROR,
          message: "Product ID is missing",
        });
        return;
      }

      setLoading(true);
      try {
        const data = await fetchProductById(params.id);
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError({
          type: error.type || ErrorTypes.API_ERROR,
          message:
            error.message || "Failed to load product data. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
  }, [params.id, setLoading]);

  /**
   * Handles form submission for updating a product
   * @param {Object} updatedData - The updated product data from the form
   */
  const handleFormSubmit = useCallback(
    async (updatedData) => {
      if (!params.id) {
        setError({
          type: ErrorTypes.VALIDATION_ERROR,
          message: "Product ID is missing",
        });
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

      // If no fields have changed, don't make an API call
      if (Object.keys(changedFields).length === 0) {
        console.log("No fields changed, skipping update");
        router.push("/inventory");
        return;
      }

      setLoading(true);
      setError(null);
      try {
        await updateProduct(params.id, changedFields);
        // Update the product in the local state
        const updatedProducts = products.map((product) =>
          product.id === params.id ? { ...product, ...changedFields } : product
        );
        setProducts(updatedProducts);
        router.push("/inventory");
      } catch (error) {
        console.error("Error updating product:", error);
        setError({
          type: error.type || ErrorTypes.API_ERROR,
          message:
            error.message || "Failed to update product. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    },
    [params.id, productData, router, setLoading, setProducts, products]
  );

  /**
   * Handles cancellation of the form edit
   */
  const handleFormClose = useCallback(() => {
    router.push("/inventory");
  }, [router]);

  /**
   * Handles retry action when an error occurs
   */
  const handleRetry = useCallback(() => {
    setError(null);
    if (!productData) {
      router.refresh(); // Refresh the page to re-fetch product data
    }
  }, [productData, router]);

  if (error) {
    return <ErrorDisplay error={error} onRetry={handleRetry} />;
  }

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <ProductForm
      initialData={productData}
      onSubmit={handleFormSubmit}
      onCancel={handleFormClose}
      isNewProduct={false}
    />
  );
};

export default EditProductPage;
