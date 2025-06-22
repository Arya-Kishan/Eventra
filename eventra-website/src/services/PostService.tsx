import axiosInstance from "@/api/axiosInstance";
import { ApiReturnType } from "@/types/AppTypes";

const getAllPostApi = async (): Promise<ApiReturnType> => {
    try {
        const { data } = await axiosInstance.get(`/post/all`);
        return { data: data, message: "post Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { data: null, message: "Error in posts Fetching", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }
};

export { getAllPostApi };