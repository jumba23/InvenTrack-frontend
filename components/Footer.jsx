import React from "react";

/**
 * Footer Component
 *
 * @component
 *
 * Purpose:
 * Renders a compact footer of the application with copyright information.
 *
 * Features:
 * - Displays current year dynamically
 * - Sticky positioning at the bottom of the page
 * - Responsive design with reduced height for various screen sizes
 *
 * @example
 * <Footer />
 */
const Footer = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`sticky bottom-0 w-full py-1 md:py-2 text-xs text-center border-t bg-white ${className}`}
    >
      © {currentYear} SoftSolutions. All rights reserved
    </footer>
  );
};

export default Footer;
