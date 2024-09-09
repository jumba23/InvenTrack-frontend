"use client";

/**
 * AuthContext.js
 *
 * This file defines the authentication context for the application.
 * It provides authentication state and functions to manage user authentication,
 * as well as implementing a background product preloading strategy.
 *
 * Key features:
 * - Manages authentication state (isAuthenticated, loading, user, profile)
 * - Provides login and logout functionality
 * - Handles initial authentication check on mount
 * - Manages logout modal visibility
 * - Implements last visited route tracking
 * - Preloads products in the background after successful authentication
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
import { fetchProducts } from "@/utils/api/apiService"; // Import fetchProducts
import { useRouter } from "next/navigation";
import { useProduct } from "@/context/ProductContext"; // Import useProduct hook

// Define the shape of the context
const AuthContext = createContext({
  authState: {
    isAuthenticated: false,
    loading: true,
    user: null,
    profile: null,
  },
  showLogoutModal: false,
  login: () => {},
  logout: () => {},
  toggleLogoutModal: () => {},
  updateLastRoute: () => {},
  router: null,
});

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const router = useRouter();
  const { setProducts } = useProduct(); // Get setProducts from ProductContext
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    loading: true,
    user: null,
    profile: null,
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
          user: response.user || null,
          profile: response.profile || null,
        };
        setAuthState(newAuthState);

        // Preload products if authenticated
        if (newAuthState.isAuthenticated) {
          preloadProducts();
        }
      } catch (error) {
        console.error("Authentication check failed", error);
        setAuthState({
          isAuthenticated: false,
          loading: false,
          user: null,
          profile: null,
        });
      }
    };

    const storedRoute = localStorage.getItem("lastRoute");
    if (storedRoute) {
      setLastRoute(storedRoute);
    }

    checkAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to preload products
  const preloadProducts = useCallback(async () => {
    try {
      const products = await fetchProducts();
      setProducts(products);
    } catch (error) {
      console.error("Failed to preload products:", error);
    }
  }, [setProducts]);

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
        setAuthState({
          isAuthenticated: true,
          loading: false,
          user: response.user,
          profile: response.profile,
        });
        preloadProducts(); // Preload products after successful login
        router.push(lastRoute);
      } catch (error) {
        console.error("Login failed", error);
        setAuthState((prev) => ({ ...prev, isAuthenticated: false }));
        throw error; // Re-throw to allow handling in the component
      }
    },
    [router, lastRoute, preloadProducts]
  );

  // Logout function
  const logout = useCallback(async () => {
    try {
      await userLogout();
      setAuthState({
        isAuthenticated: false,
        loading: false,
        user: null,
        profile: null,
      });
      setShowLogoutModal(false);
      localStorage.removeItem("user");
      setProducts([]); // Clear products on logout
      router.push("/");
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  }, [router, setProducts]);

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
      router,
    }),
    [
      authState,
      showLogoutModal,
      login,
      logout,
      toggleLogoutModal,
      updateLastRoute,
      router,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
