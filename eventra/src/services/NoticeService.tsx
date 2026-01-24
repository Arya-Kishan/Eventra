import axiosInstance from '../api/axiosInstance';
import {ApiReturnType, NoticeType, userType} from 'types/AppTypes';

export const getAllNoticeApi = async ({
  userId,
}: {
  userId: userType['_id'];
}): Promise<ApiReturnType> => {
  try {
    const {data} = await axiosInstance.get(`/notice/all?${userId}`);
    return {data: data, message: 'Events Fetched', success: true, error: null}; // Return the response data
  } catch (error) {
    console.error('Error fetching notices data:', error);
    return {
      data: null,
      message: 'Error in events Fetching',
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

export const updateNoticeApi = async ({
  id,
  userId,
}: {
  id: NoticeType['_id'];
  userId: userType['_id'];
}): Promise<ApiReturnType> => {
  try {
    const {data} = await axiosInstance.put(
      `/notice/${id}`,
      {userId},
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data as ApiReturnType; // Return the response data
  } catch (error) {
    console.error('Error creating user data:', error);
    return {
      data: null,
      message: 'Error in events updation',
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};
