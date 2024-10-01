//app/suppliers/new-supplier/page.jsx

"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSupplier } from "@/utils/hooks/useSupplier";
import { SupplierForm } from "@/components/Forms/SupplierForm";
import { addSupplier } from "@/utils/api/supplierServices";

/**
 * NewSupplierPage Component
 *
 * This component handles the creation of new suppliers.
 * It renders a SupplierForm that collects supplier details from the user
 * and submits them to the backend via an API call.
 *
 * Key Features:
 * - Collects supplier data using SupplierForm.
 * - Submits new supplier data to the backend and updates the global state.
 * - Displays success or error messages using Snackbar notifications.
 */
/**
 * NewSupplierPage Component
 *
 * This component handles the creation of new suppliers in the application.
 * It renders a SupplierForm that collects supplier details from the user and submits
 * them to the backend via an API call. It leverages Zustand for state management
 * and Next.js routing for navigation.
 *
 * Key Features:
 * - Collects supplier data from the user using SupplierForm.
 * - Submits new supplier data to the backend and updates the global state.
 * - Displays success or error messages using Snackbar notifications.
 * - Navigates back to the suppliers list page after successful submission or cancellation.
 */
const NewSupplierPage = () => {
  const router = useRouter(); // Initialize router for navigation

  // Destructure necessary functions and state from Zustand's useSupplier hook
  const { suppliers, setSuppliers, setLoading, setError, setSnackbar } =
    useSupplier();

  /**
   * Handles the submission of the new supplier form.
   * This function is responsible for adding the new supplier to the database
   * and updating the global state. It provides success and error feedback via Snackbar.
   *
   * @param {Object} supplierData - The data of the new supplier to be added.
   * @param {Function} setErrorMessage - Callback to handle error messages in the form component.
   */
  const handleFormSubmit = useCallback(
    async (supplierData, setErrorMessage) => {
      try {
        // Indicate loading state before starting the API call
        setLoading(true);

        // Make API call to add the new supplier (assumed function similar to `addProduct`)
        const newSupplier = await addSupplier(supplierData, setErrorMessage);

        // Update Zustand state with the newly added supplier
        setSuppliers([...suppliers, newSupplier]);

        // Trigger success notification via Snackbar
        setSnackbar({
          open: true,
          message: "Supplier added successfully",
          severity: "success",
        });

        // Navigate back to the suppliers list page upon successful submission
        router.push("/suppliers");
      } catch (error) {
        console.error("Error adding new supplier:", error);
        // Set error message for the form
        setErrorMessage("Failed to add new supplier.");

        // Trigger error notification via Snackbar
        setSnackbar({
          open: true,
          message: "Failed to add new supplier.",
          severity: "error",
        });

        // Set global error state (if necessary)
        setError("Failed to add new supplier. Please try again.");
      } finally {
        // Ensure loading state is reset after the operation
        setLoading(false);
      }
    },
    [setLoading, setSuppliers, setError, suppliers, router, setSnackbar]
  );

  /**
   * Handles the cancellation of the supplier form by navigating back to the suppliers list page.
   * This ensures no data is saved when the user cancels the form.
   */
  const handleFormClose = useCallback(() => {
    router.push("/suppliers");
  }, [router]);

  return (
    <>
      <SupplierForm
        onSubmit={handleFormSubmit}
        onCancel={handleFormClose}
        isNewSupplier={true} // This indicates the form is for creating a new supplier
      />
    </>
  );
};

export default NewSupplierPage;
