"use client";

/**
 * AuthContext.js
 *
 * This file defines the authentication context for the application.
 * It provides authentication state and functions to manage user authentication.
 *
 * Key features:
 * - Manages authentication state (isAuthenticated, loading)
 * - Provides login and logout functionality
 * - Handles initial authentication check on mount
 * - Manages logout modal visibility
 *
 * Usage:
 * Wrap your app with <AuthProvider> and use the useAuth hook in child components
 * to access authentication state and functions.
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { userLogout, validateUser, userLogin } from "@/utils/api/apiService";
import { useRouter } from "next/navigation";

// Define the shape of the context
const AuthContext = createContext({
  isAuthenticated: false,
  showLogoutModal: false,
  loading: true,
  login: () => {},
  logout: () => {},
  toggleLogoutModal: () => {},
  router: null,
});

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Effect to check authentication status on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await validateUser();
        setIsAuthenticated(response === "Authenticated");
        console.log(
          "Auth check completed. isAuthenticated:",
          response === "Authenticated"
        );
      } catch (error) {
        console.error("Authentication check failed", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  // Login function
  const login = useCallback(
    async (email, password) => {
      console.log("authContext login function called", email, password);
      try {
        const response = await userLogin(email, password);
        setIsAuthenticated(true);
        console.log("Login successful, isAuthenticated set to true");
        router.push("/dashboard");
      } catch (error) {
        console.error("Login failed", error);
        setIsAuthenticated(false);
        throw error; // Re-throw to allow handling in the component
      }
    },
    [router]
  );

  // Logout function
  const logout = useCallback(async () => {
    try {
      await userLogout();
      setIsAuthenticated(false);
      setShowLogoutModal(false);
      console.log("Logout successful, isAuthenticated set to false");
      localStorage.removeItem("user");
      router.push("/");
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  }, [router]);

  // Toggle logout modal visibility
  const toggleLogoutModal = useCallback(() => {
    setShowLogoutModal((prev) => !prev);
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      showLogoutModal,
      loading,
      login,
      logout,
      toggleLogoutModal,
      router,
    }),
    [
      isAuthenticated,
      showLogoutModal,
      loading,
      login,
      logout,
      toggleLogoutModal,
      router,
    ]
  );

  console.log("AuthContext value", contextValue);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
