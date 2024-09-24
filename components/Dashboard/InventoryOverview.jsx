import React from "react";
import { Bar } from "react-chartjs-2";
import Card from "@/components/Cards/DashboardCard";

/**
 * InventoryOverview Component
 *
 * Displays an overview of the inventory, including a chart and top products.
 *
 * @component
 */
const InventoryOverview = () => {
  const chartData = {
    labels: ["Category A", "Category B", "Category C", "Category D"],
    datasets: [
      {
        label: "Number of Products",
        data: [12, 19, 3, 5],
        backgroundColor: ["#4B5563", "#60A5FA", "#34D399", "#F87171"],
      },
    ],
  };

  const topProducts = [
    { name: "Product A", value: "$1,234" },
    { name: "Product B", value: "$987" },
    { name: "Product C", value: "$765" },
    { name: "Product D", value: "$543" },
    { name: "Product E", value: "$321" },
  ];

  return (
    <Card title="Inventory Overview">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <Bar
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
        <div className="w-full mt-4 md:w-1/2 md:mt-0 md:ml-4">
          <h3 className="mb-2 text-lg font-semibold">
            Top 5 Products by Value
          </h3>
          <ul>
            {topProducts.map((product, index) => (
              <li key={index} className="flex justify-between py-2 border-b">
                <span>{product.name}</span>
                <span className="font-medium">{product.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default InventoryOverview;
