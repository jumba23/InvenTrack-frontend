"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSupplierStore } from "@/stores/supplierStore";
import SupplierForm from "@/components/Forms/SupplierForm";
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
  const { suppliers, setSuppliers, setSnackbar } = useSupplierStore();
  const [supplierData, setSupplierData] = useState(null);

  // Load supplier data based on ID
  useEffect(() => {
    const supplier = suppliers.find((sup) => sup.id === Number(params.id));
    if (supplier) {
      setSupplierData(supplier);
    }
  }, [params.id, suppliers]);

  // Handle form submission for updating supplier
  const handleFormSubmit = useCallback(
    (updatedData) => {
      const updatedSuppliers = suppliers.map((sup) =>
        sup.id === supplierData.id ? { ...sup, ...updatedData } : sup
      );
      setSuppliers(updatedSuppliers);

      // Show success message
      setSnackbar({
        open: true,
        message: "Supplier updated successfully",
        severity: "success",
      });

      // Redirect to supplier list page
      router.push("/suppliers");
    },
    [supplierData, suppliers, setSuppliers, setSnackbar, router]
  );

  // Handle form cancellation
  const handleFormCancel = useCallback(() => {
    router.push("/suppliers");
  }, [router]);

  if (!supplierData) return <Spinner />; // Show spinner while loading

  return (
    <SupplierForm
      initialData={supplierData}
      onSubmit={handleFormSubmit}
      onCancel={handleFormCancel}
      isNewSupplier={false}
    />
  );
};

export default EditSupplierPage;
