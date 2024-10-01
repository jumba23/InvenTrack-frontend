//components/Dashboard/QuickActions.jsx

import React from "react";
import Card from "./DashboardCard";

/**
 * QuickActions Component
 *
 * Displays a set of quick action buttons for common inventory tasks.
 *
 * @component
 */
const QuickActions = () => {
  const actions = [
    { label: "Add New Product", onClick: () => console.log("Add New Product") },
    {
      label: "Reorder Low Stock",
      onClick: () => console.log("Reorder Low Stock"),
    },
    { label: "Generate Report", onClick: () => console.log("Generate Report") },
    {
      label: "Manage Suppliers",
      onClick: () => console.log("Manage Suppliers"),
    },
  ];

  return (
    <Card title="Quick Actions" className="flex flex-col h-full">
      <div className="grid gap-4 grid-row-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
          >
            {action.label}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;
