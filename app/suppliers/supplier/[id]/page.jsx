//app/suppliers/supplier/[id]/page.jsx

"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { SupplierForm } from "@/components/Forms/SupplierForm";
import { useSupplier } from "@/utils/hooks/useSupplier";
import {
  fetchSupplierById,
  updateSupplier,
} from "@/utils/api/supplierServices";
import { Snackbar, Alert } from "@mui/material";
import Spinner from "@/components/Spinners/Spinner";

/**
 * EditSupplierPage Component
 *
 * This component handles editing an existing supplier. It fetches the current supplier data
 * based on the supplier ID from the URL and renders the SupplierForm component for the user to update the supplier.
 */
const EditSupplierPage = () => {
  const router = useRouter();
  const params = useParams();
  const {
    suppliers,
    setSuppliers,
    setSnackbar,
    loading,
    setLoading,
    setError,
    snackbar,
  } = useSupplier();
  const [supplierData, setSupplierData] = useState(null);
  const [isFetched, setIsFetched] = useState(false);

  /**
   * Fetches the supplier data when the component mounts or the supplier ID changes.
   * Ensures the supplier data is only fetched once (controlled by `isFetched`).
   */
  useEffect(() => {
    const loadSupplierData = async () => {
      if (!params.id || isFetched) return; // Avoid fetching if ID is missing or already fetched

      try {
        setLoading(true);
        const data = await fetchSupplierById(params.id);
        setSupplierData(data);
        setIsFetched(true); // Mark as fetched to avoid re-fetching
      } catch (error) {
        console.error("Error fetching supplier data:", error);
        setError("Failed to load supplier data. Please try again.");
        setSnackbar({
          open: true,
          message: "Failed to load supplier data.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    loadSupplierData();
  }, [params.id, isFetched, setLoading, setError, setSnackbar]);

  /**
   * Handles the form submission for updating a supplier.
   * Only fields that have changed compared to the initial data are sent in the API request.
   *
   * @param {Object} updatedData - The updated product data from the form.
   * @param {Function} setErrorMessage - Function to set the error message in case of failure.
   */
  const handleFormSubmit = useCallback(
    async (updatedData, setErrorMessage) => {
      if (!params.id) {
        setErrorMessage("Supplier ID is missing.");
        return;
      }

      // Determine which fields have changed
      const changedFields = Object.keys(updatedData).reduce((acc, key) => {
        if (
          JSON.stringify(updatedData[key]) !== JSON.stringify(supplierData[key])
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
        await updateSupplier(params.id, changedFields, setErrorMessage);

        // Update the product in the local state
        setSuppliers(
          suppliers.map((supplier) =>
            supplier.id === params.id
              ? { ...supplier, ...changedFields }
              : supplier
          )
        );

        // Notify the user of success and redirect to the inventory page
        setSnackbar({
          open: true,
          message: "Supplier updated successfully.",
          severity: "success",
        });
        router.push("/suppliers");
      } catch (error) {
        console.error("Error updating supplier:", error);
        setErrorMessage("Failed to update supplier.");

        // Show an error notification in case of failure
        setSnackbar({
          open: true,
          message: "Failed to update supplier. Please try again.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    },
    [
      params.id,
      supplierData,
      router,
      setLoading,
      setSuppliers,
      suppliers,
      setSnackbar,
    ]
  );

  /**
   * Handles cancellation of the form by redirecting to the inventory page.
   */
  const handleFormClose = useCallback(() => {
    router.push("/suppliers");
  }, [router]);

  // Show loading spinner while fetching product data
  if (loading) return <Spinner />;

  // If no product data, don't render the form
  if (!supplierData) return null;

  // Snackbar for success and error messages
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  return (
    <>
      <SupplierForm
        initialData={supplierData}
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

export default EditSupplierPage;
