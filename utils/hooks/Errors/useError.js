// utils/hooks/Errors/useError.js

import { useState, useCallback } from "react";
import {
  handleApiError,
  getUserFriendlyErrorMessage,
} from "@/utils/api/errorHandling";

export const useError = (initialCustomMessages = {}) => {
  const [error, setError] = useState(null);

  const handleError = useCallback(
    (err, customMessages = {}) => {
      const errorObj = handleApiError(err, (errorObj) => setError(errorObj), {
        ...initialCustomMessages,
        ...customMessages,
      });
      return errorObj;
    },
    [initialCustomMessages]
  );

  const clearError = useCallback(() => setError(null), []);

  const getUserFriendlyError = useCallback(() => {
    return error ? getUserFriendlyErrorMessage(error) : null;
  }, [error]);

  return { error, handleError, clearError, getUserFriendlyError };
};
