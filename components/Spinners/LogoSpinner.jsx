// components/LogoSpinner.jsx
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
        />
      </div>
    </Box>
  );
};

export default LogoSpinner;
