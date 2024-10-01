// components/Dialogs/SupplierDeleteConfirmationDialog.jsx

import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CancelButton from "@/components/Buttons/CancelButton";
import SubmitButton from "@/components/Buttons/SubmitButton";

/**
 * SupplierDeleteConfirmationDialog Component
 *
 * This component renders a confirmation dialog for deleting a supplier.
 * It provides options to confirm or cancel the deletion action.
 * If a custom message is provided, it will be shown instead of the default message.
 * The dialog is controlled by the `open` prop, which determines whether it is visible.
 *
 * @param {boolean} open - Whether the dialog is open
 * @param {function} onClose - Function to handle closing the dialog
 * @param {function} onConfirm - Function to handle confirming the deletion
 * @param {string} supplierName - The name of the supplier being deleted
 * @param {string} customMessage - Custom message to show in the dialog
 */
const SupplierDeleteConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  supplierName,
  customMessage,
}) => {
  // Function to capitalize each word in the string (helper function)
  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* If a custom message is provided, show that instead of the default message */}
          {customMessage ? (
            <span className="text-red-600">{customMessage}</span>
          ) : (
            <>
              {/* Capitalize product name and style it with bold */}
              Are you sure you want to delete{" "}
              <strong>{capitalizeWords(supplierName)}</strong> supplier?
              {/* Add a line break */}
              <br />
              {/* Add styles for the secondary message */}
              This action cannot be undone.
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* If a custom message is present, show a single "OK" button */}
        {customMessage ? (
          <SubmitButton onClick={onClose} className="w-full sm:w-auto">
            OK
          </SubmitButton>
        ) : (
          <>
            {/* Original Cancel and Delete buttons */}
            <CancelButton onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </CancelButton>
            <SubmitButton onClick={onConfirm} className="w-full sm:w-auto">
              Delete
            </SubmitButton>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SupplierDeleteConfirmationDialog;
