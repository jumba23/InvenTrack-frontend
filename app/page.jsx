"use client";

import React, { useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import LandingPageLayout from "@/layouts/LandingPageLayout";
import { validateUser } from "@/utils/api/apiService";

//------------------------------------------------------
// The Home component acts as the primary entry point for the application.
// It determines whether to display the MainLayout (for authenticated users)
// or the LandingPageLayout (for unauthenticated visitors). This decision is
// based on the user's authentication status, verified through an API call to
// the backend using the validateUser function from apiService.
//------------------------------------------------------

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    // useEffect hook to check the authentication status when the component mounts.
    const checkAuthStatus = async () => {
      try {
        const response = await validateUser();
        if (response === "Authenticated") {
          setIsAuthenticated(true);
          a;
        }
      } catch (error) {
        // console.error("Authentication check failed - Application level", error);
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, []);

  // Conditionally render MainLayout or LandingPageLayout based on the user's authentication status.
  return isAuthenticated ? <MainLayout /> : <LandingPageLayout />;
}
