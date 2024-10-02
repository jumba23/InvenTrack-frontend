// utils/api/errorHandling.js

import { ErrorTypes } from "../errorTypes";

/**
 * errorHandling.js
 *
 * This module provides utility functions for handling API errors in a consistent manner,
 * aligning with the backend's ApiError structure and handling.
 *
 * Key features:
 * - Handles various types of API errors (network errors, response errors, authentication errors, unexpected errors)
 * - Aligns with backend ApiError structure
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
 * @param {number} statusCode - The HTTP status code.
 * @param {Object} [details] - Additional details about the error.
 * @returns {Object} An error object with type, message, statusCode, timestamp, and optional details.
 */
const createErrorObject = (type, message, statusCode, details = null) => ({
  type,
  message,
  statusCode,
  details,
  timestamp: new Date().toISOString(),
});

/**
 * Handles API errors and sets an appropriate error message.
 *
 * @param {Error} error - The error object caught from an API call.
 * @param {Function} setErrorMsg - A function to set the error message in the component state.
 * @param {Object} [customMessages] - Optional custom error messages.
 * @returns {Object} An error object with type, message, and statusCode.
 */
export const handleApiError = (error, setErrorMsg, customMessages = {}) => {
  logError(error);

  // Check if the error is already an ApiError
  if (error.type && error.statusCode) {
    console.log("Error is already processed:", error);
    if (typeof setErrorMsg === "function") {
      setErrorMsg(error);
    }
    return error;
  }

  let errorObj = createErrorObject(
    ErrorTypes.UNEXPECTED_ERROR,
    "An unexpected error occurred.",
    500
  );

  if (error.response) {
    const { status, data } = error.response;

    // Check if the error response matches the backend ApiError structure
    if (data && data.error) {
      errorObj = createErrorObject(
        mapStatusToErrorType(status),
        data.error.message || "An error occurred",
        status,
        data.error.details
      );
    } else {
      // Fallback to existing error handling
      errorObj = handleLegacyError(error, status, customMessages);
    }
  } else if (error.request) {
    errorObj = createErrorObject(
      ErrorTypes.NETWORK_ERROR,
      customMessages.networkError ||
        "Network error. Please check your connection.",
      0 // No status code for network errors
    );
  }

  console.log("Error object created:", errorObj);

  if (typeof setErrorMsg === "function") {
    setErrorMsg(errorObj);
  }

  return errorObj;
};

/**
 * Maps HTTP status codes to error types.
 *
 * @param {number} status - The HTTP status code.
 * @returns {string} The corresponding error type.
 */
const mapStatusToErrorType = (status) => {
  switch (status) {
    case 400:
      return ErrorTypes.VALIDATION_ERROR;
    case 401:
    case 403:
      return ErrorTypes.AUTH_ERROR;
    case 404:
      return ErrorTypes.NOT_FOUND;
    case 500:
      return ErrorTypes.SERVER_ERROR;
    default:
      return ErrorTypes.API_ERROR;
  }
};

/**
 * Handles errors for legacy API responses that don't match the new ApiError structure.
 *
 * @param {Error} error - The original error object.
 * @param {number} status - The HTTP status code.
 * @param {Object} customMessages - Custom error messages.
 * @returns {Object} An error object with type, message, and statusCode.
 */
const handleLegacyError = (error, status, customMessages) => {
  if (status === 400) {
    return createErrorObject(
      ErrorTypes.VALIDATION_ERROR,
      error.response.data?.error ||
        customMessages.invalidInput ||
        "Invalid input. Please check your data.",
      status
    );
  } else if (status === 401 || status === 403) {
    return handleAuthError(error.response, customMessages);
  } else {
    return createErrorObject(
      ErrorTypes.SERVER_ERROR,
      customMessages.serverError || `Server error: ${status}`,
      status
    );
  }
};

/**
 * Handles authentication-specific errors.
 *
 * @param {Object} response - The error response object.
 * @param {Object} customMessages - Custom error messages.
 * @returns {Object} An error object with type, message, and statusCode.
 */
const handleAuthError = (response, customMessages) => {
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

  return createErrorObject(ErrorTypes.AUTH_ERROR, message, status);
};

/**
 * Generates a user-friendly error message based on the error object.
 *
 * @param {Object} error - The error object returned by handleApiError.
 * @returns {string} A user-friendly error message.
 */
export const getUserFriendlyErrorMessage = (error) => {
  const errorMessages = {
    [ErrorTypes.VALIDATION_ERROR]: "Please check your input and try again.",
    [ErrorTypes.AUTH_ERROR]:
      "Authentication failed. Please try again or log in.",
    [ErrorTypes.NOT_FOUND]: "The requested resource was not found.",
    [ErrorTypes.NETWORK_ERROR]:
      "Unable to connect to the server. Please check your internet connection.",
    [ErrorTypes.SERVER_ERROR]:
      "We're experiencing technical difficulties. Please try again later.",
    [ErrorTypes.API_ERROR]:
      "An error occurred while processing your request. Please try again.",
    [ErrorTypes.UNEXPECTED_ERROR]:
      "An unexpected error occurred. Please try again.",
  };

  return (
    errorMessages[error.type] ||
    error.message ||
    "An unexpected error occurred. Please try again."
  );
};
