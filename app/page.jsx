"use client";

import React from "react";
import IndexLayout from "../layouts/IndexLayout";
import { AuthProvider } from "../context/AuthContext";

//------------------------------------------------------
// Home Component: Entry Point of the Application
// Functionality:
// - Serves as the primary entry point for the InvenTrack application.
// - Utilizes the React useEffect hook to determine the user's authentication status
//   upon component mounting.
// - Makes an API call using the validateUser function from apiService to check
//   if the user is authenticated.
// - Based on the authentication status, it conditionally renders either the MainLayout
//   (for authenticated users) or the LandingPageLayout (for unauthenticated visitors).
// - Wraps the rendered layout components within the AuthProvider context to provide
//   authentication-related state and functionalities to child components.
//
// Usage:
// - This component is automatically rendered as the default page due to Next.js's
//   file-based routing system, representing the root of the application.
//------------------------------------------------------

export default function Home() {
  return (
    <AuthProvider>
      <IndexLayout />
    </AuthProvider>
  );
}
