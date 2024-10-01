//utils/api/authService.js

import axiosClient from "./axiosClient";
import { handleApiError } from "./errorHandling";

/**
 * Logs in the user with their email and password.
 * @param {string} email
 * @param {string} password
 * @param {Function} setErrorMsg
 */
export const userLogin = async (email, password, setErrorMsg) => {
  try {
    const response = await axiosClient.post("/user/login", { email, password });
    return response.data;
  } catch (error) {
    const errorObj = handleApiError(error, setErrorMsg, {
      authError: "Login failed. Please check your credentials.",
    });
    throw errorObj; // Throw the error instead of returning it
  }
};

/**
 * Registers a new user.
 * @param {Object} userData - Includes firstName, lastName, email, password, etc.
 * @param {Function} setErrorMsg
 */
export const userSignUp = async (userData, setErrorMsg) => {
  try {
    const response = await axiosClient.post("/user/signup", userData);
    return response.data;
  } catch (error) {
    const errorObj = handleApiError(error, setErrorMsg, {
      serverError: "Failed to register the user. Please try again later.",
    });
    throw errorObj; // Throw the error instead of returning it
  }
};

/**
 * Logs out the current user.
 * @param {Function} setErrorMsg
 */
export const userLogout = async (setErrorMsg) => {
  try {
    const response = await axiosClient.post("/user/logout", { logout: true });
    return response.data;
  } catch (error) {
    const errorObj = handleApiError(error, setErrorMsg, {
      authError: "Logout failed. Please try again.",
    });
    throw errorObj; // Throw the error instead of returning it
  }
};

/**
 * Validates the current user's token.
 * @param {Function} setErrorMsg
 */
export const validateUser = async (setErrorMsg) => {
  try {
    const response = await axiosClient.get("/user/validate-token", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const errorObj = handleApiError(error, setErrorMsg, {
      authError: "Failed to validate the token.",
    });
    throw errorObj; // Throw the error instead of returning it
  }
};
