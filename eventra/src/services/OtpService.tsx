import {ApiReturnType, userType} from 'types/AppTypes';
import axiosInstance from '../api/axiosInstance';

const createOtpApi = async (user: userType): Promise<ApiReturnType> => {
  try {
    const {data} = await axiosInstance.post(`/otp/create`, {
      name: user.name,
      email: user.email,
      userId: user._id,
    });
    console.log('DATA INSIDE CREATE OTP API : ', data);
    return data; // Return the response data
  } catch (error: any) {
    console.error('Error creating OTP:', error);
    return {
      data: null,
      message: error.message ?? 'Error in OTP creating',
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

const verifyOtpApi = async ({
  userId,
  code,
}: {
  userId: userType['_id'];
  code: string;
}): Promise<ApiReturnType> => {
  try {
    const {data} = await axiosInstance.post(`/otp/verify`, {
      user: userId,
      code: code,
    });
    return data; // Return the response data
  } catch (error: any) {
    console.error('Error login user:', error);
    return {
      data: null,
      message: error.message ?? 'Error in users login',
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

export {createOtpApi, verifyOtpApi};
