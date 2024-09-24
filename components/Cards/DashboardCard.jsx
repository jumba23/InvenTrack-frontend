"use client";
import React from "react";

/**
 * Card Component
 *
 * A reusable card component for wrapping content sections.
 *
 * @component
 * @param {Object} props
 * @param {string} props.title - The title of the card
 * @param {React.ReactNode} props.children - The content to be rendered inside the card
 */
const Card = ({ title, children }) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-md">
      <div className="px-4 pt-5 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
      </div>
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
};

export default Card;
