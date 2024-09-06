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
            <Grid item xs={12}>
              <Controller
                name="short_description"
                control={control}
                defaultValue=""
                rules={{
                  maxLength: {
                    value: 500,
                    message:
                      "Short description must be less than 500 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Short Description"
                    fullWidth
                    size="small"
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
            <Grid item xs={6}>
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
                    size="small"
                    error={!!errors.sku}
                    helperText={errors.sku?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="supplier_id"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel>Supplier</InputLabel>
                    <Select {...field} label="Supplier">
                      <MenuItem value="">None</MenuItem>
                      {/* Add supplier options here */}
                    </Select>
                  </FormControl>
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
              size="small"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              size="small"
            >
              {isNewProduct ? "Add Product" : "Update Product"}
            </Button>
          </Box>
        </form>
      </Box>
    </Card>
  );
};

export default ProductForm;
