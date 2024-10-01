// utils/hooks/Errors/useError.js

import { useState, useCallback } from "react";
import { handleApiError } from "@/utils/api/errorHandling";

export const useError = (initialCustomMessages = {}) => {
  const [error, setError] = useState(null);

  const handleError = useCallback(
    (err, customMessages = {}) => {
      const errorObj = handleApiError(err, setError, {
        ...initialCustomMessages,
        ...customMessages,
      });
      return errorObj;
    },
    [initialCustomMessages]
  );

  const clearError = useCallback(() => setError(null), []);

  return { error, handleError, clearError };
};
