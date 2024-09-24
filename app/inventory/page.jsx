"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useProduct } from "@/utils/hooks/useProduct";
import InfoCards from "@/app/inventory/infoCards";
import LogoSpinner from "@/components/Spinners/LogoSpinner";
import { deleteProduct } from "@/utils/api/productService";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
  Pagination,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import ProductCard from "@/components/Cards/ProductCard";
import { Plus } from "lucide-react";

const ITEMS_PER_PAGE = 20;

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

  const handleAddProduct = () => {
    router.push("/inventory/new-product");
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  // Define columns for DataGrid
  const columns = [
    {
      field: "name",
      headerName: "Product",
      width: 120,
      flex: 1,
    },
    {
      field: "total_quantity",
      headerName: "Total Units",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status", // New column for status (Levels)
      headerName: "Levels",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        let statusClass = ""; // Define a class to color the status
        let statusText = ""; // Define text representation

        // Conditional classes based on status
        if (params.row.status === "out") {
          statusClass = "bg-red-500 text-white"; // Red for 'out'
          statusText = "Out of Stock";
        } else if (params.row.status === "low") {
          statusClass = "bg-yellow-500 text-black"; // Yellow for 'low'
          statusText = "Low Stock";
        } else if (params.row.status === "normal") {
          statusClass = "bg-green-500 text-white"; // Green for 'normal'
          statusText = "In Stock";
        }

        return (
          <span
            className={`px-3 py-1 rounded-full font-bold text-xs ${statusClass}`}
          >
            {statusText}
          </span>
        );
      },
    },
    {
      field: "quantity_office_1", // New column for Office 1
      headerName: "Office 1",
      width: 80,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "quantity_office_8", // New column for Office 8
      headerName: "Office 8",
      width: 80,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "quantity_home", // New column for Home
      headerName: "Home",
      width: 80,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "display_shelf", // New column for Home
      headerName: "Shelf",
      width: 80,
      align: "center",
      headerAlign: "center",
    },
    // {
    //   field: "wholesale_price_per_unit", // Updated column, swapping with Selling Price
    //   headerName: "Wholesale Price",
    //   width: 120,
    //   align: "center",
    //   headerAlign: "center",
    //   valueFormatter: ({ value }) => `$${value.toFixed(2)}`, // Added proper null check
    // },

    {
      field: "reorder_point",
      headerName: "Reorder at",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "stock_wholesale_value", // Use stock_retail_value directly from the database
      headerName: "Wholesale Value",
      width: 140,
      align: "center",
      headerAlign: "center",
      valueFormatter: ({ value }) => `$${value.toFixed(2)}`, // Format stock_retail_value as currency
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex justify-center space-x-2">
          <button
            className="px-3 py-1 text-xs text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => handleEdit(params.row.id)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 text-xs text-white transition-colors bg-red-500 rounded hover:bg-red-600"
            onClick={() => handleDeleteClick(params.row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "Service") {
      return products.filter((product) => product.category_id === 1);
    } else if (selectedCategory === "Retail") {
      return products.filter((product) => product.category_id === 2);
    }
    return products;
  }, [products, selectedCategory]);

  // Calculate total number of pages
  const pageCount = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

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

  const toggleCardExpansion = (productId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Render product cards for mobile devices
  const renderProductCards = () => (
    <div className="pb-20 mt-4">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          expanded={expandedCards[product.id]}
          onToggleExpand={toggleCardExpansion}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      ))}
    </div>
  );

  const renderStickyHeader = () => (
    <div
      className="sticky z-40 bg-white shadow-md"
      style={{ top: "64px" }} // Adjust this value to match your header height
    >
      <div className="flex items-center justify-between p-4">
        <div className="space-x-2">
          <button
            className={`px-4 py-2 text-sm rounded transition-colors ${
              selectedCategory === "Service"
                ? "text-white bg-blue-500"
                : "text-blue-500 bg-white border border-blue-500 hover:bg-blue-50"
            }`}
            onClick={() => handleCategoryChange("Service")}
          >
            Service
          </button>
          <button
            className={`px-4 py-2 text-sm rounded transition-colors ${
              selectedCategory === "Retail"
                ? "text-white bg-blue-500"
                : "text-blue-500 bg-white border border-blue-500 hover:bg-blue-50"
            }`}
            onClick={() => handleCategoryChange("Retail")}
          >
            Retail
          </button>
        </div>
      </div>
    </div>
  );

  const renderFAB = () => {
    if (!isMobile) return null;

    return (
      <button
        onClick={handleAddProduct}
        className="fixed z-50 flex items-center justify-center text-white transition-colors duration-300 bg-blue-500 rounded-full shadow-lg bottom-6 right-6 w-14 h-14 focus:outline-none hover:bg-blue-600" // Add z-50 here
        aria-label="Add New Product"
      >
        <Plus size={24} />
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        <InfoCards products={filteredProducts} />
      </div>
      {isMobile && renderStickyHeader()}
      <div className="flex-grow overflow-auto">
        <div className="px-4 pb-2 bg-white rounded-lg shadow">
          {!isMobile && (
            <div className="flex items-center justify-between h-16 ">
              <div className="flex items-center space-x-2">
                <button
                  className={`px-4 py-2 text-sm rounded transition-colors ${
                    selectedCategory === "Service"
                      ? "text-white bg-blue-500"
                      : "text-blue-500 bg-white border border-blue-500 hover:bg-blue-50"
                  }`}
                  onClick={() => handleCategoryChange("Service")}
                >
                  Service
                </button>
                <button
                  className={`px-4 py-2 text-sm rounded transition-colors ${
                    selectedCategory === "Retail"
                      ? "text-white bg-blue-500"
                      : "text-blue-500 bg-white border border-blue-500 hover:bg-blue-50"
                  }`}
                  onClick={() => handleCategoryChange("Retail")}
                >
                  Retail
                </button>
              </div>
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
              {isMobile ? (
                renderProductCards()
              ) : (
                <div style={{ height: "calc(92vh - 250px)", width: "100%" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
                    density="compact"
                    sx={{
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#dddddd",
                        color: "#000000",
                        fontSize: "0.875rem",
                        fontWeight: "bold",
                        borderBottom: "none",
                      },
                      "& .MuiDataGrid-cell": {
                        fontSize: "0.875rem",
                      },
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {renderFAB()}

      {/* Pagination for mobile devices */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success/error messages */}
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
