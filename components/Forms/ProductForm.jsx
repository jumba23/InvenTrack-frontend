"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Card,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";

/**
 * ProductForm Component
 *
 * Purpose:
 * This form component is used for adding or editing products in the inventory.
 * It includes fields for product details, pricing, descriptions, category, and
 * storage locations. The form dynamically handles validation, submission, and
 * cancel actions.
 *
 * Props:
 * @param {Object} initialData - The initial product data for editing (optional)
 * @param {Function} onSubmit - Callback function to handle form submission
 * @param {Function} onCancel - Callback function to handle form cancellation
 * @param {boolean} isNewProduct - Flag to indicate if this is a new product or being edited
 *
 * @component
 */
const ProductForm = ({ initialData, onSubmit, onCancel, isNewProduct }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  /**
   * Handles form submission with validation and error handling
   * @param {Object} data - The form data to be submitted
   */
  const onSubmitForm = async (data) => {
    setIsSubmitting(true);
    setErrorMessage(null); // Clear previous error message
    try {
      // Pass only the error message string to setErrorMessage
      await onSubmit(data, (errorObj) => {
        if (errorObj && errorObj.message) {
          console.log("Setting error message:", errorObj.message); // Now log the string message
          setErrorMessage(errorObj.message); // Pass only the message, not the whole object
        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        error.message || "An error occurred while saving the product."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Closes the error message snackbar
   * @param {Event} event - The close event
   * @param {string} reason - The reason for closing
   */
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMessage(null);
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          p: 2,
          flexGrow: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          {isNewProduct ? "Add New Product" : "Edit Product"}
        </Typography>

        <form
          onSubmit={handleSubmit(onSubmitForm)}
          style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            {/* Product Name */}
            <Grid item xs={4}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: "Product name is required",
                  maxLength: {
                    value: 255,
                    message: "Name must be less than 255 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Product Name"
                    fullWidth
                    size="small"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            {/* Short Description */}
            <Grid item xs={8}>
              <Controller
                name="short_description"
                control={control}
                defaultValue=""
                rules={{
                  maxLength: {
                    value: 200,
                    message:
                      "Short description must be less than 200 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Short Description"
                    fullWidth
                    size="small"
                    error={!!errors.short_description}
                    helperText={errors.short_description?.message}
                  />
                )}
              />
            </Grid>

            {/* Retail Price per Unit */}
            <Grid item xs={3}>
              <Controller
                name="retail_price_per_unit"
                control={control}
                defaultValue=""
                rules={{
                  required: "Retail price is required",
                  min: { value: 0, message: "Price must be positive" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Retail Price per Unit"
                    type="number"
                    fullWidth
                    size="small"
                    error={!!errors.retail_price_per_unit}
                    helperText={errors.retail_price_per_unit?.message}
                  />
                )}
              />
            </Grid>

            {/* Selling Price per Unit */}
            <Grid item xs={3}>
              <Controller
                name="selling_price_per_unit"
                control={control}
                defaultValue=""
                rules={{
                  required: "Selling price is required",
                  min: { value: 0, message: "Price must be positive" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Selling Price per Unit"
                    type="number"
                    fullWidth
                    size="small"
                    error={!!errors.selling_price_per_unit}
                    helperText={errors.selling_price_per_unit?.message}
                  />
                )}
              />
            </Grid>
            {/* Category */}
            <Grid item xs={3}>
              <Controller
                name="category_id"
                control={control}
                defaultValue=""
                rules={{
                  required: "Category is required",
                  validate: (value) =>
                    value === 1 || value === 2 || "Category must be 1 or 2",
                }}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    size="small"
                    error={!!errors.category_id}
                  >
                    <InputLabel>Category</InputLabel>
                    <Select {...field} label="Category">
                      <MenuItem value={1}>Service</MenuItem>
                      <MenuItem value={2}>Retail</MenuItem>
                    </Select>
                    {errors.category_id && (
                      <Typography variant="caption" color="error">
                        {errors.category_id.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Supplier ID */}
            <Grid item xs={3}>
              <Controller
                name="supplier_id"
                control={control}
                defaultValue=""
                rules={{
                  required: "Supplier ID is required",
                  validate: (value) =>
                    (Number.isInteger(Number(value)) && Number(value) > 0) ||
                    "Supplier ID must be a positive integer",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Supplier ID"
                    type="number"
                    fullWidth
                    size="small"
                    error={!!errors.supplier_id}
                    helperText={errors.supplier_id?.message}
                  />
                )}
              />
            </Grid>

            {/* Long Description */}
            <Grid item xs={12}>
              <Controller
                name="long_description"
                control={control}
                defaultValue=""
                rules={{
                  maxLength: {
                    value: 2000,
                    message:
                      "Long description must be less than 2000 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Long Description"
                    fullWidth
                    size="small"
                    multiline
                    rows={3}
                    error={!!errors.long_description}
                    helperText={errors.long_description?.message}
                  />
                )}
              />
            </Grid>

            {/* Divider for Storage Locations */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }}>
                <Typography variant="subtitle1" color="textSecondary">
                  Storage Locations
                </Typography>
              </Divider>
            </Grid>

            {/* Storage Locations */}
            {/* Office 1 */}
            <Grid item xs={4}>
              <Controller
                name="quantity_office_1"
                control={control}
                defaultValue=""
                rules={{
                  required: "Office 1 quantity is required",
                  min: { value: 0, message: "Quantity must be non-negative" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Office 1"
                    type="number"
                    fullWidth
                    size="small"
                    error={!!errors.quantity_office_1}
                    helperText={errors.quantity_office_1?.message}
                  />
                )}
              />
            </Grid>

            {/* Office 8 */}
            <Grid item xs={4}>
              <Controller
                name="quantity_office_8"
                control={control}
                defaultValue=""
                rules={{
                  required: "Office 8 quantity is required",
                  min: { value: 0, message: "Quantity must be non-negative" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Office 8"
                    type="number"
                    fullWidth
                    size="small"
                    error={!!errors.quantity_office_8}
                    helperText={errors.quantity_office_8?.message}
                  />
                )}
              />
            </Grid>

            {/* Home */}
            <Grid item xs={4}>
              <Controller
                name="quantity_home"
                control={control}
                defaultValue=""
                rules={{
                  required: "Home quantity is required",
                  min: { value: 0, message: "Quantity must be non-negative" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Home"
                    type="number"
                    fullWidth
                    size="small"
                    error={!!errors.quantity_home}
                    helperText={errors.quantity_home?.message}
                  />
                )}
              />
            </Grid>

            {/* Reorder Point */}
            <Grid item xs={4}>
              <Controller
                name="reorder_point"
                control={control}
                defaultValue=""
                rules={{
                  required: "Reorder point is required",
                  min: {
                    value: 0,
                    message: "Reorder point must be non-negative",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Reorder Point"
                    type="number"
                    fullWidth
                    size="small"
                    error={!!errors.reorder_point}
                    helperText={errors.reorder_point?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          {/* Form Action Buttons */}
          <Box
            sx={{
              mt: "auto",
              pt: 2,
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              disabled={isSubmitting}
            >
              {isNewProduct ? "Add Product" : "Update Product"}
            </Button>
          </Box>
        </form>
      </Box>
      {/* Snackbar for Error Messages */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default ProductForm;
