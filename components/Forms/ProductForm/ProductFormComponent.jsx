import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Typography,
  Box,
  Card,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSupplier } from "@/utils/hooks/useSupplier";
import FormSection from "./FormSection";
import FormActions from "./FormActions";
import NotificationSnackbar from "@/components/Notifications/NotificationSnackbar";

/**
 * ProductForm Component
 *
 * This component renders the product form with multiple sections.
 * It uses the react-hook-form library to manage the form state.
 * It displays a notification snackbar for success/error messages.
 * It also handles form submission and closing the snackbar.
 * The form is divided into multiple sections for better organization.
 * The form sections are rendered using the FormSection component.
 * The form actions are rendered using the FormActions component.
 * The notification snackbar is rendered using the NotificationSnackbar component.
 * The form data is passed as props to the component.
 * The form submission and cancel handlers are also passed as props.
 * The isNewProduct flag is used to determine if the product is new or existing.
 * The form sections are defined as an array of objects with title and fields.
 * Each field object contains the name, label, rules, and type of the field.
 * The form sections are rendered using the FormSection component.
 *
 * Features:
 * - Form sections with multiple fields
 * - Accordion layout for mobile devices
 * - Grid layout for desktop devices
 * - Notification snackbar for success/error messages
 * - Form submission and cancel handlers
 * - Validation rules for form fields
 * - Custom form field component
 * - Custom form actions component
 *
 *
 * @param {Object} initialData - The initial data for the form fields
 * @param {Function} onSubmit - The form submission handler
 * @param {Function} onCancel - The form cancel handler
 * @param {Boolean} isNewProduct - A boolean value to determine if the product is new
 *
 */

const ProductForm = ({ initialData, onSubmit, onCancel, isNewProduct }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  });

  const { suppliers } = useSupplier();
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
        message: "Product saved successfully!",
        severity: "success",
      }); // Show success notification
    } catch (error) {
      console.error("Error submitting form:", error);
      setNotification({
        open: true,
        message: error.message || "An error occurred while saving the product.",
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

  const formSections = [
    {
      title: "Basic Information",
      fields: [
        {
          name: "name",
          label: "Product Name",
          rules: { required: "Product name is required" },
        },
        { name: "short_description", label: "Short Description", rules: {} },
        {
          name: "category_id",
          label: "Category",
          rules: { required: "Category is required" },
        },
        {
          name: "supplier_id",
          label: "Supplier",
          rules: { required: "Supplier is required" },
        },
      ],
    },
    {
      title: "Pricing",
      fields: [
        {
          name: "retail_price_per_unit",
          label: "Retail Price per Unit",
          rules: { required: "Retail price is required" },
          type: "number",
        },
        {
          name: "wholesale_price_per_unit",
          label: "Wholesale Price per Unit",
          rules: { required: "Wholesale price is required" },
          type: "number",
        },
      ],
    },
    {
      title: "Storage Locations",
      fields: [
        {
          name: "quantity_office_1",
          label: "Office 1",
          rules: { required: "Office 1 quantity is required" },
          type: "number",
        },
        {
          name: "quantity_office_8",
          label: "Office 8",
          rules: { required: "Office 8 quantity is required" },
          type: "number",
        },
        {
          name: "quantity_home",
          label: "Home",
          rules: { required: "Home quantity is required" },
          type: "number",
        },
        {
          name: "display_shelf",
          label: "Shelf",
          rules: { required: "Office shelf is required" },
          type: "number",
        },
      ],
    },
    {
      title: "Additional Information",
      fields: [
        {
          name: "long_description",
          label: "Long Description",
          rules: {},
          options: { multiline: true, rows: 3 },
        },
        {
          name: "reorder_point",
          label: "Reorder Point",
          rules: { required: "Reorder point is required" },
          type: "number",
        },
      ],
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        paddingX: 0.5,
        paddingY: 4,
        boxSizing: "border-box",
      }}
    >
      <Card
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            p: 3,
            flexGrow: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom sx={{ mb: 4 }}>
            {isNewProduct ? "Add New Product" : "Edit Product"}
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Render form sections */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {formSections.map((section, index) => (
                  <FormSection
                    key={index}
                    section={section}
                    control={control}
                    errors={errors}
                    suppliers={suppliers}
                    isMobile={isMobile}
                  />
                ))}
              </Grid>

              {/* Form action buttons */}
              <FormActions
                onCancel={onCancel}
                isSubmitting={isSubmitting}
                isNewProduct={isNewProduct}
              />
            </Box>
          </form>
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

export default ProductForm;
