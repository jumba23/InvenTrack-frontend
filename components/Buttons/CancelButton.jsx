import React from "react";
import PropTypes from "prop-types";

/**
 * CancelButton Component
 *
 * A reusable button component with secondary styling.
 * This is typically used for secondary actions such as cancel.
 *
 * @component
 * @param {Object} props
 * @param {string} props.children - The text content of the button
 * @param {string} props.className - Additional classes to apply to the button
 * @param {Function} props.onClick - The click handler function
 */

const CancelButton = ({ children, className, onClick, ...props }) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium text-white bg-purple-500 border border-purple-600 rounded-full transition-colors duration-300 ease-in-out hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 w-full ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

CancelButton.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default CancelButton;
