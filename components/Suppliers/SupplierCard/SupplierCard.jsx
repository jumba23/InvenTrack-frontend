// components/Suppliers/SupplierCard/SupplierCard.jsx

import React from "react";
import { useSwipeable } from "react-swipeable"; // Swipeable for mobile actions (optional)
import { ChevronDown, ChevronUp } from "lucide-react"; // Icons for edit and delete actions

const SupplierCard = ({
  supplier,
  expanded,
  onToggleExpand,
  onEdit,
  onDelete,
}) => {
  // Swipe handlers (optional) for swiping actions like edit/delete
  const swipeHandlers = useSwipeable({
    // onSwipedLeft: () => onDelete(supplier.id),
    onSwipedRight: () => onEdit(supplier.id),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div
      className="relative p-4 mb-4 bg-white rounded-lg shadow-md"
      {...swipeHandlers}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{supplier.name}</h3>
        <button
          onClick={() => onToggleExpand(supplier.id)}
          className="text-blue-500 focus:outline-none"
        >
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>Contact: {supplier.contact_person || "N/A"}</div>
        {/* Render clickable phone number for mobile view */}
        <div>
          <a href={`tel:${supplier.phone}`} className="text-blue-500 underline">
            {supplier.phone}
          </a>
        </div>
      </div>

      {expanded && (
        <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
          <div>
            Wholesale Value: ${supplier.stock_wholesale_value.toFixed(2)}
          </div>
          <div>Retail Value: ${supplier.stock_retail_value.toFixed(2)}</div>
          <div>Total Quantity: {supplier.total_quantity}</div>
        </div>
      )}

      <div className="flex justify-end mt-4 space-x-2">
        <button
          className="px-3 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => onEdit(supplier.id)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
          onClick={() => onDelete(supplier.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SupplierCard;
