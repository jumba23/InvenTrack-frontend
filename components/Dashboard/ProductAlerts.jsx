//components/Dashboard/ProductAlerts.jsx

import React from "react";
import Card from "./DashboardCard";

/**
 * ProductAlerts Component
 *
 * Displays a list of important product alerts and notifications.
 *
 * @component
 */
const ProductAlerts = () => {
  const alerts = [
    { message: "Product A is low on stock", type: "warning" },
    { message: "Product B is out of stock", type: "error" },
    { message: "New shipment arriving for Product C", type: "info" },
    { message: "Product D price updated", type: "success" },
  ];

  const getAlertStyle = (type) => {
    switch (type) {
      case "warning":
        return "bg-yellow-100 border-yellow-500 text-yellow-700";
      case "error":
        return "bg-red-100 border-red-500 text-red-700";
      case "info":
        return "bg-blue-100 border-blue-500 text-blue-700";
      case "success":
        return "bg-green-100 border-green-500 text-green-700";
      default:
        return "bg-gray-100 border-gray-500 text-gray-700";
    }
  };

  return (
    <Card title="Product Alerts" className="flex flex-col h-full">
      <ul className="space-y-4">
        {alerts.map((alert, index) => (
          <li
            key={index}
            className={`p-2 border-l-4 rounded ${getAlertStyle(alert.type)}`}
          >
            {alert.message}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ProductAlerts;
