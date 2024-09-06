"use client";

// ======================= SUMMARY =======================
// This page component represents the inventory page of the application.
// It fetches the inventory data from the API and displays it in a tabular format using the DataGrid component.
// The useRequireAuth hook ensures that only authenticated users can access this page.
// ======================================================
// Usage:
// - Place this component inside the pages directory to create the inventory page.
// - The useRequireAuth hook ensures that only authenticated users can access this page.
// ======================================================

// ... existing imports
import React, { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { useRequireAuth } from "@/utils/hooks/useRequireAuth";
import Spinner from "@/components/Spinners/Spinner";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/Forms/ProductForm";
import { useProduct } from "@/context/ProductContext";

const InventoryPage = () => {
  useRequireAuth("/inventory");
  const router = useRouter();

  // Destructure the product context values
  const {
    products,
    setProducts,
    loading,
    error,
    selectedCategory,
    renderForm,
    setRenderForm,
    isNewProduct,
    setIsNewProduct,
  } = useProduct();

  const handleEdit = (id) => {
    // Logic to handle editing a product
    console.log("Edit product with ID:", id);
    setIsNewProduct(false); // This state will set the title of the form to "Edit Product"
    setRenderForm(true);
  };

  const handleDelete = (id) => {
    // Logic to handle deleting a product
    console.log("Delete product with ID:", id);
    // Make an API call to delete the product and update the products state
  };

  const handleAddProduct = () => {
    console.log("Add new product");
    setRenderForm(true);
  };

  // const handleService = () => {
  //   // Logic to handle service
  //   console.log("Service");
  //   // Redirect to the service page or open a service modal
  // };

  // const handleRetails = () => {
  //   // Logic to handle retails
  //   console.log("Retails");
  //   // Redirect to the retails page or open a retails modal
  // };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Calculate metrics
  // const totalInventoryValue = products.reduce(
  //   (acc, product) => acc + product.levels * parseFloat(product.value || 0),
  //   0
  // );
  const lowStockThreshold = 10;
  // const urgentlyLowStockItems = products.filter(
  //   (product) => product.levels < lowStockThreshold
  // ).length;
  const totalItems = products.length;
  const recentOrders = products.filter((product) => {
    const orderDate = new Date(product.lastOrdered);
    const today = new Date();
    return (today - orderDate) / (1000 * 60 * 60 * 24) <= 30;
  }).length;
  // const mostValuableItems = products
  //   .sort((a, b) => parseFloat(b.value || 0) - parseFloat(a.value || 0))
  //   .slice(0, 3);

  // Define columns for DataGrid
  const columns = [
    { field: "name", headerName: "Product", width: 150 },
    { field: "supplier", headerName: "Supplier", width: 150 },
    { field: "levels", headerName: "Levels", width: 120 },
    { field: "value", headerName: "Value", width: 120 },
    { field: "last_ordered", headerName: "Last Ordered", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <button
            className="px-2 py-1 mr-2 text-white bg-blue-500 rounded"
            onClick={() => handleEdit(params.row.id)}
          >
            Edit
          </button>
          <button
            className="px-2 py-1 text-white bg-red-500 rounded"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  // Convert products data to the format expected by DataGrid
  const rows = products.map((product, index) => ({
    id: index,
    ...product,
  }));

  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        {renderForm && (
          <ProductForm
            setRenderForm={setRenderForm}
            setProducts={setProducts}
          />
        )}

        {!renderForm && (
          <>
            <div className="flex items-center justify-center p-4 mt-2 mb-4 bg-white rounded-lg h-1/4">
              <div className="grid w-full h-full grid-cols-1 gap-6 m-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col items-center justify-center p-4 bg-blue-100 rounded">
                  <h2 className="text-xl font-semibold">
                    Total Inventory Value
                  </h2>
                  <p className="text-2xl font-bold">
                    {/* ${totalInventoryValue.toFixed(2)} */}
                    $147,000
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-red-100 rounded">
                  <h2 className="text-xl font-semibold">
                    Urgently Low Stock Items
                  </h2>
                  <p className="text-2xl font-bold">
                    {/* {urgentlyLowStockItems} */}3
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-green-100 rounded">
                  <h2 className="text-xl font-semibold">
                    Total Number of Items
                  </h2>
                  <p className="text-2xl font-bold">{totalItems}</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-yellow-100 rounded">
                  <h2 className="text-xl font-semibold">Recent Orders</h2>
                  <p className="text-2xl font-bold">{/* {recentOrders} */}5</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-grow p-4 overflow-hidden bg-white rounded-lg">
              <div className="flex justify-between mb-4">
                <div>
                  <button
                    className={`px-4 py-2 mr-2 rounded ${
                      selectedCategory === "Service"
                        ? "text-white bg-blue-500"
                        : "text-blue-500 bg-white border border-blue-500"
                    }`}
                    onClick={() => handleCategoryChange("Service")}
                  >
                    Service
                  </button>
                  <button
                    className={`px-4 py-2 rounded ${
                      selectedCategory === "Retail"
                        ? "text-white bg-blue-500"
                        : "text-blue-500 bg-white border border-blue-500"
                    }`}
                    onClick={() => handleCategoryChange("Retail")}
                  >
                    Retail
                  </button>
                </div>
                <button
                  className="px-4 py-2 text-white bg-green-500 rounded"
                  onClick={handleAddProduct}
                >
                  New Item
                </button>
              </div>
              {loading ? (
                <Spinner />
              ) : (
                <div className="flex-grow overflow-auto">
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
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
