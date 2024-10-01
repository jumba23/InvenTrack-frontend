//utils/api/productService.js

import axiosClient from "./axiosClient";
import { handleApiError } from "./errorHandling";

/**
 * Fetches all products from the API.
 * @param {Function} setErrorMsg
 */
export const fetchProducts = async (setErrorMsg) => {
  try {
    const response = await axiosClient.get("/products");
    return response.data;
  } catch (error) {
    return handleApiError(error, setErrorMsg, {
      serverError: "Error fetching products.",
    });
  }
};

/**
 * Adds a new product.
 * @param {Object} productData
 * @param {Function} setErrorMsg
 */
export const addProduct = async (productData, setErrorMsg) => {
  try {
    const response = await axiosClient.post("/products", productData);
    return response.data;
  } catch (error) {
    handleApiError(error, setErrorMsg, {
      serverError: "Error adding product. Please check the form inputs.",
    });
    // Throw the error to ensure it is caught in the calling function
    throw error;
  }
};

/**
 * Updates an existing product.
 * @param {number} productId
 * @param {Object} productData
 * @param {Function} setErrorMsg
 */
export const updateProduct = async (productId, productData, setErrorMsg) => {
  try {
    const response = await axiosClient.put(
      `/products/${productId}`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    handleApiError(error, setErrorMsg, {
      serverError: "Error updating product.",
    });

    // Ensure that the error is thrown so that the calling function can handle it
    throw error; // This ensures the error propagates back to handleFormSubmit
  }
};
/**
 * Fetches a product by its ID.
 * @param {number} productId
 * @param {Function} setErrorMsg
 */
export const fetchProductById = async (productId, setErrorMsg) => {
  try {
    const response = await axiosClient.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, setErrorMsg, {
      serverError: "Error fetching product by ID.",
    });
  }
};

/**
 * Deletes a product.
 * @param {number} productId
 * @param {Function} setErrorMsg
 */
export const deleteProduct = async (productId, setErrorMsg) => {
  try {
    const response = await axiosClient.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, setErrorMsg, {
      serverError: "Error deleting product.",
    });
  }
};
