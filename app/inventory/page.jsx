// InventoryPage.jsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useProduct } from "@/utils/hooks/useProduct";
import InfoCards from "@/app/inventory/infoCards";
import LogoSpinner from "@/components/Spinners/LogoSpinner";
import { deleteProduct } from "@/utils/api/productService";
import { Snackbar, Alert } from "@mui/material";
import CategoryFilter from "@/components/Inventory/CategoryFilter";
import ProductTable from "@/components/Inventory/ProductTable";
import ProductCardList from "@/components/Inventory/ProductCardList";
import DeleteConfirmationDialog from "@/components/Inventory/DeleteConfirmationDialog";
import AddProductButton from "@/components/Buttons/AddProductButton";

/**
 * InventoryPage Component
 *
 * This component serves as the main inventory management page. It orchestrates
 * the display of products, category filtering, and product management actions.
 *
 * Features:
 * - Displays summary info cards
 * - Allows filtering products by category
 * - Shows products in a table (desktop) or card list (mobile)
 * - Provides add, edit, and delete functionality for products
 * - Handles loading states and error messages
 */
const InventoryPage = () => {
  const router = useRouter();
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

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "Service") {
      return products.filter((product) => product.category_id === 1);
    } else if (selectedCategory === "Retail") {
      return products.filter((product) => product.category_id === 2);
    }
    return products;
  }, [products, selectedCategory]);

  const handleEdit = (id) => {
    setIsNewProduct(false);
    router.push(`/inventory/product/${id}`);
  };

  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  };

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

  const handleAddProduct = () => router.push("/inventory/new-product");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        <InfoCards products={filteredProducts} />
      </div>
      <div className="flex-grow overflow-auto">
        <div className="px-4 pb-2 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between h-16 ">
            <div className="flex items-center space-x-2">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                isMobile={isMobile}
              />
              <AddProductButton
                onClick={handleAddProduct}
                isMobile={isMobile}
              />
            </div>
          </div>
          {loading ? (
            <div className="flex items-center justify-center flex-grow">
              <LogoSpinner />
            </div>
          ) : (
            <>
              {isMobile ? (
                <ProductCardList
                  products={filteredProducts}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              ) : (
                <ProductTable
                  products={filteredProducts}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              )}
            </>
          )}
        </div>
      </div>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
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
    </div>
  );
};

export default InventoryPage;
