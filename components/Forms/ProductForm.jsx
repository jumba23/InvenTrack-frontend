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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSupplier } from "@/utils/hooks/useSupplier";

/**
 * ProductForm Component
 *
 * A responsive form component for adding or editing products in the inventory.
 * It adapts to both desktop and mobile layouts, filling the available space
 * and centering content for optimal user experience.
 *
 * @param {Object} initialData - The initial product data for editing (optional)
 * @param {Function} onSubmit - Callback function to handle form submission
 * @param {Function} onCancel - Callback function to handle form cancellation
 * @param {boolean} isNewProduct - Flag to indicate if this is a new product or being edited
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
  const [errorMessage, setErrorMessage] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const onSubmitForm = async (data) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await onSubmit(data, (errorObj) => {
        if (errorObj && errorObj.message) {
          setErrorMessage(errorObj.message);
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

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMessage(null);
  };

  const renderField = (name, label, rules, type = "text", options = {}) => (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          fullWidth
          size="small"
          error={!!errors[name]}
          helperText={errors[name]?.message}
          {...options}
        />
      )}
    />
  );

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
              {isMobile ? (
                // Mobile layout
                formSections.map((section, index) => (
                  <Accordion
                    key={index}
                    defaultExpanded={index === 0}
                    sx={{ mb: 2 }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1">
                        {section.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        {section.fields.map((field) => (
                          <Grid item xs={12} key={field.name}>
                            {field.name === "category_id" ? (
                              <Controller
                                name="category_id"
                                control={control}
                                rules={field.rules}
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
                                      <Typography
                                        variant="caption"
                                        color="error"
                                      >
                                        {errors.category_id.message}
                                      </Typography>
                                    )}
                                  </FormControl>
                                )}
                              />
                            ) : field.name === "supplier_id" ? (
                              <Controller
                                name="supplier_id"
                                control={control}
                                rules={field.rules}
                                render={({ field }) => (
                                  <FormControl
                                    fullWidth
                                    size="small"
                                    error={!!errors.supplier_id}
                                  >
                                    <InputLabel>Supplier</InputLabel>
                                    <Select {...field} label="Supplier">
                                      {suppliers.map((supplier) => (
                                        <MenuItem
                                          key={supplier.id}
                                          value={supplier.id}
                                        >
                                          {supplier.name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                    {errors.supplier_id && (
                                      <Typography
                                        variant="caption"
                                        color="error"
                                      >
                                        {errors.supplier_id.message}
                                      </Typography>
                                    )}
                                  </FormControl>
                                )}
                              />
                            ) : (
                              renderField(
                                field.name,
                                field.label,
                                field.rules,
                                field.type,
                                field.options
                              )
                            )}
                          </Grid>
                        ))}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                // Desktop layout
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  {formSections.map((section, sectionIndex) => (
                    <React.Fragment key={sectionIndex}>
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          sx={{
                            fontWeight: "bold",
                            mt: sectionIndex > 0 ? 4 : 0,
                          }}
                        >
                          {section.title}
                        </Typography>
                      </Grid>
                      {section.fields.map((field) => (
                        <Grid item xs={6} key={field.name}>
                          {field.name === "category_id" ? (
                            <Controller
                              name="category_id"
                              control={control}
                              rules={field.rules}
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
                          ) : field.name === "supplier_id" ? (
                            <Controller
                              name="supplier_id"
                              control={control}
                              rules={field.rules}
                              render={({ field }) => (
                                <FormControl
                                  fullWidth
                                  size="small"
                                  error={!!errors.supplier_id}
                                >
                                  <InputLabel>Supplier</InputLabel>
                                  <Select {...field} label="Supplier">
                                    {suppliers.map((supplier) => (
                                      <MenuItem
                                        key={supplier.id}
                                        value={supplier.id}
                                      >
                                        {supplier.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                  {errors.supplier_id && (
                                    <Typography variant="caption" color="error">
                                      {errors.supplier_id.message}
                                    </Typography>
                                  )}
                                </FormControl>
                              )}
                            />
                          ) : (
                            renderField(
                              field.name,
                              field.label,
                              field.rules,
                              field.type,
                              field.options
                            )
                          )}
                        </Grid>
                      ))}
                    </React.Fragment>
                  ))}
                </Grid>
              )}

              {/* Form Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 4,
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
            </Box>
          </form>
        </Box>
      </Card>

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
    </Box>
  );
};

export default ProductForm;
