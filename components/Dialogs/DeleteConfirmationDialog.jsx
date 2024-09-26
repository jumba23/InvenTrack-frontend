// components/Dialogs/DeleteConfirmationDialog.jsx

import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

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
const DeleteConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this product? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
