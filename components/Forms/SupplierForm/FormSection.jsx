//components/Forms/SupplierForm/FormSection.jsx

import React from "react";

const FormSection = ({ title, children }) => (
  <div className="form-section">
    <h3>{title}</h3>
    {children}
  </div>
);

export default FormSection;
