// utils/hooks/Errors/useAuthError.js

import { useState, useCallback } from "react";
import {
  handleApiError,
  getUserFriendlyErrorMessage,
} from "@/utils/api/errorHandling";

export const useAuthError = () => {
  const [authError, setAuthError] = useState(null);

  const handleAuthError = useCallback((error) => {
    // If error is already processed, just set it
    if (error.type && error.statusCode) {
      setAuthError(error);
      return error;
    }

    const errorObj = handleApiError(
      error,
      (errorObj) => {
        setAuthError(errorObj);
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

  const getUserFriendlyAuthError = useCallback(() => {
    return authError ? getUserFriendlyErrorMessage(authError) : null;
  }, [authError]);

  return {
    authError,
    handleAuthError,
    clearAuthError,
    getUserFriendlyAuthError,
  };
};
