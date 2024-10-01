// components/Suppliers/SupplierCard/SupplierCard.jsx

import React from "react";
import { useSwipeable } from "react-swipeable"; // Swipeable for mobile actions (optional)
import { ChevronDown, ChevronUp, Phone, Mail, User } from "lucide-react"; // Icons for edit and delete actions
import ConfirmationDialog from "@/components/Modals/ConfirmationDialog"; // Confirmation dialog for delete action
import { useState } from "react";

const SupplierCard = ({
  supplier,
  expanded,
  onToggleExpand,
  onEdit,
  onDelete,
}) => {
  // State to control the dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [action, setAction] = useState(""); // To track the action (call or email)
  const [link, setLink] = useState(""); // To track the link to navigate to

  // Swipe handlers (optional) for swiping actions like edit/delete
  const swipeHandlers = useSwipeable({
    // onSwipedLeft: () => onDelete(supplier.id),
    onSwipedRight: () => onEdit(supplier.id),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Handle opening the dialog
  const handleOpenDialog = (actionType, link) => {
    setAction(actionType);
    setLink(link);
    setDialogOpen(true);
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Handle confirming the dialog action
  const handleConfirmAction = () => {
    setDialogOpen(false);
    window.location.href = link; // Navigate to the phone number or email link
  };

  return (
    <div
      className="relative p-4 mb-4 bg-white rounded-lg shadow-md"
      {...swipeHandlers}
    >
      {/* Header: Supplier Name and Contact Person */}
      <div className="flex items-center justify-between mb-2">
        {/* Supplier Name on the left */}
        <h3 className="text-lg font-semibold">{supplier.name}</h3>

        {/* Middle Section: User icon and Contact Person's name */}
        <div className="flex justify-center flex-grow">
          <div className="flex items-center space-x-2">
            <User size={16} className="text-gray-600" />
            <span className="ml-1">{supplier.contact_person || "N/A"}</span>
          </div>
        </div>

        {/* Expand/Collapse Button on the right */}
        <button
          onClick={() => onToggleExpand(supplier.id)}
          className="text-blue-500 focus:outline-none"
        >
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Expanded Section: Phone, Email, and Other Details */}
      {expanded && (
        <div className="mt-4 space-y-3 text-sm">
          {/* Phone and Email Row */}
          <div className="flex items-center space-x-6">
            {/* Phone Section */}
            <div className="flex items-center space-x-1">
              <Phone size={16} className="text-gray-600" />
              <button
                className="text-blue-500 underline"
                onClick={() =>
                  handleOpenDialog("call", `tel:${supplier.phone}`)
                }
              >
                {supplier.phone || "N/A"}
              </button>
            </div>

            {/* Email Section */}
            <div className="flex items-center space-x-1">
              <Mail size={16} className="text-gray-600" />
              <button
                className="text-blue-500 underline"
                onClick={() =>
                  handleOpenDialog("email", `mailto:${supplier.email}`)
                }
              >
                {supplier.email || "N/A"}
              </button>
            </div>
          </div>

          {/* Supplier Details */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              Wholesale Value: ${supplier.stock_wholesale_value.toFixed(2)}
            </div>
            <div>Retail Value: ${supplier.stock_retail_value.toFixed(2)}</div>
            <div>Total Quantity: {supplier.total_quantity}</div>
          </div>
        </div>
      )}

      {/* Action Buttons: Edit and Delete */}
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

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={dialogOpen}
        title={`Confirm ${action === "call" ? "Call" : "Email"} Action`}
        message={`Are you sure you want to ${action} ${
          supplier.contact_person || "this contact"
        }?`}
        onConfirm={handleConfirmAction}
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default SupplierCard;
