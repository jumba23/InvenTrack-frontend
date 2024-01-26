import React, { createContext, useContext, useState, useEffect } from "react";
import { userLogout, validateUser } from "@/utils/api/apiService";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    // Perform the authentication check when the component mounts.
    const checkAuthStatus = async () => {
      console.log("AuthProvider: checkAuthStatus");
      try {
        const response = await validateUser();
        console.log("AuthProvider: validateUser response", response);
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
    console.log("AuthProvider: toggleLogoutModal");
    setShowLogoutModal(!showLogoutModal);
  };

  // value object to be passed to the AuthContext.Provider
  const value = {
    isAuthenticated,
    setIsAuthenticated,
    logout,
    showLogoutModal,
    toggleLogoutModal,
    loading,
  };

  console.log("AuthProvider: Value", value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
