import React, { useState } from "react";
import {
  Typography,
  Box,
  Card,
  Grid,
  useMediaQuery,
  useTheme,
  TextField,
  Alert,
} from "@mui/material";

import { NotificationSnackbar } from "../ProductForm";
import { useForm } from "react-hook-form";
import FormActions from "./FormActions";
import FormSection from "./FormSection";

/**
 * SupplierForm Component
 *
 * This component renders a form for creating and editing supplier data.
 * It adapts to both mobile and desktop views by switching between vertical and two-column layouts.
 *
 * Props:
 * - `initialData` (object): The initial values for the form fields (for editing).
 * - `isNewSupplier` (boolean): Indicates whether the form is for creating a new supplier.
 * - `onSubmit` (function): Callback function to handle form submission.
 * - `onCancel` (function): Callback function to handle form cancellation.
 */
const SupplierForm = ({ initialData, onSubmit, onCancel, isNewSupplier }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  }); // State for managing the notification

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Handle form submission
  const onSubmitForm = async (data) => {
    setIsSubmitting(true);
    setNotification({ open: false, message: "", severity: "success" });
    try {
      await onSubmit(data, (errorObj) => {
        if (errorObj && errorObj.message) {
          setNotification({
            open: true,
            message: errorObj.message,
            severity: "error",
          });
        }
      });
      setNotification({
        open: true,
        message: "Supplier saved successfully!",
        severity: "success",
      }); // Show success notification
    } catch (error) {
      console.error("Error submitting form:", error);
      setNotification({
        open: true,
        message:
          error.message || "An error occurred while saving the supplier.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle closing the snackbar
  const handleCloseSnackbar = () => {
    setNotification({ ...notification, open: false });
  };

  // Form sections fields configuration
  const formSections = [
    {
      title: "Supplier Information",
      fields: [
        {
          name: "name",
          label: "Supplier Name",
          required: true,
          error: errors.name,
        },
        {
          name: "contact_person",
          label: "Contact Person",
          required: false,
          error: errors.contact_person,
        },
        {
          name: "phone",
          label: "Phone Number",
          required: true,
          error: errors.phone,
        },
        {
          name: "email",
          label: "Email Address",
          required: false,
          error: errors.email,
        },
      ],
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Set height to 100vh for full viewport height
        width: "100%",
        paddingX: 0.5,
        paddingY: 4,
        boxSizing: "border-box",
        justifyContent: "center", // Center content vertically
        alignItems: "center", // Center content horizontally
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "800px",
          height: "auto", // Set to 'auto' so the card adjusts to its content height
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            p: 3,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Center items horizontally within Box
            justifyContent: "center", // Center items vertically within Box
          }}
        >
          <Typography variant="h5" align="center" gutterBottom sx={{ mb: 4 }}>
            {isNewSupplier ? "Add New Supplier" : "Edit Supplier"}
          </Typography>

          {/* Render form sections */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {formSections.map((section, index) => (
              <FormSection
                key={index}
                section={section}
                control={control}
                errors={errors}
                isMobile={isMobile}
              />
            ))}
          </Grid>

          {/* Form action buttons */}
          <FormActions
            onCancel={onCancel}
            isSubmitting={isSubmitting}
            isNewProduct={isNewSupplier}
          />
        </Box>
      </Card>

      {/* Notification snackbar for success/error messages */}
      <NotificationSnackbar
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default SupplierForm;
