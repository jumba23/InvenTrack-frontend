import axiosClient from "./axiosClient";

// ------------------------------------------------------
// This file contains functions for making API requests related to user management
// and product fetching. Each function uses axiosClient to communicate with the backend,
// handling tasks like fetching products, user authentication (login, signup), and logout.
// These functions abstract and centralize the API interaction logic, making them reusable
// across the application.
// ------------------------------------------------------

// Fetch products
export const fetchProducts = async () => {
  try {
    const response = await axiosClient.get("/products");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// User Login
export const userLogin = async (email, password) => {
  try {
    const response = await axiosClient.post("/user/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// User Signup
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
    console.error(error);
    throw error;
  }
};

// User Logout

export const userLogout = async () => {
  try {
    const response = await axiosClient.post("/user/logout", { logout: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Validate user
export const validateUser = async () => {
  try {
    const response = await axiosClient.get("/user/validate-token", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    // 401 server response will be in this part of if statement
    throw error;
  }
};
