"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useProduct } from "@/context/ProductContext";

const ProductForm = () => {
  const { setRenderForm, isNewProduct } = useProduct();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic here
    reset();
  };

  const handleCancel = () => {
    setRenderForm(false);
    reset();
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: "auto", mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        {isNewProduct ? "Add New Product" : "Edit Product"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
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
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
                  error={!!errors.retail_price_per_unit}
                  helperText={errors.retail_price_per_unit?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
                  error={!!errors.selling_price_per_unit}
                  helperText={errors.selling_price_per_unit?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
                  error={!!errors.quantity}
                  helperText={errors.quantity?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
                  error={!!errors.reorder_point}
                  helperText={errors.reorder_point?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="short_description"
              control={control}
              defaultValue=""
              rules={{
                maxLength: {
                  value: 500,
                  message: "Short description must be less than 500 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Short Description"
                  fullWidth
                  multiline
                  rows={2}
                  error={!!errors.short_description}
                  helperText={errors.short_description?.message}
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
                  message: "Long description must be less than 2000 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Long Description"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.long_description}
                  helperText={errors.long_description?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="sku"
              control={control}
              defaultValue=""
              rules={{
                maxLength: {
                  value: 50,
                  message: "SKU must be less than 50 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="SKU"
                  fullWidth
                  error={!!errors.sku}
                  helperText={errors.sku?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="supplier_id"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Supplier</InputLabel>
                  <Select {...field} label="Supplier">
                    <MenuItem value="">None</MenuItem>
                    {/* Add supplier options here */}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="category_id"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select {...field} label="Category">
                    <MenuItem value="">None</MenuItem>
                    {/* Add category options here */}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="measurement"
              control={control}
              defaultValue=""
              rules={{
                maxLength: {
                  value: 50,
                  message: "Measurement must be less than 50 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Unit of Measurement"
                  fullWidth
                  error={!!errors.measurement}
                  helperText={errors.measurement?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="storage_location"
              control={control}
              defaultValue=""
              rules={{
                maxLength: {
                  value: 255,
                  message: "Storage location must be less than 255 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Storage Location"
                  fullWidth
                  error={!!errors.storage_location}
                  helperText={errors.storage_location?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="note"
              control={control}
              defaultValue=""
              rules={{
                maxLength: {
                  value: 1000,
                  message: "Note must be less than 1000 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Additional Notes"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.note}
                  helperText={errors.note?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="image_url"
              control={control}
              defaultValue=""
              rules={{
                pattern: {
                  value:
                    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                  message: "Please enter a valid URL",
                },
                maxLength: {
                  value: 500,
                  message: "URL must be less than 500 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Image URL"
                  fullWidth
                  error={!!errors.image_url}
                  helperText={errors.image_url?.message}
                />
              )}
            />
          </Grid>
        </Grid>
        <Box
          sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {isNewProduct ? "Add Product" : "Update Product"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default ProductForm;
