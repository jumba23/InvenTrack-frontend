//components/Buttons/SubmitButton.jsx

import React from "react";
import PropTypes from "prop-types";

/**
 * SubmitButton Component
 *
 * A reusable button component with primary styling.
 * This is typically used for submit or primary actions in forms.
 *
 * @component
 * @param {Object} props
 * @param {string} props.children - The text content of the button
 * @param {string} props.className - Additional classes to apply to the button
 * @param {Function} props.onClick - The click handler function
 */

const SubmitButton = ({ children, className, onClick, ...props }) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-700 rounded-full transition-colors duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

SubmitButton.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default SubmitButton;
