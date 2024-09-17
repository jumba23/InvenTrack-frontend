// utils/api/supplierService.js

import axiosClient from "./axiosClient";
import { handleApiError } from "./errorHandling";

/**
 * Fetches all suppliers from the API.
 * @param {Function} setErrorMsg
 */
export const fetchSuppliers = async (setErrorMsg) => {
  try {
    const response = await axiosClient.get("/suppliers");
    return response.data;
  } catch (error) {
    return handleApiError(error, setErrorMsg, {
      serverError: "Error fetching suppliers.",
    });
  }
};

/**
 * Adds a new supplier.
 * @param {Object} supplierData
 * @param {Function} setErrorMsg
 */
export const addSupplier = async (supplierData, setErrorMsg) => {
  try {
    const response = await axiosClient.post("/suppliers", supplierData);
    return response.data;
  } catch (error) {
    handleApiError(error, setErrorMsg, {
      serverError: "Error adding supplier. Please check the form inputs.",
    });
    throw error;
  }
};

/**
 * Updates an existing supplier.
 * @param {number} supplierId
 * @param {Object} supplierData
 * @param {Function} setErrorMsg
 */
export const updateSupplier = async (supplierId, supplierData, setErrorMsg) => {
  try {
    const response = await axiosClient.put(
      `/suppliers/${supplierId}`,
      supplierData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating supplier:", error);
    handleApiError(error, setErrorMsg, {
      serverError: "Error updating supplier.",
    });
    throw error;
  }
};

/**
 * Fetches a supplier by its ID.
 * @param {number} supplierId
 * @param {Function} setErrorMsg
 */
export const fetchSupplierById = async (supplierId, setErrorMsg) => {
  try {
    const response = await axiosClient.get(`/suppliers/${supplierId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, setErrorMsg, {
      serverError: "Error fetching supplier by ID.",
    });
  }
};

/**
 * Deletes a supplier.
 * @param {number} supplierId
 * @param {Function} setErrorMsg
 */
export const deleteSupplier = async (supplierId, setErrorMsg) => {
  try {
    const response = await axiosClient.delete(`/suppliers/${supplierId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, setErrorMsg, {
      serverError: "Error deleting supplier.",
    });
  }
};
