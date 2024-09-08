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
 * - Integrates with the updated AuthContext for more robust auth checks
 *
 * Usage:
 * Wrap your app or protected routes with <RouteGuard>
 * Make sure to use it inside the AuthProvider
 */

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LogoSpinner from "@/components/Spinners/LogoSpinner";

// List of routes that don't require authentication
const PUBLIC_PATHS = ["/user/login", "/user/signup", "/"];

export function RouteGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { authState, updateLastRoute } = useAuth();
  const { isAuthenticated, loading } = authState;

  useEffect(() => {
    // Function to check if the current route is authorized
    const authCheck = () => {
      const path = pathname.split("?")[0];
      if (!isAuthenticated && !PUBLIC_PATHS.includes(path)) {
        router.push("/user/login");
      } else if (!PUBLIC_PATHS.includes(path)) {
        // Update last route if it's not a public path
        updateLastRoute(path);
      }
    };

    // Perform auth check when auth state changes or route changes
    if (!loading) {
      authCheck();
    }
  }, [isAuthenticated, loading, pathname, router, updateLastRoute]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LogoSpinner />
      </div>
    );
  }

  // Render children if not loading, letting the effect handle redirects
  return children;
}
