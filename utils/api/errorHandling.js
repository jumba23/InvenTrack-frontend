// utils/api/errorHandling.js
import { ErrorTypes } from "../errorTypes";

/**
 * errorHandling.js
 *
 * This module provides utility functions for handling API errors in a consistent manner.
 * It includes functions to process error responses and set appropriate error messages,
 * with special handling for authentication errors.
 *
 * Key features:
 * - Handles various types of API errors (network errors, response errors, authentication errors, unexpected errors)
 * - Provides detailed error messages for different scenarios
 * - Allows customization of error messages
 * - Special handling for authentication-related errors
 *
 * Usage:
 * Import the handleApiError function and use it in your API call catch blocks.
 * Example: import { handleApiError } from './errorHandling';
 */

/**
 * Create Error Logging Function
 */
const logError = (error, additionalInfo = {}) => {
  const logObject = {
    ...error,
    ...additionalInfo,
    timestamp: new Date().toISOString(),
  };
  console.error("API Error - errorHandling:", logObject);
  // Here you could also send the error to a logging service
  // For example:
  // logToService(logObject);
};

/**
 * Create Error Object Function
 *
 * @param {string} type - The type of error.
 * @param {string} message - The error message.
 * @param {Object} [details] - Additional details about the error.
 * @returns {Object} An error object with type, message, timestamp, and optional details.
 */
const createErrorObject = (type, message, details = null) => ({
  type,
  message,
  details,
  timestamp: new Date().toISOString(),
});

/**
 * Handles API errors and sets an appropriate error message.
 *
 * @param {Error} error - The error object caught from an API call.
 * @param {Function} setErrorMsg - A function to set the error message in the component state.
 * @param {Object} [customMessages] - Optional custom error messages.
 * @returns {Object} An error object with type and message.
 */ export const handleApiError = (error, setErrorMsg, customMessages = {}) => {
  logError(error);

  let errorObj = {
    type: "UNEXPECTED_ERROR",
    message: "An unexpected error occurred.",
  };

  if (error.response) {
    const status = error.response.status;
    if (status === 400) {
      errorObj = {
        type: "INVALID_CREDENTIALS",
        message:
          error.response.data?.error ||
          customMessages.invalidCredentials ||
          "Invalid login credentials. Please check your email and password.",
      };
    } else if (status === 401 || status === 403) {
      errorObj = handleAuthError(error.response, customMessages);
    } else if (error.response.data && error.response.data.error) {
      errorObj = createErrorObject(
        ErrorTypes.API_ERROR,
        error.response.data.error,
        { status }
      );
    } else {
      errorObj = createErrorObject(
        ErrorTypes.SERVER_ERROR,
        customMessages.serverError || `Server error: ${status}`,
        { status }
      );
    }
  } else if (error.request) {
    errorObj = {
      type: "NETWORK_ERROR",
      message:
        customMessages.networkError ||
        "Network error. Please check your connection.",
    };
  }

  console.log("Error object created:", errorObj);

  if (typeof setErrorMsg === "function") {
    setErrorMsg(errorObj);
  }

  return errorObj;
};
/**
 * Handles authentication-specific errors.
 *
 * @param {Object} response - The error response object.
 * @param {Object} customMessages - Custom error messages.
 * @returns {Object} An error object with type and message.
 */ const handleAuthError = (response, customMessages) => {
  const status = response.status;
  let message = customMessages.authError || "Authentication failed.";

  if (status === 401) {
    message =
      response.data?.error ||
      customMessages.invalidCredentials ||
      "Invalid credentials. Please check your email and password.";
  } else if (status === 403) {
    message =
      response.data?.error ||
      customMessages.accessDenied ||
      "Access denied. You don't have permission to access this resource.";
  }

  return { type: "AUTH_ERROR", message };
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
    AUTH_ERROR: "Authentication failed. Please try again.",
    // Add more error codes and messages as needed
  };

  return (
    errorMessages[errorCode] ||
    "An unexpected error occurred. Please try again."
  );
};
