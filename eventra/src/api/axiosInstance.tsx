// axiosInstance.ts
import { AppConstants } from '@constants/AppConstants';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: AppConstants.baseUrl || 'https://your-api.com/api',
  timeout: 60000,
});

// ✅ Request Interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = 'your-auth-token'; // Replace with your logic (AsyncStorage/Redux/Context)

    // Add token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Handle FormData content type
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    console.log('👉 Request:', config);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // console.log('✅ Response:', response);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.data || error.message);

    // Global error handling (example)
    if (error.response?.status === 401) {
      // logout or refresh token logic
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
