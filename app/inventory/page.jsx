"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useProduct } from "@/utils/hooks/useProduct";
import InfoCards from "@/app/inventory/infoCards";
import LogoSpinner from "@/components/Spinners/LogoSpinner";
import { deleteProduct } from "@/utils/api/productService";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Plus } from "lucide-react";
import ProductDataGrid from "@/components/Inventory/ProductList/ProductDataGrid";
import CategoryFilter from "@/components/Inventory/Filters/CategoryFilter";
import ProductCardList from "@/components/Inventory/ProductList/ProductCardList";
import DeleteConfirmationDialog from "@/components/Inventory/Modals/DeleteConfirmationDialog";
import NotificationSnackbar from "@/components/Notifications/NotificationSnackbar";

/**
 * InventoryPage Component
 *
 * This component serves as the main inventory management page. It displays a list of products,
 * allows filtering by category, and provides functionality to add, edit, and delete products.
 * It now includes a responsive design for mobile devices, displaying products as cards.
 *
 * Features:
 * - Displays products in a DataGrid for larger screens
 * - Displays products as cards for mobile devices
 * - Filters products by category (Service or Retail)
 * - Allows adding new products
 * - Provides edit and delete functionality for existing products
 * - Shows loading spinner while data is being fetched
 * - Displays success/error messages using a Snackbar
 */
const InventoryPage = () => {
  const router = useRouter();
  const stickyHeaderRef = useRef(null);

  // Use the useProduct hook to access the Zustand store
  const {
    products,
    setProducts,
    loading,
    selectedCategory,
    setSelectedCategory,
    setIsNewProduct,
    setLoading,
    setError,
    snackbar,
    setSnackbar,
  } = useProduct();

  // Local state for delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});

  // Check if the screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle edit product
  const handleEdit = (id) => {
    setIsNewProduct(false);
    router.push(`/inventory/product/${id}`);
  };

  // Handle delete product
  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Handle delete confirmation
  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      setLoading(true);
      await deleteProduct(productToDelete);
      setProducts(products.filter((product) => product.id !== productToDelete));
      setSnackbar({
        open: true,
        message: "Product deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product");
      setSnackbar({
        open: true,
        message: "Failed to delete product",
        severity: "error",
      });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  // Handle add product
  const handleAddProduct = () => {
    router.push("/inventory/new-product");
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "Service") {
      return products.filter((product) => product.category_id === 1);
    } else if (selectedCategory === "Retail") {
      return products.filter((product) => product.category_id === 2);
    }
    return products;
  }, [products, selectedCategory]);

  // Prepare rows for DataGrid
  const rows = filteredProducts.map((product) => ({
    id: product.id,
    name: product.name,
    quantity_office_1: product.quantity_office_1,
    quantity_office_8: product.quantity_office_8,
    quantity_home: product.quantity_home,
    display_shelf: product.display_shelf,
    reorder_point: product.reorder_point,
    wholesale_price_per_unit: product.retail_price_per_unit,
    total_quantity: product.total_quantity,
    stock_wholesale_value: product.stock_retail_value,
    status: product.status,
  }));

  // Toggle card expansion - Mobile view
  const toggleCardExpansion = (productId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Render sticky header for mobile view
  const renderStickyHeader = () => (
    <div
      className="sticky z-40 bg-white shadow-md"
      style={{ top: "64px" }}
      ref={stickyHeaderRef}
    >
      <div className="flex items-center justify-between p-4">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
    </div>
  );

  // Handle closing the snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  // Render floating action button for mobile view
  const renderFAB = () => {
    if (!isMobile) return null;

    return (
      <button
        onClick={handleAddProduct}
        className="fixed z-50 flex items-center justify-center text-white transition-colors duration-300 bg-blue-500 rounded-full shadow-lg bottom-6 right-6 w-14 h-14 focus:outline-none hover:bg-blue-600"
        aria-label="Add New Product"
      >
        <Plus size={24} />
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        {/* Info Cards */}
        <InfoCards products={filteredProducts} />
      </div>
      {isMobile && renderStickyHeader()}
      <div className="flex-grow overflow-auto">
        <div className="px-4 pb-2 bg-white rounded-lg shadow">
          {/* Desktop View */}
          {!isMobile && (
            <div className="flex items-center justify-between h-16">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
              <button
                className="px-2 py-2 text-sm text-white transition-colors bg-green-500 rounded hover:bg-green-600"
                onClick={handleAddProduct}
              >
                New Product
              </button>
            </div>
          )}
          {loading ? (
            <div className="flex items-center justify-center flex-grow">
              <LogoSpinner />
            </div>
          ) : (
            <div className="flex-grow">
              {/* Card list for mobile */}
              {isMobile ? (
                <ProductCardList
                  products={filteredProducts}
                  expandedCards={expandedCards}
                  onToggleExpand={toggleCardExpansion}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              ) : (
                <ProductDataGrid
                  rows={rows}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      {renderFAB()}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
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

export default InventoryPage;
