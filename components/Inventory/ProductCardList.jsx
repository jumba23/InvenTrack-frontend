// ProductCardList.jsx
import React, { useState } from "react";
import ProductCard from "@/components/Cards/ProductCard";

/**
 * ProductCardList Component
 *
 * This component renders a list of product cards for mobile view.
 *
 * @param {Object} props
 * @param {Array} props.products - The list of products to display
 * @param {function} props.onEdit - Function to call when edit button is clicked
 * @param {function} props.onDelete - Function to call when delete button is clicked
 */
const ProductCardList = ({ products, onEdit, onDelete }) => {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCardExpansion = (productId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <div className="pb-20 mt-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          expanded={expandedCards[product.id]}
          onToggleExpand={toggleCardExpansion}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductCardList;
