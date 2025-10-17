import axios, { AxiosResponse } from "axios";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://api.doctorbondhu.com/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      _t: Date.now(),
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        window.location.href = "/clinic-login";
      }
    }

    if (error.response?.status === 403) {
      // Forbidden - show access denied message
      console.error("Access denied");
    }

    if (error.response?.status >= 500) {
      // Server error - show generic error message
      console.error("Server error occurred");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
