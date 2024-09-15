// utils/errorHandling/errorMessages.js

import { ErrorTypes } from "./errorTypes";

/**
 * errorMessages.js
 *
 * This module provides a centralized way to manage error messages for different error types.
 * It exports a function that returns appropriate error messages based on the error type and details.
 *
 * Usage:
 * Import the getErrorMessage function and use it to get error messages for specific error types.
 * Example: import { getErrorMessage } from './errorMessages';
 */

/**
 * Returns an error message based on the error type and optional details.
 *
 * @param {string} errorType - The type of error from ErrorTypes enum.
 * @param {string} [details=""] - Additional details about the error.
 * @returns {string} A user-friendly error message.
 */
export const getErrorMessage = (errorType, details = "") => {
  const messages = {
    [ErrorTypes.API_ERROR]: `An error occurred while fetching data. ${details}`,
    [ErrorTypes.NETWORK_ERROR]:
      "Unable to connect to the server. Please check your internet connection.",
    [ErrorTypes.AUTHENTICATION_ERROR]:
      "Authentication failed. Please log in again.",
    [ErrorTypes.VALIDATION_ERROR]: `Validation error: ${details}`,
    [ErrorTypes.UNEXPECTED_ERROR]:
      "An unexpected error occurred. Please try again later.",
  };

  return messages[errorType] || "An error occurred.";
};
