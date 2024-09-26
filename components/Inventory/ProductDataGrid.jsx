// components/Inventory/ProductDataGrid.jsx

import React from "react";
import { DataGrid } from "@mui/x-data-grid";

/**
 * ProductDataGrid Component
 *
 * This component renders a DataGrid to display product information in a tabular format.
 * It handles the presentation of product data and provides edit and delete functionality.
 *
 * @param {Object[]} rows - Array of product data to be displayed in the grid
 * @param {function} onEdit - Function to handle editing a product
 * @param {function} onDelete - Function to handle deleting a product
 */
const ProductDataGrid = ({ rows, onEdit, onDelete }) => {
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
            onClick={() => onEdit(params.row.id)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 text-xs text-white transition-colors bg-red-500 rounded hover:bg-red-600"
            onClick={() => onDelete(params.row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
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
  );
};

export default ProductDataGrid;
