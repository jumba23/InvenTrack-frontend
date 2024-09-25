// DeleteConfirmationDialog.jsx
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
 * This component renders a dialog to confirm product deletion.
 *
 * @param {Object} props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {function} props.onClose - Function to call when dialog is closed
 * @param {function} props.onConfirm - Function to call when deletion is confirmed
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
