// EditProductPage.jsx
"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import ProductForm from "@/components/Forms/ProductForm";
import { useProduct } from "@/context/ProductContext";
import {
  fetchProductById,
  updateProduct,
  fetchProducts,
} from "@/utils/api/apiService";

/**
 * EditProductPage Component
 *
 * This component handles the editing of existing products. It fetches the product data,
 * renders the ProductForm with the current data, and processes form submissions.
 * It implements partial updates by only sending changed fields to the server.
 */
const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const { setProducts, setLoading } = useProduct();
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Fetches the product data when the component mounts or the product ID changes
   */
  useEffect(() => {
    const loadProductData = async () => {
      if (!params.id) {
        setError("Product ID is missing");
        return;
      }

      try {
        setLoading(true);
        const data = await fetchProductById(params.id);
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Failed to load product data. Please try again.");
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
        throw new Error("Product ID is missing");
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

      try {
        setLoading(true);
        await updateProduct(params.id, changedFields);
        const updatedProducts = await fetchProducts();
        setProducts(updatedProducts);
        router.push("/inventory");
      } catch (error) {
        console.error("Error updating product:", error);
        throw new Error("Failed to update product. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [params.id, productData, router, setLoading, setProducts]
  );

  /**
   * Handles cancellation of the form edit
   */
  const handleFormClose = useCallback(() => {
    router.push("/inventory");
  }, [router]);

  // Render error message if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Show loading state while fetching product data
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