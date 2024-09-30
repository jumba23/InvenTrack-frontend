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
const SupplierDeleteConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this supplier? This action cannot be
          undone.
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

export default SupplierDeleteConfirmationDialog;
