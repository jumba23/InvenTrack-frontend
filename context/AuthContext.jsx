"use client";
// use client indicates this module is intended for client-side usage only.

import React, { createContext, useContext, useState, useEffect } from "react";
import { userLogout, validateUser } from "@/utils/api/apiService";
import { useRouter } from "next/navigation";

// Creation of AuthContext with default values. This context will manage the authentication state
// throughout the application.
const AuthContext = createContext({
  isAuthenticated: false,
  showLogoutModal: false,
  loading: true,
  logout: () => {},
  toggleLogoutModal: () => {},
  router: null,
});

/**
 * useAuth is a custom hook that simplifies the access to AuthContext, allowing components
 * to consume the authentication state and related functions easily.
 *
 * @returns {object} The current authentication context value.
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * AuthProvider is a component that wraps the application's component tree to provide
 * a global authentication context. It initializes and manages the authentication state,
 * including user authentication status, logout functionality, and loading states.
 *
 * @param {object} { children } - The child components of the application that will have access to the auth context.
 */
export function AuthProvider({ children }) {
  const router = useRouter(); // Use the Next.js router for redirects on logout.
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for tracking authentication status.
  const [loading, setLoading] = useState(true); // State for tracking loading status during authentication checks.
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    // Effect to perform the authentication check when the component mounts.
    const checkAuthStatus = async () => {
      try {
        const response = await validateUser(); // Call API to validate user session/token.
        setIsAuthenticated(response === "Authenticated"); // Update authentication status based on API response.
      } catch (error) {
        console.error("Authentication check failed", error);
        setIsAuthenticated(false); // Set authentication status to false on error.
      } finally {
        setLoading(false); // Set loading to false once the check is complete.
      }
    };
    checkAuthStatus();
  }, []);

  // Handles user logout action.
  const logout = async () => {
    try {
      await userLogout(); // Call API to perform logout.
      setIsAuthenticated(false); // Reset authentication status.
      setShowLogoutModal(false); // Hide logout modal.
      router.push("/"); // Redirect to home page on logout.
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };

  // Toggles the visibility of the logout modal.
  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  // The value object to be passed to the AuthContext.Provider, making these states and functions
  // available to any component in the application that consumes this context.
  const value = {
    isAuthenticated,
    showLogoutModal,
    logout,
    toggleLogoutModal,
    loading,
    router,
  };

  console.log("AuthContext value", value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
