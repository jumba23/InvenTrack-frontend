// utils/hooks/Errors/useAuthError.js

import { useState, useCallback } from "react";
import { handleApiError } from "@/utils/api/errorHandling";

export const useAuthError = () => {
  const [authError, setAuthError] = useState(null);

  const handleAuthError = useCallback((error) => {
    const errorObj = handleApiError(
      error,
      () => {
        setAuthError(error);
      },
      {
        invalidCredentials:
          "Invalid credentials. Please check your email and password.",
        accessDenied:
          "Access denied. You don't have permission to access this resource.",
        authError: "Authentication failed. Please try again.",
      }
    );
    return errorObj;
  }, []);

  const clearAuthError = useCallback(() => {
    setAuthError(null);
  }, []);

  return { authError, handleAuthError, clearAuthError };
};
