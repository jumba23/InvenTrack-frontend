"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LogoSpinner from "@/components/Spinners/LogoSpinner";
import ErrorDisplay from "@/components/ErrorDisplay/ErrorDisplay";

/**
 * ===================================== SUMMARY =====================================
 *
 * RouteGuard Component
 *
 * Purpose:
 * The `RouteGuard` component is used to protect certain routes in the application,
 * ensuring that only authenticated users can access them. It checks the user's
 * authentication status using the `AuthContext` and redirects unauthenticated users
 * to the login page if they attempt to access a protected route.
 *
 * Key Features:
 * 1. **Route Protection**:
 *    - Checks if the user is authenticated before allowing access to non-public routes.
 *    - Public routes (login, signup, homepage) can be accessed without authentication.
 *
 * 2. **Redirect Handling**:
 *    - If an unauthenticated user attempts to access a protected route, they are
 *      automatically redirected to the `/user/login` page.
 *
 * 3. **Loading Indicator**:
 *    - While authentication status is being verified, a loading spinner (`LogoSpinner`)
 *      is displayed to enhance user experience.
 *
 * 4. **Error Handling**:
 *    - Catches and displays authentication-related errors using the `ErrorDisplay` component.
 *    - Provides an option to retry the authentication check when an error occurs.
 *
 * Core Flow:
 * 1. **Authentication Check**:
 *    - On every route change, the `RouteGuard` component runs an authentication check.
 *    - If the user is not authenticated and the route is not public, they are redirected
 *      to the login page.
 *
 * 2. **Route Protection**:
 *    - If the route is public (e.g., login, signup), no redirection occurs even if
 *      the user is unauthenticated.
 *
 * 3. **Loading State**:
 *    - While the authentication status is being determined, the page is temporarily
 *      blocked, and a loading spinner is displayed to indicate that a background check is in progress.
 *
 * 4. **Error State**:
 *    - If an error occurs during the authentication check, an error message is displayed
 *      with an option to retry the check.
 *
 * Props:
 * - `children`: The child components (e.g., pages) to be conditionally rendered
 *   based on the user's authentication status.
 *
 * Important Constants:
 * - `PUBLIC_PATHS`: Defines the list of routes that are publicly accessible without authentication.
 *
 * Usage:
 * - Wrap the `RouteGuard` around pages or components that require authentication
 *   to ensure only authenticated users can access them.
 *
 * Example:
 *
 * ```jsx
 * <RouteGuard>
 *   <ProtectedPage />
 * </RouteGuard>
 * ```
 *
 * The `RouteGuard` ensures that `ProtectedPage` is only accessible by authenticated users.
 * If the user is unauthenticated, they are redirected to the login page.
 *
 * ===================================================================================
 */

// Define public paths that do not require authentication
const PUBLIC_PATHS = ["/user/login", "/user/signup", "/"];

/**
 * RouteGuard Component:
 * - This component guards routes from unauthenticated access.
 * - It checks the user's authentication status and conditionally renders
 *   protected content or redirects the user to a login page.
 * - Now includes error handling for authentication checks.
 */
export function RouteGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading, checkAuth, error, clearError } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [localError, setLocalError] = useState(null);
  /**
   * useEffect:
   * - Runs when the route (`pathname`) changes.
   * - Executes the authentication check and handles redirection based on the result.
   */
  const performAuthCheck = async () => {
    setIsChecking(true);
    setLocalError(null);
    clearError();

    try {
      const isAuthenticated = await checkAuth(); // Check if the user is authenticated
      const path = pathname.split("?")[0]; // Get the current path (ignore query params)
      // If the user is not authenticated and trying to access a protected route, redirect to login
      if (!isAuthenticated && !PUBLIC_PATHS.includes(path)) {
        router.push("/user/login");
      }
    } catch (err) {
      console.error("Authentication check failed:", err);
      setLocalError(err);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    performAuthCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, router, checkAuth]);
  /**
   * Conditional rendering:
   * - If the authentication check is in progress (`isChecking`) or the global auth state
   *   indicates loading, show a loading spinner.
   */ if (isChecking || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LogoSpinner />
      </div>
    );
  }

  if (localError || error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ErrorDisplay error={localError || error} onRetry={performAuthCheck} />
      </div>
    );
  }

  return children;
}
