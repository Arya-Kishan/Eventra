import axiosInstance from '../api/axiosInstance';
import {ApiReturnType} from 'types/AppTypes';

const getAllBannerApi = async (): Promise<ApiReturnType> => {
  try {
    const {data} = await axiosInstance.get(`/banner/all`);
    return {data: data, message: 'banner Fetched', success: true, error: null}; // Return the response data
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      data: null,
      message: 'Error in posts Fetching',
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

export {getAllBannerApi};
