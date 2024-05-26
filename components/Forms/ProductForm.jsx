"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Grid,
  InputLabel,
  FormControl,
} from "@mui/material";

const newItemSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.string().min(1, "Type is required"),
  purchasePrice: z
    .number()
    .positive("Purchase price must be a positive number"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  salesRep: z.string().min(1, "Sales Rep is required"),
  lowLevels: z
    .number()
    .int()
    .nonnegative("Low Levels must be a non-negative integer"),
});

const ProductForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(newItemSchema),
  });

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-grow p-4 overflow-hidden bg-white rounded-lg"
    >
      <Typography variant="h5" align="center" gutterBottom>
        Add New Product
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="type"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select {...field} error={!!errors.type}>
                  <MenuItem value="Type1">Retail</MenuItem>
                  <MenuItem value="Type2">Service</MenuItem>
                  {/* <MenuItem value="Type3">Type 3</MenuItem> */}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="purchasePrice"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Purchase Price"
                type="number"
                fullWidth
                error={!!errors.purchasePrice}
                helperText={errors.purchasePrice?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="quantity"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Quantity"
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
            name="salesRep"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Sales Rep"
                fullWidth
                error={!!errors.salesRep}
                helperText={errors.salesRep?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="lowLevels"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Low Levels"
                type="number"
                fullWidth
                error={!!errors.lowLevels}
                helperText={errors.lowLevels?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          {/* Add Submit button and cancel buttons on the same line */}
          <div className="flex justify-end gap-6">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={() => reset()}
            >
              Cancel
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;
