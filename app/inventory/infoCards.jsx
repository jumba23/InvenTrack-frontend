//app/inventory/infoCards.jsx

import React from "react";

/**
 * InfoCards Component
 *
 * Purpose:
 * Displays summary cards with key metrics about the inventory.
 *
 * Props:
 * @param {Array} products - The list of products to summarize
 *
 * @component
 */
const InfoCards = ({ products }) => {
  // Calculate total retail value
  const totalRetailValue = products.reduce(
    (acc, product) => acc + product.stock_retail_value,
    0
  );

  // Calculate total wholesale value
  const totalWholesaleValue = products.reduce(
    (acc, product) => acc + product.stock_wholesale_value,
    0
  );

  // Count items with low stock
  const lowStockItems = products.filter(
    (product) => product.total_quantity <= product.reorder_point
  ).length;

  // Sum up total quantity from the `total_quantity` field
  const totalUnits = products.reduce(
    (acc, product) => acc + product.total_quantity,
    0
  );

  return (
    <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-4">
      <InfoCard
        title="Total Retail Value"
        value={`$${totalRetailValue.toLocaleString()}`}
        color="bg-blue-100"
      />
      <InfoCard
        title="Total Wholesale Value"
        value={`$${totalWholesaleValue.toLocaleString()}`}
        color="bg-green-100"
      />
      <InfoCard
        title="Low Stock Items"
        value={lowStockItems}
        color="bg-red-100"
      />
      <InfoCard
        title="Total Units in Stock"
        value={totalUnits.toLocaleString()} // Total units formatted
        color="bg-yellow-100"
      />
    </div>
  );
};

/**
 * InfoCard Component
 *
 * Purpose:
 * Renders a single information card.
 *
 * Props:
 * @param {string} title - The title of the card
 * @param {string|number} value - The value to display
 * @param {string} color - The background color class for the card
 *
 * @component
 */
const InfoCard = ({ title, value, color }) => (
  <div className={`p-3 ${color} rounded-lg shadow`}>
    <h3 className="text-xs font-medium text-gray-500 uppercase">{title}</h3>
    <p className="text-xl font-semibold text-gray-700">{value}</p>
  </div>
);

export default InfoCards;
