import axiosInstance from "@/api/axiosInstance";
import { ApiReturnType } from "@/types/AppTypes";

export const getAllEventApi = async (): Promise<ApiReturnType> => {
  try {
    const { data } = await axiosInstance.get(`/event/all`);
    return {
      data: data,
      message: "Events Fetched",
      success: true,
      error: null,
    }; // Return the response data
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      data: null,
      message: "Error in events Fetching",
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

export const getSingleEvent = async (id: string): Promise<ApiReturnType> => {
  try {
    const { data } = await axiosInstance.get(`/event/single/${id}`);
    return {
      data: data,
      message: "Events Fetched",
      success: true,
      error: null,
    }; // Return the response data
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      data: null,
      message: "Error in events Fetching",
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};
