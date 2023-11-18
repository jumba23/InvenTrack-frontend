"use client";
import React from "react";
import MainLayout from "@/layouts/MainLayout";

import { useEffect, useState } from "react";
import { fetchProducts } from "../../utils/api/apiService";
import { useRequireAuth } from "@/utils/hooks/useRequireAuth";
import Spinner from "@/components/Spinner";

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

const InventoryPage = () => {
  useRequireAuth("/inventory");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const inventoryLevelColor = (level) => {
    if (level === "Low Stock") return "text-yellow-500 font-semibold";
    if (level === "Out of Stock") return "text-red-500 font-semibold";
    return "text-green-500 font-semibold";
  };

  if (loading) return <Spinner />;
  return (
    <MainLayout>
      <div className="container h-full mx-auto">
        <div className="flex items-center justify-center mb-4 bg-white rounded-lg h-1/4">
          <h1 className="text-2xl font-semibold">Overall Inventory</h1>
        </div>
        <div className="px-5 pt-3 bg-white rounded-lg h-4/5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full text-sm font-light text-left">
              <thead className="font-medium border-b dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Supplier
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Levels
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Value
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Last Ordered
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr
                    key={item.product}
                    className="text-lg font-normal transition duration-300 ease-in-out border-b hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.supplier}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${inventoryLevelColor(
                        item.levels
                      )}`}
                    >
                      {item.levels}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.last_ordered}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default InventoryPage;
