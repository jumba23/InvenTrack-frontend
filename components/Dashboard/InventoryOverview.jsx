import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dynamic from "next/dynamic";
import Card from "@/components/Cards/DashboardCard";
import { useProduct } from "@/utils/hooks/useProduct";
import { useSupplier } from "@/utils/hooks/useSupplier";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DynamicBarChart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Bar),
  {
    ssr: false,
  }
);

/**
 * InventoryOverview Component
 *
 * Displays an overview of the inventory, including a chart of products by supplier
 * and top products by value.
 *
 * @component
 */
const InventoryOverview = () => {
  const { products } = useProduct();
  const { suppliers } = useSupplier();

  const chartData = useMemo(() => {
    const supplierProductCounts = suppliers.map((supplier) => {
      const count = products.filter(
        (product) => product.supplier_id === supplier.id
      ).length;
      return { supplier: supplier.name, count };
    });

    return {
      labels: supplierProductCounts.map((item) => item.supplier),
      datasets: [
        {
          label: "Number of Products",
          data: supplierProductCounts.map((item) => item.count),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };
  }, [products, suppliers]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Products by Supplier",
      },
    },
  };

  const topProducts = useMemo(() => {
    return products
      .sort((a, b) => b.stock_retail_value - a.stock_retail_value)
      .slice(0, 5)
      .map((product) => ({
        name: product.name,
        value: `$${product.stock_retail_value.toFixed(2)}`,
      }));
  }, [products]);

  return (
    <Card title="Inventory Overview">
      <div className="flex flex-col md:flex-row">
        <div className="w-full h-64 md:w-1/2">
          <DynamicBarChart data={chartData} options={chartOptions} />
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
