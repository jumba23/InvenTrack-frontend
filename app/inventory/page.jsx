"use client";

/**
 * InventoryPage Component
 *
 * Purpose:
 * Displays and manages the inventory of products, including services and retail items.
 *
 * Features:
 * - Displays summary cards with key inventory metrics
 * - Provides a filterable and sortable grid of all inventory items
 * - Allows adding, editing, and deleting of inventory items
 * - Separates items into 'Service' and 'Retail' categories
 * - Calculates and displays total value for each item
 *
 * @component
 */

import React, { useMemo } from "react";
import MainLayout from "@/layouts/MainLayout";
import { useRequireAuth } from "@/utils/hooks/useRequireAuth";
import Spinner from "@/components/Spinners/Spinner";
import { DataGrid } from "@mui/x-data-grid";
import ProductForm from "@/components/Forms/ProductForm";
import { useProduct } from "@/context/ProductContext";
import InfoCards from "./InfoCards";

const InventoryPage = () => {
  useRequireAuth("/inventory");

  const {
    products,
    setProducts,
    loading,
    selectedCategory,
    renderForm,
    setRenderForm,
    setIsNewProduct,
    setSelectedCategory,
  } = useProduct();

  // Handler for editing a product
  const handleEdit = (id) => {
    console.log("Edit product with ID:", id);
    setIsNewProduct(false);
    setRenderForm(true);
    // TODO: Implement edit functionality
  };

  // Handler for deleting a product
  const handleDelete = (id) => {
    console.log("Delete product with ID:", id);
    // TODO: Implement delete functionality
  };

  // Handler for adding a new product
  const handleAddProduct = () => {
    setIsNewProduct(true);
    setRenderForm(true);
  };

  // Handler for changing the category filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Define columns for DataGrid
  const columns = [
    {
      field: "name",
      headerName: "Product",
      width: 120,
      flex: 1,
      // align: "center",
      // headerAlign: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "measurement_unit",
      headerName: "Unit",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "reorder_point",
      headerName: "Reorder Point",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "selling_price_per_unit",
      headerName: "Selling Price",
      width: 120,
      // align: "center",
      // headerAlign: "center",
      valueFormatter: ({ value }) => `$${value.toFixed(2)}`,
    },
    {
      field: "value",
      headerName: "Value",
      width: 120,
      // align: "center",
      // headerAlign: "center",
      valueFormatter: ({ value }) => `$${value.toFixed(2)}`,
      valueGetter: (params) =>
        params.row.quantity * params.row.selling_price_per_unit,
    },
    {
      field: "storage_location",
      headerName: "Location",
      width: 120,
      align: "center",
      headerAlign: "center",
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
            onClick={() => handleDelete(params.row.id)}
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

  // Prepare rows for DataGrid
  const rows = filteredProducts.map((product) => ({
    id: product.id,
    name: product.name,
    quantity: product.quantity,
    measurement_unit: product.measurement_unit,
    reorder_point: product.reorder_point,
    selling_price_per_unit: product.selling_price_per_unit,
    storage_location: product.storage_location,
  }));

  return (
    <MainLayout>
      <div className="flex flex-col h-full p-3">
        {renderForm ? (
          <ProductForm
            setRenderForm={setRenderForm}
            setProducts={setProducts}
          />
        ) : (
          <>
            <InfoCards products={filteredProducts} />

            <div className="flex flex-col flex-grow px-4 pb-2 mt-3 bg-white rounded-lg shadow">
              <div className="flex justify-between px-1 py-4 border-b">
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
                <button
                  className="px-4 py-2 text-sm text-white transition-colors bg-green-500 rounded hover:bg-green-600"
                  onClick={handleAddProduct}
                >
                  New Item
                </button>
              </div>
              {loading ? (
                <Spinner />
              ) : (
                <div className="flex-grow">
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
                    // autoHeight
                    density="compact"
                    sx={{
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#dddddd",
                        color: "#000000",
                        fontSize: "0.875rem",
                        fontWeight: "bold",
                        borderBottom: "none",
                        // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      },
                      "& .MuiDataGrid-cell": {
                        fontSize: "0.875rem",
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default InventoryPage;
