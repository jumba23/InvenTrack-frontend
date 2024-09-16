// hooks/useAuthError.js

import { useState } from "react";
import { handleApiError } from "../utils/errorHandling";

export const useAuthError = () => {
  const [authError, setAuthError] = useState(null);

  const handleAuthError = (error) => {
    const errorObj = handleApiError(error, setAuthError, {
      invalidCredentials:
        "Invalid credentials. Please check your email and password.",
      accessDenied:
        "Access denied. You don't have permission to access this resource.",
      authError: "Authentication failed. Please try again.",
    });
    return errorObj;
  };

  const clearAuthError = () => setAuthError(null);

  return { authError, handleAuthError, clearAuthError };
};
