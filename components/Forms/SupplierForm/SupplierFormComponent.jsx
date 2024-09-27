//components/Forms/SupplierForm/SupplierFormComponent.jsx

import React from "react";
import { useForm } from "react-hook-form";
import FormActions from "./FormActions";
import FormField from "./FormField";
import FormSection from "./FormSection";

const SupplierFormComponent = ({ supplier = null, onSubmitSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: supplier || { name: "", contact_person: "", phone: "" },
  });

  const onSubmit = async (data) => {
    // submit logic here (using zustand store)
    reset();
    onSubmitSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSection title="Supplier Information">
        <FormField
          label="name"
          register={register}
          required={true}
          errors={errors}
        />
        <FormField
          label="contact_person"
          register={register}
          required={false}
          errors={errors}
        />
        <FormField
          label="phone"
          register={register}
          required={false}
          errors={errors}
        />
      </FormSection>
      <FormActions onCancel={reset} />
    </form>
  );
};

export default SupplierFormComponent;
