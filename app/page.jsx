"use client";

import React from "react";
import LandingPageLayout from "@/layouts/LandingPageLayout";
import MainLayout from "@/layouts/MainLayout";
import { useAuth } from "@/context/AuthContext";
import SkeletonScreen from "./SkeletonScreen";

/**
 * ======================================== SUMMARY ========================================
 * Home Component
 *
 * Purpose:
 * Serves as the main entry point for the InvenTrack application in a Next.js 14 environment.
 *
 * Functionality:
 * - Utilizes the useAuth hook to determine the user's authentication status and loading state.
 * - Conditionally renders MainLayout, LandingPageLayout, or SkeletonScreen based on auth state and loading.
 * - Acts as a client-side component to enable dynamic rendering based on auth state.
 *
 * Key Next.js 14 Considerations:
 * - Uses "use client" directive for client-side rendering, necessary for hooks and dynamic content.
 * - Leverages Next.js 14's improved client-side navigation and rendering capabilities.
 *
 * Components:
 * - MainLayout: Rendered for authenticated users, containing the main application interface.
 * - LandingPageLayout: Displayed for non-authenticated users, typically showing marketing content.
 * - SkeletonScreen: Custom loading component shown during authentication checks.
 *
 * Performance Optimization:
 * - Implements SkeletonScreen for improved perceived performance during authentication checks.
 * - Ensures smooth transition between authentication states without jarring UI changes.
 *
 * Usage:
 * - Automatically used by Next.js as the root page ("/") of the application.
 * - Handles routing to appropriate layouts based on user authentication status.
 *
 * ===========================================================================================
 */

export default function Home() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <SkeletonScreen />;
  }

  return isAuthenticated ? <MainLayout /> : <LandingPageLayout />;
}
