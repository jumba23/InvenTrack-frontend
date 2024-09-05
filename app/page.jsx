"use client";

import React from "react";
import LandingPageLayout from "@/layouts/LandingPageLayout";
import MainLayout from "@/layouts/MainLayout";
import { useAuth } from "@/context/AuthContext";

//------------------------------------------------------
// Functionality:
// - This page serves as the entry point for the application.
//
// Usage:
// - The Home component is the default page that users see when they visit the application.

/** ======================================== SUMMARY ========================================
 * Home is the main entry point for the application, determining the layout to render based on
 * the user's authentication status. It uses the useAuth hook to access the global authentication
 * context and decide whether to render the MainLayout or LandingPageLayout.
 * ==========================================================================================*/
//------------------------------------------------------

export default function Home() {
  const { isAuthenticated } = useAuth();

  return <>{isAuthenticated ? <MainLayout /> : <LandingPageLayout />}</>;
}
