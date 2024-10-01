// components/Modals/ConfirmationDialog.jsx

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import CancelButton from "../Buttons/CancelButton";
import SubmitButton from "../Buttons/SubmitButton";

/**
 * ConfirmationDialog Component
 *
 * @param {boolean} open - Controls whether the dialog is open or closed.
 * @param {string} title - The title of the dialog.
 * @param {string} message - The message displayed in the dialog.
 * @param {function} onConfirm - Callback function for when the user confirms (Yes).
 * @param {function} onClose - Callback function for when the user closes the dialog (No).
 */
const ConfirmationDialog = ({ open, title, message, onConfirm, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={onClose} color="secondary">
          No
        </CancelButton>
        <SubmitButton onClick={onConfirm} color="primary" autoFocus>
          Yes
        </SubmitButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
