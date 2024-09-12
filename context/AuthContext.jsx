"use client";

/**
 * AuthContext.js
 *
 * This file defines the authentication context for the application.
 * It manages user authentication state and provides functions for login, logout,
 * and other authentication-related operations.
 *
 * Key features:
 * - Manages authentication state (isAuthenticated, loading, user)
 * - Provides login and logout functionality
 * - Handles initial authentication check on mount
 * - Manages logout modal visibility
 * - Implements last visited route tracking
 * - Integrates with Zustand stores for product preloading and profile management
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
import useProductStore from "@/stores/productStore";
import useProfileStore from "@/stores/profileStore";

const AuthContext = createContext({
  authState: {
    isAuthenticated: false,
    loading: true,
    user: null,
  },
  showLogoutModal: false,
  login: () => {},
  logout: () => {},
  toggleLogoutModal: () => {},
  updateLastRoute: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const router = useRouter();
  const { loadProducts, reset: resetProducts } = useProductStore();
  const { loadProfile, reset: resetProfile } = useProfileStore();
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    loading: true,
    user: null,
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [lastRoute, setLastRoute] = useState("/dashboard");

  // Effect to check authentication status on mount and set up last route
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await validateUser();
        const newAuthState = {
          isAuthenticated: response === "Authenticated",
          loading: false,
          user: response.user, // Assuming the response includes user data
        };
        setAuthState(newAuthState);

        if (newAuthState.isAuthenticated) {
          loadProducts();
          loadProfile(newAuthState.user.id);
        }
      } catch (error) {
        console.error("Authentication check failed", error);
        setAuthState({
          isAuthenticated: false,
          loading: false,
          user: null,
        });
      }
    };

    const storedRoute = localStorage.getItem("lastRoute");
    if (storedRoute) {
      setLastRoute(storedRoute);
    }

    checkAuthStatus();
  }, [loadProducts, loadProfile]);

  // Function to update last visited route
  const updateLastRoute = useCallback((route) => {
    const publicPaths = ["/user/login", "/user/signup", "/"];
    if (!publicPaths.includes(route)) {
      setLastRoute(route);
      localStorage.setItem("lastRoute", route);
    }
  }, []);

  // Login function
  const login = useCallback(
    async (email, password) => {
      try {
        const response = await userLogin(email, password);
        console.log("Login successful:", response.user);
        setAuthState({
          isAuthenticated: true,
          loading: false,
          user: response.user,
        });
        loadProducts();
        loadProfile(response.user.id);
        router.push(lastRoute);
      } catch (error) {
        console.error("Login failed", error);
        setAuthState((prev) => ({ ...prev, isAuthenticated: false }));
        throw error;
      }
    },
    [router, lastRoute, loadProducts, loadProfile]
  );

  // Logout function
  const logout = useCallback(async () => {
    try {
      await userLogout();
      setAuthState({
        isAuthenticated: false,
        loading: false,
        user: null,
      });
      setShowLogoutModal(false);
      resetProducts();
      resetProfile();
      router.push("/");
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  }, [router, resetProducts, resetProfile]);

  // Toggle logout modal visibility
  const toggleLogoutModal = useCallback(() => {
    setShowLogoutModal((prev) => !prev);
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      authState,
      showLogoutModal,
      login,
      logout,
      toggleLogoutModal,
      updateLastRoute,
    }),
    [
      authState,
      showLogoutModal,
      login,
      logout,
      toggleLogoutModal,
      updateLastRoute,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
