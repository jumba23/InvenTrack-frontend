// components/ErrorBoundary/ErrorBoundary.jsx

"use client";

import React, { useState, useEffect } from "react";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";
import { ErrorTypes } from "@/utils/errorHandling/errorTypes";

/**
 * ErrorBoundary Component
 *
 * This component catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - The child components to be rendered within the error boundary.
 */
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const errorHandler = (event) => {
      console.error("Error caught by ErrorBoundary:", event.error);
      setHasError(true);
      setError({
        type: ErrorTypes.UNEXPECTED_ERROR,
        message: event.error.message || "An unexpected error occurred",
      });
    };

    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  if (hasError) {
    return <ErrorDisplay error={error} />;
  }

  return children;
};

export default ErrorBoundary;
