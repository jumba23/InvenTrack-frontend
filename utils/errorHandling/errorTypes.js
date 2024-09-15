// utils/errorHandling/errorTypes.js

/**
 * errorTypes.js
 *
 * This module defines an enum of error types used throughout the application.
 * It provides a consistent way to categorize and handle different types of errors.
 *
 * Usage:
 * Import the ErrorTypes enum and use it when setting or checking error types.
 * Example: import { ErrorTypes } from './errorTypes';
 */

export const ErrorTypes = {
  API_ERROR: "API_ERROR",
  NETWORK_ERROR: "NETWORK_ERROR",
  AUTHENTICATION_ERROR: "AUTHENTICATION_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  UNEXPECTED_ERROR: "UNEXPECTED_ERROR",
};
