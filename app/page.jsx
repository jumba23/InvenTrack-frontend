"use client";

import React, { useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import LandingPageLayout from "@/layouts/LandingPageLayout";
import { validateUser } from "@/utils/api/apiService";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await validateUser();
        if (response === "Authenticated") {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Authentication check failed", error);
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, []);

  return isAuthenticated ? <MainLayout /> : <LandingPageLayout />;
}
