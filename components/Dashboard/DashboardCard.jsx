//components/Dashboard/DashboardCard.jsx

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
const Card = ({ title, children, className }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden h-full ${className}`}
    >
      <div className="px-4 pt-5 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
      </div>
      <div className="px-4 py-5 sm:p-6 h-[calc(100%-4rem)]">{children}</div>
    </div>
  );
};

export default Card;
