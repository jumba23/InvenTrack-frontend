import { ErrorTypes } from "./errorTypes";

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
