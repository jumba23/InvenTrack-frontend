//components/Suppliers/SupplierList/SupplierCardList.jsx

import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const SupplierDataGrid = ({ rows, onEdit, onDelete }) => {
  const columns = [
    { field: "name", headerName: "Supplier", minWidth: 150, flex: 1 },
    { field: "contact_person", headerName: "Contact", minWidth: 150, flex: 1 },
    { field: "phone", headerName: "Phone", minWidth: 120, flex: 1 },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params.value ? (
              <a
                href={`mailto:${params.value}`}
                className="text-blue-500 underline"
              >
                {params.value}
              </a>
            ) : (
              <span>N/A</span>
            )}
          </>
        );
      },
    },
    {
      field: "total_quantity",
      headerName: "Total Quantity",
      width: 150,
      align: "center",
    },
    {
      field: "stock_wholesale_value",
      headerName: "Wholesale Value",
      width: 150,
      valueFormatter: ({ value }) => `$${value.toFixed(2)}`,
    },
    {
      field: "stock_retail_value",
      headerName: "Retail Value",
      width: 150,
      valueFormatter: ({ value }) => `$${value.toFixed(2)}`,
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
    <div style={{ height: "calc(92vh - 150px)", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        sx={{
          flexGrow: 1, // Allow the DataGrid to grow within its container
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

export default SupplierDataGrid;
