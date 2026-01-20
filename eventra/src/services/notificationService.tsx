import {ApiReturnType, NotificationType} from 'types/AppTypes';
import axiosInstance from '../api/axiosInstance';

const getAllNotificationApi = async (
  userId: string,
): Promise<ApiReturnType> => {
  try {
    console.log('fethcing noti', {userId});
    const {data} = await axiosInstance.get(`/notification/${userId}`);
    console.log('NOTI DATA', data);
    return {
      data: data,
      message: 'notifications Fetched',
      success: true,
      error: null,
    }; // Return the response data
  } catch (error) {
    console.error('Error fetching notification data:', error);
    return {
      data: null,
      message: 'Error in notifications Fetching',
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

const markAllNotificationReadApi = async (
  userId: string,
): Promise<ApiReturnType> => {
  try {
    const {data} = await axiosInstance.put(
      `/notification/markAllRead/${userId}`,
    );
    return {
      data: data,
      message: 'notifications Fetched',
      success: true,
      error: null,
    }; // Return the response data
  } catch (error) {
    console.error('Error creating user data:', error);
    return {
      data: null,
      message: 'Error in notifications creating',
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

export {getAllNotificationApi, markAllNotificationReadApi};
