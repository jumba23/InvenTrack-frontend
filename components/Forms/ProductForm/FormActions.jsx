//component/Forms/ProductForm/FormActions.jsx

import React from "react";
import { Box } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import SubmitButton from "@/components/Buttons/SubmitButton";
import CancelButton from "@/components/Buttons/CancelButton";

/**
 * Form Actions component
 *
 * This component renders the form action buttons.
 * It displays a cancel and submit button for the form.
 * The buttons are disabled when the form is submitting.
 *
 * @param {Function} onCancel - The cancel button click handler
 * @param {Boolean} isSubmitting - A boolean value to determine if the form is submitting
 * @param {Boolean} isNewProduct - A boolean value to determine if the product is new
 *
 */

const FormActions = ({ onCancel, isSubmitting, isNewProduct }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        gap: 2,
        mt: 4,
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: isMobile ? "100%" : "150px", // Full width on mobile, fixed width on desktop
        }}
      >
        <CancelButton onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </CancelButton>
      </Box>
      <Box
        sx={{
          width: isMobile ? "100%" : "150px", // Full width on mobile, fixed width on desktop
        }}
      >
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isNewProduct ? "Add Product" : "Update Product"}
        </SubmitButton>
      </Box>
    </Box>
  );
};

export default FormActions;
