// axiosInstance.ts
import {AppConstants} from '@constants/AppConstants';
import {AsyncGetCustomData, AsyncSetCustomData} from '@utils/AsyncStorage';
import axios from 'axios';
import Config from 'react-native-config';

const axiosInstance = axios.create({
  baseURL: AppConstants.baseUrl || 'https://your-api.com/api',
  timeout: 20000,
});

// ✅ Request Interceptor
axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncGetCustomData('token'); // Replace with your logic (AsyncStorage/Redux/Context)

    // Add token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // console.log('MAKING A REQUEST -------- ', config);

    // ✅ Handle FormData content type
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    // console.log('👉 Request:', config);
    return config;
  },
  error => {
    console.error('❌ Request Error:', error);
    return Promise.reject((error.response?.data || error.message) ?? error);
  },
);

// ✅ Response Interceptor
axiosInstance.interceptors.response.use(
  response => {
    // console.log('✅ Response:', response);
    if (response && response.data && response.data.token) {
      AsyncSetCustomData('token', response.data.token);
    }
    return response;
  },
  error => {
    console.error('❌ Response Error:', error.response?.data || error.message);

    // Global error handling (example)
    if (error.response?.status === 401) {
      // logout or refresh token logic
    }

    return Promise.reject((error.response?.data || error.message) ?? error);
  },
);

export default axiosInstance;
