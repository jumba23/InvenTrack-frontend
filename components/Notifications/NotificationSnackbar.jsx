// components/Notifications/NotificationSnackbar.jsx

import React from "react";
import { Snackbar, Alert } from "@mui/material";

/**
 * NotificationSnackbar Component
 *
 * This component renders a snackbar notification with a message and severity.
 * It can be used to display success, error, or other types of notifications.
 *
 * @param {boolean} open - Whether the snackbar is open
 * @param {string} message - The message to display in the snackbar
 * @param {string} severity - The severity of the message (e.g., "success", "error")
 * @param {function} onClose - Function to handle closing the snackbar
 */
const NotificationSnackbar = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;
