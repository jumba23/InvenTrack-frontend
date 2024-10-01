//utils/api/axiosClient.js

import axios from "axios";

// ------------------------------------------------------
// This file configures a centralized Axios client for making HTTP requests throughout
// the application. The axiosClient is set up with a base URL pointing to the backend API.
// 'withCredentials: true' ensures that credentials such as cookies, authorization headers,
// or TLS client certificates are sent with the requests, which is essential for handling
// JWTs in HTTP-only cookies and other authentication mechanisms.
// ------------------------------------------------------

// Use environment variable for the base URL
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Create an Axios instance with a predefined configuration.
const axiosClient = axios.create({
  baseURL: baseURL, // Base URL for all requests made using this client.
  withCredentials: true, // Include credentials in every request made using this client.
});

export default axiosClient;
