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

// sample data
// const medicalSpaInventory = [
//   {
//     product: "Facial Cleanser",
//     supplier: "BeautyCorp",
//     levels: 50,
//     value: "$10.99",
//     lastOrdered: "2021-07-20",
//   },
//   {
//     product: "Anti-Aging Cream",
//     supplier: "SkinCarePlus",
//     levels: 30,
//     value: "$29.99",
//     lastOrdered: "2021-07-15",
//   },
//   {
//     product: "Massage Oil",
//     supplier: "Relaxation Inc.",
//     levels: 100,
//     value: "$15.50",
//     lastOrdered: "2021-07-10",
//   },
//   {
//     product: "Hair Removal Laser",
//     supplier: "TechMed Solutions",
//     levels: 5,
//     value: "$999.00",
//     lastOrdered: "2021-06-30",
//   },
//   {
//     product: "Body Scrub",
//     supplier: "NatureCare",
//     levels: 40,
//     value: "$8.99",
//     lastOrdered: "2021-07-05",
//   },
//   {
//     product: "Aromatherapy Diffuser",
//     supplier: "AromaMist",
//     levels: 25,
//     value: "$39.95",
//     lastOrdered: "2021-07-25",
//   },
//   {
//     product: "Collagen Face Mask",
//     supplier: "SkinRevive",
//     levels: 60,
//     value: "$7.50",
//     lastOrdered: "2021-07-18",
//   },
//   {
//     product: "Therapeutic Foot Bath",
//     supplier: "WellnessTech",
//     levels: 10,
//     value: "$120.00",
//     lastOrdered: "2021-06-20",
//   },
// ];
// ... existing imports
import React, { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { fetchProducts } from "@/utils/api/apiService";
import { useRequireAuth } from "@/utils/hooks/useRequireAuth";
import Spinner from "@/components/Spinner";
import { DataGrid } from "@mui/x-data-grid";

const InventoryPage = () => {
  useRequireAuth("/inventory");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleEdit = (id) => {
    // Logic to handle editing a product
    console.log("Edit product with ID:", id);
    // Redirect to the edit product page or open an edit modal
  };

  const handleDelete = (id) => {
    // Logic to handle deleting a product
    console.log("Delete product with ID:", id);
    // Make an API call to delete the product and update the products state
  };

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
      <div className="container h-full mx-auto">
        <div className="flex items-center justify-center mb-4 bg-white rounded-lg h-1/4">
          <h1 className="text-2xl font-semibold">Overall Inventory</h1>
        </div>
        <div className="px-5 pt-3 bg-white rounded-lg h-4/5">
          {loading ? (
            <Spinner />
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
              // checkboxSelection
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default InventoryPage;
