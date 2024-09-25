// AddProductButton.jsx
import React from "react";
import { Plus } from "lucide-react";

/**
 * AddProductButton Component
 *
 * This component renders a button to add a new product. It adapts to mobile
 * and desktop views.
 *
 * @param {Object} props
 * @param {function} props.onClick - Function to call when button is clicked
 * @param {boolean} props.isMobile - Whether the component is being rendered on a mobile device
 */
const AddProductButton = ({ onClick, isMobile }) => {
  if (isMobile) {
    return (
      <button
        onClick={onClick}
        className="fixed z-50 flex items-center justify-center text-white transition-colors duration-300 bg-blue-500 rounded-full shadow-lg bottom-6 right-6 w-14 h-14 focus:outline-none hover:bg-blue-600"
        aria-label="Add New Product"
      >
        <Plus size={24} />
      </button>
    );
  }

  return (
    <button
      className="px-2 py-2 text-sm text-white transition-colors bg-green-500 rounded hover:bg-green-600"
      onClick={onClick}
    >
      New Product
    </button>
  );
};

export default AddProductButton;
