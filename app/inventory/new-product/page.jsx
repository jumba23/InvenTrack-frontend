"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import ProductForm from "@/components/Forms/ProductForm";
import { useProduct } from "@/utils/hooks/useProduct";
import { addProduct } from "@/utils/api/apiService";
import ErrorDisplay from "@/components/ErrorDisplay/ErrorDisplay";
import { ErrorTypes } from "@/utils/errorHandling/errorTypes";

/**
 * NewProductPage Component
 *
 * This component handles the creation of new products in the inventory system.
 * It renders a ProductForm and manages the submission process, including
 * adding the new product to the database and updating the global product state.
 *
 * The component uses the Zustand store through the useProduct hook for global state management
 * and Next.js routing for navigation. It also implements enhanced error handling.
 */
const NewProductPage = () => {
  const router = useRouter();
  const { products, setProducts, setLoading } = useProduct();
  const [error, setError] = useState(null);

  /**
   * Handles the submission of the new product form
   *
   * @param {Object} productData - The data of the new product to be added
   */
  const handleFormSubmit = useCallback(
    async (productData) => {
      setLoading(true);
      setError(null);
      try {
        const newProduct = await addProduct(productData);
        setProducts([...products, newProduct]); // Update the global product state by adding the new product
        router.push("/inventory");
      } catch (error) {
        console.error("Error adding new product:", error);
        // Set error in the global state
        setError({
          type: error.type || ErrorTypes.API_ERROR,
          message:
            error.message || "Failed to add new product. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setProducts, products, router]
  );

  /**
   * Handles the cancellation of the new product form
   * Navigates back to the inventory page without saving any data
   */
  const handleFormClose = useCallback(() => {
    router.push("/inventory");
  }, [router]);

  /**
   * Handles retry action when an error occurs
   */
  const handleRetry = useCallback(() => {
    setError(null);
  }, []);

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-8">
      {error ? (
        <ErrorDisplay error={error} onRetry={handleRetry} />
      ) : (
        <ProductForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
          isNewProduct={true}
        />
      )}
    </div>
  );
};

export default NewProductPage;
