import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext, useAuth } from "@/context/AuthContext"; // Import the context where authentication state is managed
import { validateUser } from "@/utils/api/apiService";

/**
 * This custom hook is designed to manage route protection based on the user's authentication status.
 * It leverages the global authentication context to determine if a user is authenticated and
 * redirects users based on their authentication status.
 *
 * - If the user's authentication status is not yet determined (`isAuthenticated` is null),
 *   it attempts to validate the user's session/token.
 * - If the user is authenticated (`isAuthenticated` is true), and they are not on the `redirectUrl`,
 *   they are optionally redirected to a specified URL (e.g., a dashboard page).
 * - If the user is not authenticated (`isAuthenticated` is false), they are redirected to the login page.
 *
 * This hook ensures that certain parts of the application are accessible only to authenticated users
 * and helps in redirecting users to appropriate pages based on their authentication status.
 *
 * @param {string} redirectUrl - The URL to redirect authenticated users to. Defaults to "/dashboard".
 */
export const useRequireAuth = (redirectUrl = "/dashboard") => {
  const router = useRouter(); // Next.js Router instance for navigation

  useEffect(() => {
    // Only proceed if the router is ready, to avoid "router not mounted" errors
    if (!router.isReady) return;

    // Effect to run the authentication check on component mount
    if (isAuthenticated === null) {
      // Authentication state is uninitialized, validate token
      validateUser().catch(() => {
        // Token validation failed, redirect to login page
        router.push("user/login");
      });
    } else if (!isAuthenticated) {
      // User is not authenticated, redirect to login page
      router.push("user/login");
    } else {
      // User is authenticated, redirect to the specified URL if necessary
      if (router.pathname !== redirectUrl) {
        router.push(redirectUrl);
      }
    }
  }, [router.isReady, validateUser, router, redirectUrl]);
  // Dependencies array now includes router.isReady to ensure the effect runs only after the router is fully ready,
  // along with isAuthenticated to re-run the effect if authentication status changes,
  // validateToken function to ensure it's called when needed, router for navigation, and redirectUrl to handle changes in redirection target.
};
