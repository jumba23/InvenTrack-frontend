// ProductTable.jsx
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

/**
 * ProductTable Component
 *
 * This component renders a table of products using Material-UI's DataGrid.
 * It's used for desktop views of the inventory.
 *
 * @param {Object} props
 * @param {Array} props.products - The list of products to display
 * @param {function} props.onEdit - Function to call when edit button is clicked
 * @param {function} props.onDelete - Function to call when delete button is clicked
 */
const ProductTable = ({ products, onEdit, onDelete }) => {
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

  const rows = products.map((product) => ({
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

export default ProductTable;
