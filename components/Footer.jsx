import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="sticky bottom-0 w-full text-xs text-center border-y-2">
      © {currentYear} SoftSolutions. All rights reserved
    </div>
  );
};

export default Footer;
