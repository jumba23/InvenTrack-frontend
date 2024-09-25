// CategoryFilter.jsx
import React from "react";

/**
 * CategoryFilter Component
 *
 * This component provides buttons to filter products by category (Service or Retail).
 *
 * @param {Object} props
 * @param {string} props.selectedCategory - The currently selected category
 * @param {function} props.onCategoryChange - Function to call when category is changed
 * @param {boolean} props.isMobile - Whether the component is being rendered on a mobile device
 */
const CategoryFilter = ({ selectedCategory, onCategoryChange, isMobile }) => {
  const buttonClass = (category) =>
    `px-4 py-2 text-sm rounded transition-colors ${
      selectedCategory === category
        ? "text-white bg-blue-500"
        : "text-blue-500 bg-white border border-blue-500 hover:bg-blue-50"
    }`;

  return (
    <div
      className={`${
        isMobile ? "sticky z-40 bg-white shadow-md" : ""
      } flex items-center justify-between p-4`}
      style={isMobile ? { top: "64px" } : {}}
    >
      <div className="space-x-2">
        <button
          className={buttonClass("Service")}
          onClick={() => onCategoryChange("Service")}
        >
          Service
        </button>
        <button
          className={buttonClass("Retail")}
          onClick={() => onCategoryChange("Retail")}
        >
          Retail
        </button>
      </div>
    </div>
  );
};

export default CategoryFilter;
