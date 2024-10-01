// components/Inventory/ProductCard/ProductCard.jsx

import React from "react";
import { useSwipeable } from "react-swipeable";
import { ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react";

const ProductCard = ({
  product,
  expanded,
  onToggleExpand,
  onEdit,
  onDelete,
}) => {
  const swipeHandlers = useSwipeable({
    // onSwipedLeft: () => onDelete(product.id),
    onSwipedRight: () => onEdit(product.id),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div
      className="relative p-4 mb-4 overflow-hidden bg-white rounded-lg shadow-md"
      {...swipeHandlers}
    >
      <div className="absolute inset-y-0 left-0 flex items-center justify-center w-16 text-white transition-transform duration-200 ease-in-out transform -translate-x-full bg-blue-500">
        <Edit size={24} />
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center justify-center w-16 text-white transition-transform duration-200 ease-in-out transform translate-x-full bg-red-500">
        <Trash2 size={24} />
      </div>
      <div className="relative z-10 bg-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <button
            onClick={() => onToggleExpand(product.id)}
            className="text-blue-500 focus:outline-none"
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Total Units: {product.total_quantity}</div>
          <div className="flex items-center">
            <span className="flex-shrink-0 mr-2">Status:</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold flex-grow text-center
                ${
                  product.status === "out"
                    ? "bg-red-500 text-white"
                    : product.status === "low"
                    ? "bg-yellow-500 text-black"
                    : "bg-green-500 text-white"
                }`}
            >
              {product.status === "out"
                ? "Out of Stock"
                : product.status === "low"
                ? "Low Stock"
                : "In Stock"}
            </span>
          </div>
        </div>

        {expanded && (
          <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
            <div>Office 1: {product.quantity_office_1}</div>
            <div>Office 8: {product.quantity_office_8}</div>
            <div>Home: {product.quantity_home}</div>
            <div>Shelf: {product.display_shelf}</div>
            <div>Reorder at: {product.reorder_point}</div>
            <div>
              Wholesale Value: ${product.stock_wholesale_value.toFixed(2)}
            </div>
          </div>
        )}
        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="px-3 py-1 text-xs text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => onEdit(product.id)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 text-xs text-white transition-colors bg-red-500 rounded hover:bg-red-600"
            onClick={() => onDelete(product.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
