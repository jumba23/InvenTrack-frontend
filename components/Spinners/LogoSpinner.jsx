// components/Spinners/LogoSpinner.jsx
import React from "react";
import Image from "next/image"; // Replace with <img> if not using Next.js
import { Box } from "@mui/material";

const LogoSpinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <div className="animate-pulse">
        <Image
          src="/images/logo.png"
          alt="InvenTrack Logo"
          priority
          width={150}
          height={150}
          style={{ width: "auto", height: "auto" }}
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
        />
      </div>
    </Box>
  );
};

export default LogoSpinner;
