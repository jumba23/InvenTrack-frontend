//app/inventory/new-product/NewProductPage.jsx

"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { ProductForm } from "@/components/Forms/ProductForm";
import { useProduct } from "@/utils/hooks/useProduct";
import { addProduct } from "@/utils/api/productService";

/**
 * NewProductPage Component
 *
 * This component handles the creation of new products in the inventory system.
 * It renders a ProductForm that collects product details from the user and submits
 * them to the backend via an API call. It leverages Zustand for state management
 * and Next.js routing for navigation.
 *
 * Key Features:
 * - Collects product data from the user using ProductForm.
 * - Submits new product data to the backend and updates the global state.
 * - Displays success or error messages using Snackbar notifications.
 * - Navigates back to the inventory page after successful submission or cancellation.
 *
 * Best Practices Followed:
 * - Uses `useCallback` to prevent unnecessary re-renders.
 * - Manages state and API interactions cleanly with async/await.
 * - Proper error handling and user feedback with Snackbar.
 * - Leverages Zustand's state management for consistency across components.
 */

const NewProductPage = () => {
  const router = useRouter(); // Initialize router for navigation

  // Destructure necessary functions and state from Zustand's useProduct hook
  const { products, setProducts, setLoading, setError, setSnackbar } =
    useProduct();

  /**
   * Handles the submission of the new product form.
   * This function is responsible for adding the new product to the database
   * and updating the global state. It provides success and error feedback via Snackbar.
   *
   * @param {Object} productData - The data of the new product to be added.
   * @param {Function} setErrorMessage - Callback to handle error messages in the form component.
   */
  const handleFormSubmit = useCallback(
    async (productData, setErrorMessage) => {
      try {
        // Indicate loading state before starting the API call
        setLoading(true);

        // Make API call to add the new product
        const newProduct = await addProduct(productData, setErrorMessage);

        // Update Zustand state with the newly added product
        setProducts([...products, newProduct]);

        // Trigger success notification via Snackbar
        setSnackbar({
          open: true,
          message: "Product added successfully",
          severity: "success",
        });

        // Navigate back to the inventory page upon successful submission
        router.push("/inventory");
      } catch (error) {
        console.error("Error adding new product:", error);
        // Set error message for the form
        setErrorMessage("Failed to add new product.");

        // Trigger error notification via Snackbar
        setSnackbar({
          open: true,
          message: "Failed to add new product.",
          severity: "error",
        });

        // Set global error state (if necessary)
        setError("Failed to add new product. Please try again.");
      } finally {
        // Ensure loading state is reset after the operation
        setLoading(false);
      }
    },
    [setLoading, setProducts, setError, products, router, setSnackbar]
  );

  /**
   * Handles the cancellation of the product form by navigating back to the inventory page.
   * This ensures no data is saved when the user cancels the form.
   */
  const handleFormClose = useCallback(() => {
    router.push("/inventory");
  }, [router]);

  return (
    <>
      <ProductForm
        onSubmit={handleFormSubmit}
        onCancel={handleFormClose}
        isNewProduct={true}
      />
    </>
  );
};

export default NewProductPage;
