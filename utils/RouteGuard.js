"use client";

/**
 * RouteGuard.js
 *
 * This component provides route protection for the application.
 * It checks the user's authentication status and controls access to routes.
 *
 * Key features:
 * - Protects routes based on authentication status
 * - Allows specification of public routes that don't require authentication
 * - Handles route changes and updates authorization accordingly
 * - Displays a loading state while checking authentication
 *
 * Usage:
 * Wrap your app or protected routes with <RouteGuard>
 * Make sure to use it inside the AuthProvider
 */

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LogoSpinner from "@/components/Spinners/LogoSpinner";

// List of routes that don't require authentication
const PUBLIC_PATHS = ["/user/login", "/user/signup", "/"];

export function RouteGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading } = useAuth();
  const [authorized, setAuthorized] = useState(false);

  // Function to check if the current route is authorized
  const authCheck = useCallback(
    (url) => {
      const path = url.split("?")[0];
      if (!isAuthenticated && !PUBLIC_PATHS.includes(path)) {
        setAuthorized(false);
        router.push("/user/login");
      } else {
        setAuthorized(true);
      }
    },
    [isAuthenticated, router]
  );

  useEffect(() => {
    // Check authorization when component mounts or auth status changes
    authCheck(pathname);

    // Set up a listener for route changes
    const handleRouteChange = () => authCheck(pathname);

    // Listen for route changes
    window.addEventListener("popstate", handleRouteChange);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [isAuthenticated, pathname, authCheck]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LogoSpinner />
      </div>
    );
  }

  // Render children only if authorized
  return authorized ? children : null;
}
