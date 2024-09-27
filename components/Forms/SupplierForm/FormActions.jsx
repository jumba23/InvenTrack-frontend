//components/Forms/SupplierForm/FormActions.jsx

import React from "react";

const FormActions = ({ onCancel, onSubmit, isSubmitting }) => {
  return (
    <div className="form-actions">
      <button type="button" onClick={onCancel} disabled={isSubmitting}>
        Cancel
      </button>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default FormActions;
