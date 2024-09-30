// components/Dialogs/DeleteConfirmationDialog.jsx

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
 * DeleteConfirmationDialog Component
 *
 * This component renders a confirmation dialog for deleting a product.
 * It provides options to confirm or cancel the deletion action.
 *
 * @param {boolean} open - Whether the dialog is open
 * @param {function} onClose - Function to handle closing the dialog
 * @param {function} onConfirm - Function to handle confirming the deletion
 */
const ProductDeleteConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  productName,
}) => {
  /**
   * Function to capitalize each word in the string.
   * E.g., "test product" => "Test Product"
   */
  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* Capitalize product name and style it with bold */}
          Are you sure you want to delete{" "}
          <strong>{capitalizeWords(productName)}</strong> product?
          {/* Add a line break */}
          <br />
          {/* Add styles for the secondary message */}
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={onClose} className="w-full sm:w-auto">
          Cancel
        </CancelButton>
        <SubmitButton onClick={onConfirm} className="w-full sm:w-auto">
          Delete
        </SubmitButton>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDeleteConfirmationDialog;
