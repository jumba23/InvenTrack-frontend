/**
 * apiService.js
 *
 * This module provides a centralized interface for making API requests to the backend.
 * It includes functions for user authentication, product management, and token validation.
 *
 * Key features:
 * - Uses axiosClient for consistent API communication
 * - Handles user authentication (login, signup, logout)
 * - Manages product fetching
 * - Performs token validation for maintaining user sessions
 * - Implements consistent error handling and logging
 *
 * Usage:
 * Import the required functions and use them in your components or other services.
 * Example: import { userLogin, fetchProducts } from './apiService';
 */

import axiosClient from "./axiosClient";

/**
 * Fetches products from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of products.
 * @throws {Error} If the API request fails.
 */
export const fetchProducts = async () => {
  try {
    const response = await axiosClient.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 * Authenticates a user.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} A promise that resolves to the user data.
 * @throws {Error} If the login fails.
 */
export const userLogin = async (email, password) => {
  try {
    const response = await axiosClient.post("/user/login", { email, password });

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/**
 * Registers a new user.
 * @param {string} firstName - The user's first name.
 * @param {string} lastName - The user's last name.
 * @param {string} cellNumber - The user's cell phone number.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} A promise that resolves to the new user data.
 * @throws {Error} If the signup fails.
 */
export const userSignUp = async (
  firstName,
  lastName,
  cellNumber,
  email,
  password
) => {
  try {
    const response = await axiosClient.post("/user/signup", {
      firstName,
      lastName,
      cellNumber,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

/**
 * Logs out the current user.
 * @returns {Promise<Object>} A promise that resolves to the logout response data.
 * @throws {Error} If the logout fails.
 */
export const userLogout = async () => {
  try {
    const response = await axiosClient.post("/user/logout", { logout: true });
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

/**
 * Validates the current user's token.
 * @returns {Promise<string>} A promise that resolves to the validation response.
 * @throws {Error} If the validation fails or the token is invalid.
 */
export const validateUser = async () => {
  try {
    const response = await axiosClient.get("/user/validate-token", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Token validation error:", error);
    throw error;
  }
};

/**
 * Product management functions
 */
/**
 * Adds a new product to the inventory.
 * @param {Object} productData - The product data to be added.
 * @returns {Promise<Object>} A promise that resolves to the newly added product data.
 * @throws {Error} If the API request fails.
 */
export const addProduct = async (productData) => {
  try {
    const response = await axiosClient.post("/products", productData);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

/**
 * Updates an existing product in the inventory.
 * @param {number} productId - The ID of the product to update.
 * @param {Object} productData - The updated product data.
 * @returns {Promise<Object>} A promise that resolves to the updated product data.
 * @throws {Error} If the API request fails.
 */
export const updateProduct = async (productId, productData) => {
  try {
    const response = await axiosClient.put(
      `/products/${productId}`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

/**
 * Fetches a product by its ID.
 * @param {number} productId - The ID of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to the product data.
 * @throws {Error} If the API request fails.
 */

export const fetchProductById = async (productId) => {
  try {
    const response = await axiosClient.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

/**
 * Deletes a product from the inventory.
 * @param {number} productId - The ID of the product to delete.
 * @returns {Promise<Object>} A promise that resolves to the delete response data.
 * @throws {Error} If the API request fails.
 */

export const deleteProduct = async (productId) => {
  try {
    const response = await axiosClient.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
