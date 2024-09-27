"use client";

import React, { useEffect, useMemo, useState } from "react";
import useSupplierStore from "@/stores/supplierStore";
import SupplierCardList from "@/components/Suppliers/SupplierList/SupplierCardList";
import SupplierDataGrid from "@/components/Suppliers/SupplierList/SupplierDataGrid";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mui/material";
import NotificationSnackbar from "@/components/Notifications/NotificationSnackbar";
import { useRef } from "react";

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
  const { suppliers } = useSupplierStore();
  const [expandedCards, setExpandedCards] = useState({});
  const observerRef = useRef(null); // Ref to detect scrolling to the bottom

  // Using useMediaQuery to detect if the screen size is mobile or desktop
  const isMobile = useMediaQuery("(max-width: 768px)");

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

  // Prepare rows for the DataGrid (for desktop view)
  const rows = useMemo(
    () =>
      suppliers.map((supplier) => ({
        id: supplier.id,
        name: supplier.name,
        contact_person: supplier.contact_person,
        phone: supplier.phone,
        total_quantity: supplier.total_quantity,
        stock_wholesale_value: supplier.stock_wholesale_value,
        stock_retail_value: supplier.stock_retail_value,
      })),
    [suppliers]
  );

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
  // const handleCloseSnackbar = (event, reason) => {
  //   if (reason === "clickaway") return;
  //   setSnackbar({ open: false, message: "", severity: "success" });
  // };

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

          {/* Render Cards for Mobile View */}
          {isMobile ? (
            <div className="h-full overflow-y-auto">
              <SupplierCardList
                suppliers={suppliers}
                expandedCards={expandedCards}
                onToggleExpand={toggleCardExpansion}
              />
            </div>
          ) : (
            /* Render DataGrid for Desktop View */
            <div className="p-4">
              <SupplierDataGrid rows={rows} />
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      {renderFAB()}
    </div>
  );
};

export default SuppliersPage;
