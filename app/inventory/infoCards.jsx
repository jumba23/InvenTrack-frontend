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
  // Calculate total inventory value
  const totalInventoryValue = products.reduce(
    (acc, product) => acc + product.quantity * product.selling_price_per_unit,
    0
  );

  // Count items with low stock
  const lowStockItems = products.filter(
    (product) => product.quantity <= product.reorder_point
  ).length;

  // Calculate total units in stock
  const totalUnits = products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  // Calculate average margin
  const averageMargin =
    products.length > 0
      ? products.reduce(
          (acc, product) =>
            acc +
            (product.selling_price_per_unit - product.retail_price_per_unit),
          0
        ) / products.length
      : 0;

  return (
    <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-4">
      <InfoCard
        title="Total Inventory Value"
        value={`$${totalInventoryValue.toFixed(2)}`}
        color="bg-blue-100"
      />
      <InfoCard
        title="Low Stock Items"
        value={lowStockItems}
        color="bg-red-100"
      />
      <InfoCard
        title="Total Units in Stock"
        value={totalUnits}
        color="bg-green-100"
      />
      <InfoCard
        title="Average Margin"
        value={`$${averageMargin.toFixed(2)}`}
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
