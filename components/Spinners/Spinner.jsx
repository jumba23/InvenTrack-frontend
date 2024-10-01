//components/Spinners/Spinner.jsx

import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-32 h-32 border-b-2 border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
