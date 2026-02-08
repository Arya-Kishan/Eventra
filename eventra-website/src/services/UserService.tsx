import axiosInstance from "@/api/axiosInstance";
import { ApiReturnType } from "@/types/AppTypes";

export const loginUserApi = async (user: {
  email: string;
  password: string;
  authType: string;
}): Promise<ApiReturnType> => {
  try {
    const { data } = await axiosInstance.post(`/user/login`, user);
    return { data: data, message: "users created", success: true, error: null }; // Return the response data
  } catch (error: any) {
    console.error("Error login user:", error);
    console.log(error);
    console.log(error.message);
    return {
      data: null,
      message: error.message ?? "Error in users login",
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

export const getAlluserApi = async (): Promise<ApiReturnType> => {
  try {
    const { data } = await axiosInstance.get(`/user`);
    return { data: data, message: "user Fetched", success: true, error: null }; // Return the response data
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      data: null,
      message: "Error in users Fetching",
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

export const getSingleuserApi = async (id: string): Promise<ApiReturnType> => {
  try {
    const { data } = await axiosInstance.get(`/user/single/${id}`);
    return { data: data, message: "users Fetched", success: true, error: null }; // Return the response data
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      data: null,
      message: "Error in users Fetching",
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};
