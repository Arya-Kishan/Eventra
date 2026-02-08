/* eslint-disable @typescript-eslint/no-explicit-any */
// axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 20000,
});

// ✅ Request Interceptor
axiosInstance.interceptors.request.use(
  async (config: any) => {
    const token = localStorage.getItem("token"); // Replace with your logic (AsyncStorage/Redux/Context)
    // Add token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Handle FormData content type
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    // console.log("👉 Request:", config);
    return config;
  },
  (error: any) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  },
);

// ✅ Response Interceptor
axiosInstance.interceptors.response.use(
  (response: any) => {
    // console.log("✅ Response:", response);
    if (response && response.data && response.data.token) {
      localStorage.setItem("token", JSON.stringify(response.data.token));
    }
    return response;
  },
  (error: any) => {
    console.error("❌ Response Error:", error.response?.data || error.message);

    // Global error handling (example)
    if (error.response?.status === 401) {
      // logout or refresh token logic
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
