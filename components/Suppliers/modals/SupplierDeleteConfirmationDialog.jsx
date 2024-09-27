//components/Suppliers/modals/SupplierDeleteConfirmationDialog.jsx

import React from "react";
import useSupplierStore from "@/stores/supplierStore";

const SupplierDeleteConfirmationDialog = ({ supplierId, onClose }) => {
  const { deleteSupplier } = useSupplierStore();

  const handleDelete = async () => {
    await deleteSupplier(supplierId);
    onClose();
  };

  return (
    <div className="modal">
      <p>Are you sure you want to delete this supplier?</p>
      <button onClick={handleDelete}>Yes</button>
      <button onClick={onClose}>No</button>
    </div>
  );
};

export default SupplierDeleteConfirmationDialog;
