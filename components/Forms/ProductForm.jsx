"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useProduct } from "@/context/ProductContext";
import {
  addProduct,
  updateProduct,
  fetchProducts,
} from "@/utils/api/apiService";

const ProductForm = ({ onFormClose, isNewProduct, productId = null }) => {
  const { setProducts } = useProduct();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      if (isNewProduct) {
        await addProduct(data);
      } else {
        await updateProduct(productId, data);
      }
      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
      if (typeof onFormClose === "function") {
        onFormClose();
      }
      reset();
    } catch (error) {
      console.error("Error submitting product:", error);
      setErrorMessage("Failed to save product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (typeof onFormClose === "function") {
      onFormClose();
    } else {
      console.error("onFormClose is not a function");
    }
    reset();
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
          onSubmit={handleSubmit(onSubmit)}
          style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid item xs={12}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <Controller
                name="quantity"
                control={control}
                defaultValue=""
                rules={{
                  required: "Quantity is required",
                  min: { value: 0, message: "Quantity must be non-negative" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Quantity in Stock"
                    type="number"
                    fullWidth
                    size="small"
                    error={!!errors.quantity}
                    helperText={errors.quantity?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
                    // multiline
                    // rows={2}
                    error={!!errors.short_description}
                    helperText={errors.short_description?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="storage_location"
                control={control}
                defaultValue=""
                rules={{
                  maxLength: {
                    value: 100,
                    message:
                      "Storage Location must be less than 100 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Storage Location"
                    fullWidth
                    size="small"
                    error={!!errors.storage_location}
                    helperText={errors.storage_location?.message}
                  />
                )}
              />
            </Grid>
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

            <Grid item xs={4}>
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

            {/* Update Supplier field to accept any number */}
            <Grid item xs={4}>
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
            <Grid item xs={4}>
              <Controller
                name="measurement_unit"
                control={control}
                defaultValue=""
                rules={{
                  maxLength: {
                    value: 100,
                    message: "Unit must be less than 100 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Units"
                    fullWidth
                    size="small"
                    error={!!errors.measurement_unit}
                    helperText={errors.measurement_unit?.message}
                  />
                )}
              />
            </Grid>
            {/* Add more fields as needed, following the same pattern */}
          </Grid>
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
              onClick={handleCancel}
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
              {isSubmitting ? (
                <CircularProgress size={24} />
              ) : isNewProduct ? (
                "Add Product"
              ) : (
                "Update Product"
              )}
            </Button>
          </Box>
        </form>
      </Box>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
      >
        <Alert
          onClose={() => setErrorMessage(null)}
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
