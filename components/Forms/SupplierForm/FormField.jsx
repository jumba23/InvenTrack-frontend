//components/Forms/ProductForm/FormField.jsx

import React from "react";
import { TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

/**
 * Form Field component
 *
 * This component renders a form field with validation messages.
 * It uses the react-hook-form Controller component to manage the form state.
 * It renders a Material-UI TextField component with the appropriate props.
 * It also displays an error message if the field has validation errors.
 *
 * @param {String} name - The name of the form field
 * @param {String} label - The label of the form field
 * @param {Object} rules - The validation rules for the form field
 * @param {String} type - The type of the form field (default is "text")
 * @param {Object} control - The form control object from react-hook-form
 * @param {Object} errors - The form errors object from react-hook-form
 * @param {Object} options - Additional options for the TextField component
 *
 */

const FormField = ({
  name,
  label,
  rules,
  type = "text",
  control,
  errors,
  options = {},
}) => (
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

export default FormField;
