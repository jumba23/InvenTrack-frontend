import React from "react";
import { useAuth } from "@/context/AuthContext"; // Import the useAuth hook for accessing authentication context
import LandingPageLayout from "./LandingPageLayout"; // Import layout for non-authenticated users
import MainLayout from "./MainLayout"; // Import layout for authenticated users

/** ======================================== SUMMARY ========================================
 * IndexLayout serves as a dynamic layout selector based on the user's authentication status.
 * It determines which layout to render (MainLayout or LandingPageLayout) by checking the user's
 * authentication status provided by the useAuth hook from the global AuthContext.
 *
 * Functionality:
 * - If the user is authenticated (isAuthenticated is true), the MainLayout is rendered,
 *   showing content intended for authenticated users.
 * - If the user is not authenticated (isAuthenticated is false), the LandingPageLayout is rendered,
 *   typically showing a welcome screen or a login/signup prompt.
 *
 * This component acts as a gatekeeper for the application's content, ensuring that certain parts
 * are accessible only to authenticated users, while guiding non-authenticated users to login or register.
 * It's a critical component for managing user experience and content accessibility based on authentication state.
 *
 * Usage:
 * - Place IndexLayout at the root of your application's component tree where it can decide on
 *   rendering the appropriate layout for the entire app based on authentication status.
 * ==========================================================================================*/
const IndexLayout = () => {
  const { isAuthenticated } = useAuth();

  return <>{isAuthenticated ? <MainLayout /> : <LandingPageLayout />}</>;
};

export default IndexLayout;
