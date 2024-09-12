"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import ProductForm from "@/components/Forms/ProductForm";
import { useProduct } from "@/utils/hooks/useProduct";
import { addProduct } from "@/utils/api/apiService";

/**
 * NewProductPage Component
 *
 * This component handles the creation of new products in the inventory system.
 * It renders a ProductForm and manages the submission process, including
 * adding the new product to the database and updating the global product state.
 *
 * The component uses the Zustand store through the useProduct hook for global state management
 * and Next.js routing for navigation.
 */
const NewProductPage = () => {
  // Initialize router for programmatic navigation
  const router = useRouter();

  // Destructure necessary functions and state from useProduct hook
  const { products, setProducts, setLoading, setError } = useProduct();

  /**
   * Handles the submission of the new product form
   *
   * @param {Object} productData - The data of the new product to be added
   */
  const handleFormSubmit = useCallback(
    async (productData) => {
      try {
        // Set loading state to true before API operations
        setLoading(true);

        // Add the new product to the database
        const newProduct = await addProduct(productData);

        // Update the global product state by adding the new product
        setProducts([...products, newProduct]);

        // Navigate back to the inventory page after successful addition
        router.push("/inventory");
      } catch (error) {
        console.error("Error adding new product:", error);
        // Set error in the global state
        setError("Failed to add new product. Please try again.");
        // Re-throw the error to be handled by the ProductForm component
        throw error;
      } finally {
        // Ensure loading state is set to false after operations complete
        setLoading(false);
      }
    },
    [setLoading, setProducts, setError, products, router]
  );

  /**
   * Handles the cancellation of the new product form
   * Navigates back to the inventory page without saving any data
   */
  const handleFormClose = useCallback(() => {
    router.push("/inventory");
  }, [router]);

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-8">
      <ProductForm
        onSubmit={handleFormSubmit}
        onCancel={handleFormClose}
        isNewProduct={true}
      />
    </div>
  );
};

export default NewProductPage;
