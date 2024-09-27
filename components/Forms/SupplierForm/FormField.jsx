//components/Forms/SupplierForm/FormField.jsx

import React from "react";

const FormField = ({ label, type = "text", register, required, errors }) => (
  <div className="form-field">
    <label>{label}</label>
    <input type={type} {...register(label, { required })} />
    {errors[label] && <span>This field is required</span>}
  </div>
);

export default FormField;
