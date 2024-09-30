import React from "react";
import SupplierCard from "../SupplierCard/SupplierCard";

const SupplierCardList = ({
  suppliers,
  expandedCards,
  onToggleExpand,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="pb-20 mt-4">
      {suppliers.map((supplier) => (
        <SupplierCard
          key={supplier.id}
          supplier={supplier}
          expanded={expandedCards[supplier.id]}
          onToggleExpand={onToggleExpand}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default SupplierCardList;
