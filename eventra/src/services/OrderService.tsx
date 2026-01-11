import {ApiReturnType, OrderType} from 'types/AppTypes';
import axiosInstance from '../api/axiosInstance';

const getAllorder = async (): Promise<ApiReturnType> => {
  try {
    const {data} = await axiosInstance.get(`/order/all`);
    return {data: data, message: 'orders Fetched', success: true, error: null}; // Return the response data
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      data: null,
      message: 'Error in orders Fetching',
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

const getUpcomingordersApi = async (): Promise<ApiReturnType> => {
  try {
    const {data} = await axiosInstance.get(`/order/upcoming`);
    return {data: data, message: 'orders Fetched', success: true, error: null}; // Return the response data
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      data: null,
      message: 'Error in orders Fetching',
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

const createorderApi = async (order: OrderType): Promise<ApiReturnType> => {
  console.log('order : ', order);

  try {
    const {data} = await axiosInstance.post(`/order`, order);
    return {data: data, message: 'orders Fetched', success: true, error: null}; // Return the response data
  } catch (error) {
    console.error('Error creating user data:', error);
    return {
      data: null,
      message: 'Error in orders creating',
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

const updateorderApi = async (
  order: FormData,
  id: string,
): Promise<ApiReturnType> => {
  console.log(order);

  try {
    const {data} = await axiosInstance.put(`/order/${id}`, order, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return {data: data, message: 'orders Fetched', success: true, error: null}; // Return the response data
  } catch (error) {
    console.error('Error creating user data:', error);
    return {
      data: null,
      message: 'Error in orders creating',
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

const getSingleorder = async (id: string): Promise<ApiReturnType> => {
  try {
    const {data} = await axiosInstance.get(`/order/single/${id}`);
    return {data: data, message: 'orders Fetched', success: true, error: null}; // Return the response data
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      data: null,
      message: 'Error in orders Fetching',
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

export {
  createorderApi,
  getAllorder,
  updateorderApi,
  getSingleorder,
  getUpcomingordersApi,
};
