"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { userLogout, validateUser } from "@/utils/api/apiService";
import { useRouter } from "next/navigation";

const AuthContext = createContext({
  isAuthenticated: false,
  showLogoutModal: false,
  loading: true,
  logout: () => {},
  toggleLogoutModal: () => {},
  router: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    // Perform the authentication check when the component mounts.
    const checkAuthStatus = async () => {
      try {
        const response = await validateUser();
        setIsAuthenticated(response === "Authenticated");
      } catch (error) {
        console.error("Authentication check failed", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  // user "logout" action handler
  const logout = async () => {
    try {
      await userLogout();
      setIsAuthenticated(false);
      setShowLogoutModal(false);
      router.push("/");
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };

  // toggle logout modal
  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  // value object to be passed to the AuthContext.Provider
  const value = {
    isAuthenticated,
    showLogoutModal,
    logout,
    toggleLogoutModal,
    loading,
    router,
  };

  console.log("AuthProvider: Value", value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
