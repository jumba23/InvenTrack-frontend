import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add a request interceptor to include the JWT in the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)

  // Add a response interceptor to refresh the JWT if it expired
);

export default api;
