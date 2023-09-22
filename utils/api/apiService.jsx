import api from "./api";

export const fetchProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
