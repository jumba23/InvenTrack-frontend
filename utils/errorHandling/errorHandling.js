// utils/errorHandling/errorHandling.js

/**
 * errorHandling.js
 *
 * This module provides utility functions for handling API errors in a consistent manner.
 * It includes functions to process error responses and set appropriate error messages.
 *
 * Key features:
 * - Handles various types of API errors (network errors, response errors, unexpected errors)
 * - Provides detailed error messages for different scenarios
 * - Allows customization of error messages
 * - Integrates with the ErrorTypes enum for consistent error typing
 *
 * Usage:
 * Import the handleApiError function and use it in your API call catch blocks.
 * Example: import { handleApiError } from './errorHandling';
 */

import { ErrorTypes } from "./errorTypes";

/**
 * Handles API errors and sets an appropriate error message.
 *
 * @param {Error} error - The error object caught from an API call.
 * @param {Function} setErrorMsg - A function to set the error message in the component state.
 * @param {Object} [customMessages] - Optional custom error messages.
 */
export const handleApiError = (error, setErrorMsg, customMessages = {}) => {
  console.error("API Error:", error);

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response.data && error.response.data.error) {
      setErrorMsg({
        type: ErrorTypes.API_ERROR,
        message: error.response.data.error,
      });
    } else {
      setErrorMsg({
        type: ErrorTypes.API_ERROR,
        message:
          customMessages.serverError ||
          `Server error: ${error.response.status}`,
      });
    }
  } else if (error.request) {
    // The request was made but no response was received
    setErrorMsg({
      type: ErrorTypes.NETWORK_ERROR,
      message:
        customMessages.networkError ||
        "Network error. Please check your connection.",
    });
  } else {
    // Something happened in setting up the request that triggered an Error
    setErrorMsg({
      type: ErrorTypes.UNEXPECTED_ERROR,
      message:
        customMessages.unexpectedError || "An unexpected error occurred.",
    });
  }
};

/**
 * Generates a user-friendly error message based on the error code.
 *
 * @param {string} errorCode - The error code received from the API.
 * @returns {string} A user-friendly error message.
 */
export const getUserFriendlyErrorMessage = (errorCode) => {
  const errorMessages = {
    INVALID_CREDENTIALS: "Invalid email or password. Please try again.",
    USER_NOT_FOUND: "User not found. Please check your email or sign up.",
    NETWORK_ERROR:
      "Unable to connect to the server. Please check your internet connection.",
    SERVER_ERROR:
      "We're experiencing technical difficulties. Please try again later.",
    // Add more error codes and messages as needed
  };

  return (
    errorMessages[errorCode] ||
    "An unexpected error occurred. Please try again."
  );
};
