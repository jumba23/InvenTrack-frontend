// components/Inventory/CategoryFilter.jsx

import React from "react";

/**
 * CategoryFilter Component
 *
 * This component renders category filter buttons for the inventory.
 * It allows users to switch between "Service" and "Retail" categories.
 *
 * @param {string} selectedCategory - Currently selected category
 * @param {function} onCategoryChange - Function to handle category change
 */
const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        className={`px-4 py-2 text-sm rounded transition-colors ${
          selectedCategory === "Service"
            ? "text-white bg-blue-500"
            : "text-blue-500 bg-white border border-blue-500 hover:bg-blue-50"
        }`}
        onClick={() => onCategoryChange("Service")}
      >
        Service
      </button>
      <button
        className={`px-4 py-2 text-sm rounded transition-colors ${
          selectedCategory === "Retail"
            ? "text-white bg-blue-500"
            : "text-blue-500 bg-white border border-blue-500 hover:bg-blue-50"
        }`}
        onClick={() => onCategoryChange("Retail")}
      >
        Retail
      </button>
    </div>
  );
};

export default CategoryFilter;
