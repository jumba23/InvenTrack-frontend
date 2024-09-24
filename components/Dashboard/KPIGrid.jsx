import React from "react";
import Card from "@/components/Cards/DashboardCard";

/**
 * KPIGrid Component
 *
 * Displays a grid of key performance indicators for the inventory.
 *
 * @component
 */
const KPIGrid = () => {
  const kpis = [
    { title: "Total Products", value: "1,234" },
    { title: "Total Value", value: "$123,456" },
    { title: "Low Stock", value: "23" },
    { title: "Out of Stock", value: "5" },
    { title: "Top Selling", value: "Product A" },
    { title: "Least Selling", value: "Product Z" },
  ];

  return (
    <Card title="Product Stats">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {kpis.map((kpi, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">{kpi.title}</h3>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {kpi.value}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default KPIGrid;
