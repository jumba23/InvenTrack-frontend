// components/Inventory/ProductCardList.jsx

import React from "react";
import ProductCard from "@/components/Inventory/ProductCard/ProductCard";

/**
 * ProductCardList Component
 *f
 * This component renders a list of product cards for mobile view.
 * It handles the expansion state of each card and provides edit and delete functionality.
 *
 * @param {Object[]} products - Array of product data to be displayed
 * @param {Object} expandedCards - Object tracking the expansion state of each card
 * @param {function} onToggleExpand - Function to handle toggling card expansion
 * @param {function} onEdit - Function to handle editing a product
 * @param {function} onDelete - Function to handle deleting a product
 */
const ProductCardList = ({
  products,
  expandedCards,
  onToggleExpand,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="pb-20 mt-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          expanded={expandedCards[product.id]}
          onToggleExpand={onToggleExpand}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductCardList;
