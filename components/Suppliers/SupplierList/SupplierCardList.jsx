import React from "react";
import SupplierCard from "../SupplierCard/SupplierCard";

const SupplierCardList = ({ suppliers, expandedCards, onToggleExpand }) => {
  return (
    <div className="pb-20 mt-4">
      {suppliers.map((supplier) => (
        <SupplierCard
          key={supplier.id}
          supplier={supplier}
          expanded={expandedCards[supplier.id]}
          onToggleExpand={onToggleExpand}
        />
      ))}
    </div>
  );
};

export default SupplierCardList;
