"use client";

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
  checkAuth: () => Promise.resolve(),
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

  // Function to check authentication status without user data
  const checkAuth = useCallback(async () => {
    try {
      const response = await validateUser(); // Validate the user token/session
      console.log("Validate token response:", response); // Log the response to debug

      // Only update the isAuthenticated state, since user data isn't available
      if (response === "Authenticated") {
        setAuthState((prev) => ({
          ...prev,
          isAuthenticated: true,
          loading: false,
        }));
        return true;
      } else {
        setAuthState({
          isAuthenticated: false,
          loading: false,
          user: null,
        });
        return false;
      }
    } catch (error) {
      console.error("Authentication check failed", error);
      setAuthState({
        isAuthenticated: false,
        loading: false,
        user: null,
      });
      return false;
    }
  }, []);

  // Login function that returns the user data
  const login = useCallback(
    async (email, password) => {
      try {
        const response = await userLogin(email, password); // Login API
        setAuthState({
          isAuthenticated: true,
          loading: false,
          user: response.user,
        });
        loadProducts(); // Load products based on user data
        loadProfile(response.user.id); // Load user profile using ID from user data
        setShowLogoutModal(false); // Ensure the logout modal is closed after login
        router.push(lastRoute); // Route to the last visited route
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
      await userLogout(); // Logout API call
      setAuthState({
        isAuthenticated: false,
        loading: false,
        user: null,
      });
      resetProducts();
      resetProfile();
      router.push("/"); // Route to home page after logout
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  }, [router, resetProducts, resetProfile]);

  // Toggle logout modal visibility
  const toggleLogoutModal = useCallback(() => {
    setShowLogoutModal((prev) => !prev);
  }, []);

  const contextValue = useMemo(
    () => ({
      authState,
      showLogoutModal,
      login,
      logout,
      toggleLogoutModal,
      checkAuth,
    }),
    [authState, showLogoutModal, login, logout, toggleLogoutModal, checkAuth]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
