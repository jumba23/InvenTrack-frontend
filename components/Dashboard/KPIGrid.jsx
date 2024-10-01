//components/Dashboard/KPIGrid.jsx

import React from "react";
import Card from "./DashboardCard";
import InfoCard from "./InfoCard";

/**
 * KPIGrid Component
 *
 * Displays a grid of key performance indicators for the inventory.
 *
 * @component
 */
const KPIGrid = () => {
  const kpis = [
    { title: "Total Products", value: "1,234", color: "bg-blue-100" },
    { title: "Total Value", value: "$123,456", color: "bg-green-100" },
    { title: "Low Stock", value: "23", color: "bg-yellow-100" },
    { title: "Out of Stock", value: "5", color: "bg-red-100" },
    { title: "Top Selling", value: "Product A", color: "bg-purple-100" },
    { title: "Least Selling", value: "Product Z", color: "bg-pink-100" },
  ];

  return (
    <Card title="Product Stats" className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-2 gap-4 p-2 m-auto sm:grid-cols-3">
          {kpis.map((kpi, index) => (
            <InfoCard
              key={index}
              title={kpi.title}
              value={kpi.value}
              color={kpi.color}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default KPIGrid;
