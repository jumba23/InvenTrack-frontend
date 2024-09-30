"use client";

import React, { useEffect, useMemo, useState } from "react";
import SupplierCardList from "@/components/Suppliers/SupplierList/SupplierCardList";
import SupplierDataGrid from "@/components/Suppliers/SupplierList/SupplierDataGrid";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mui/material";
import NotificationSnackbar from "@/components/Notifications/NotificationSnackbar";
import SupplierDeleteConfirmationDialog from "@/components/Suppliers/Modals/SupplierDeleteConfirmationDialog";
import { useSupplier } from "@/utils/hooks/useSupplier";
import { deleteSupplier } from "@/utils/api/supplierServices";
import LogoSpinner from "@/components/Spinners/LogoSpinner";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

/**
 *  SuppliersPage Component
 *
 * This component is responsible for rendering the Suppliers page.
 * It fetches supplier data and renders it in a list or grid format based on the screen size.
 * It also provides a floating action button (FAB) for adding new suppliers on mobile.
 *
 */

const SuppliersPage = () => {
  const router = useRouter();

  // Use the useSupplier hook to access the Zustand store
  const {
    suppliers,
    setIsNewSupplier,
    setSuppliers,
    setLoading,
    loading,
    setError,
    snackbar,
    setSnackbar,
  } = useSupplier();

  // Local state for delete confirmation dialog
  const [expandedCards, setExpandedCards] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [supplierName, setSupplierName] = useState("");
  const [supplierToDeleteId, setSupplierToDeleteId] = useState(null);

  // Using useMediaQuery to detect if the screen size is mobile or desktop
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Handle edit product
  const handleEdit = (id) => {
    setIsNewSupplier(false);
    router.push(`/suppliers/supplier/${id}`);
  };

  // Handle delete product
  const handleDeleteClick = (id) => {
    setSupplierToDeleteId(id);
    const supplierName = suppliers.find((supplier) => supplier.id === id);
    setSupplierName(supplierName.name);
    setDeleteDialogOpen(true);
  };

  // Handle delete confirmation
  const handleDelete = async () => {
    if (!supplierToDeleteId) return;

    try {
      setLoading(true);
      await deleteSupplier(supplierToDeleteId);
      setSuppliers(
        suppliers.filter((supplier) => supplier.id !== supplierToDeleteId)
      );
      setSnackbar({
        open: true,
        message: "Supplier deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting supplier:", error);
      setError("Failed to delete supplier");
      setSnackbar({
        open: true,
        message: "Failed to delete suppler",
        severity: "error",
      });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setSupplierToDeleteId(null);
    }
  };

  // Handle adding a new supplier
  const handleAddSupplier = () => {
    router.push("/suppliers/new-supplier");
  };

  // Toggle card expansion for mobile view
  const toggleCardExpansion = (supplierId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [supplierId]: !prev[supplierId],
    }));
  };

  /**
   * Prepare the rows for the DataGrid (for desktop view).
   *
   * 1. We use `useMemo` to optimize performance by memoizing the computed `rows` array.
   * 2. The dependency array `[suppliers]` ensures that `rows` is only recomputed when the `suppliers` state changes.
   * 3. This avoids unnecessary recomputation and renders, enhancing the efficiency of the component.
   *
   * `suppliers.map(...)` iterates over each supplier in the array and constructs a new object for each row
   * with specific properties required by the DataGrid:
   *   - `id`: A unique identifier for each row, which is crucial for the DataGrid to identify each row element.
   *   - Other properties like `name`, `contact_person`, `phone`, etc., which will be displayed in the DataGrid columns.
   */
  const rows = useMemo(
    () =>
      suppliers.map((supplier, index) => ({
        id: supplier.id, // Unique ID of each supplier (must be present and unique for each row).
        name: supplier.name,
        contact_person: supplier.contact_person,
        phone: formatPhoneNumber(supplier.phone),
        total_quantity: supplier.total_quantity,
        stock_wholesale_value: supplier.stock_wholesale_value,
        stock_retail_value: supplier.stock_retail_value,
      })),
    [suppliers] // Recompute rows only if the `suppliers` array changes.
  );

  /**
   * Filter out rows that do not have a valid `id`.
   *
   * 1. The `filteredRows` is also memoized using `useMemo`, with `rows` as its dependency.
   *    This ensures that `filteredRows` is only recomputed when the `rows` array changes, avoiding unnecessary re-renders.
   *
   * 2. The `.filter(row => row.id)` function is used to ensure that only rows with a valid `id` are included in the final array.
   *
   * Why is this necessary?
   * - The DataGrid component requires that each row has a unique and valid `id` property.
   * - During some state transitions or updates, there might be cases where some rows are temporarily incomplete
   *   (e.g., missing `id` due to asynchronous updates or partially populated data).
   * - This `filter` step prevents such incomplete rows from being passed to the DataGrid, which could otherwise cause errors.
   * - By using `filter`, we ensure that the DataGrid only receives well-formed rows, preventing runtime errors.
   */
  const filteredRows = useMemo(() => {
    return rows.filter((row) => row.id); // Filter out any rows that do not have a valid `id` property.
  }, [rows]); // Recompute `filteredRows` only if `rows` changes.

  /**
   * Filter the suppliers to ensure only valid suppliers are displayed in the card list.
   * Similar to the filteredRows logic, we want to ensure that only suppliers with valid `id` and necessary properties are shown.
   */
  const filteredSuppliers = useMemo(() => {
    return suppliers
      .filter((supplier) => supplier.id && supplier.name)
      .map((supplier) => ({
        ...supplier,
        phone: formatPhoneNumber(supplier.phone),
      }));
  }, [suppliers]);

  // Render floating action button (FAB) for mobile
  const renderFAB = () => {
    if (!isMobile) return null;

    return (
      <button
        onClick={handleAddSupplier}
        className="fixed z-50 flex items-center justify-center text-white transition-colors duration-300 bg-blue-500 rounded-full shadow-lg bottom-6 right-6 w-14 h-14 focus:outline-none hover:bg-blue-600"
        aria-label="Add New Supplier"
      >
        <Plus size={24} />
      </button>
    );
  };

  // Handle closing the snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-col flex-grow h-full overflow-hidden">
        <div className="flex-grow h-full bg-white rounded-lg shadow">
          {/* Desktop Add Supplier Button */}
          {!isMobile && (
            <div className="flex justify-end pt-4 pr-4 overflow-auto">
              <button
                onClick={handleAddSupplier}
                className="px-2 py-2 text-sm text-white transition-colors bg-green-500 rounded hover:bg-green-600"
              >
                Add Supplier
              </button>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center flex-grow">
              <LogoSpinner />
            </div>
          )}

          {/* Render Cards for Mobile View */}
          {isMobile ? (
            <div className="h-full overflow-y-auto">
              <SupplierCardList
                suppliers={filteredSuppliers}
                expandedCards={expandedCards}
                onToggleExpand={toggleCardExpansion}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            </div>
          ) : (
            /* Render DataGrid for Desktop View */
            <div className="p-4">
              <SupplierDataGrid
                rows={filteredRows}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      {renderFAB()}

      {/* Delete Confirmation Dialog */}
      <SupplierDeleteConfirmationDialog
        open={deleteDialogOpen}
        supplierName={supplierName}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />

      {/* Notification Snackbar */}
      <NotificationSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
};

export default SuppliersPage;
