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
import { ChevronDown, ChevronUp } from "lucide-react";

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
  const renderProductCard = (product) => (
    <div key={product.id} className="p-4 mb-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <button
          onClick={() => toggleCardExpansion(product.id)}
          className="text-blue-500 focus:outline-none"
        >
          {expandedCards[product.id] ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>Total Units: {product.total_quantity}</div>
        <div className="flex items-center">
          <span className="flex-shrink-0 mr-2">Status:</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-bold flex-grow text-center
      ${
        product.status === "out"
          ? "bg-red-500 text-white"
          : product.status === "low"
          ? "bg-yellow-500 text-black"
          : "bg-green-500 text-white"
      }`}
          >
            {product.status === "out"
              ? "Out of Stock"
              : product.status === "low"
              ? "Low Stock"
              : "In Stock"}
          </span>
        </div>
      </div>

      {expandedCards[product.id] && (
        <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
          <div>Office 1: {product.quantity_office_1}</div>
          <div>Office 8: {product.quantity_office_8}</div>
          <div>Home: {product.quantity_home}</div>
          <div>Shelf: {product.display_shelf}</div>
          <div>Reorder at: {product.reorder_point}</div>
          <div>
            Wholesale Value: ${product.stock_wholesale_value.toFixed(2)}
          </div>
        </div>
      )}
      <div className="flex justify-end mt-4 space-x-2">
        <button
          className="px-3 py-1 text-xs text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => handleEdit(product.id)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 text-xs text-white transition-colors bg-red-500 rounded hover:bg-red-600"
          onClick={() => handleDeleteClick(product.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        <InfoCards products={filteredProducts} />
      </div>
      <div className="flex flex-col flex-grow px-4 pb-2 bg-white rounded-lg shadow">
        <div className="flex justify-between px-1 py-4 border-b">
          {/* ... (keep existing category and new product buttons) */}
        </div>
        {loading ? (
          <div className="flex items-center justify-center flex-grow">
            <LogoSpinner />
          </div>
        ) : (
          <div className="flex-grow">
            {isMobile ? (
              <div className="mt-4">
                {filteredProducts.map(renderProductCard)}
              </div>
            ) : (
              <div style={{ height: "calc(100vh - 250px)", width: "100%" }}>
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
