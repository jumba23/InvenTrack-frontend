import axiosClient from "./axiosClient";

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
export const userLogin = async (username, password) => {
  try {
    const response = await axiosClient.post("/user/login", {
      username,
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
