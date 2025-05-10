import { ApiReturnType, NotificationType } from "types/AppTypes";
import axiosInstance from "../api/axiosInstance";


const getAllNotification = async (): Promise<ApiReturnType> => {
    try {
        const { data } = await axiosInstance.get(`/notification/all`);
        return { data: data, message: "notifications Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { data: null, message: "Error in notifications Fetching", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }
};

const createNotificationApi = async (notification: NotificationType): Promise<ApiReturnType> => {

    console.log("notification : ", notification)

    try {
        const { data } = await axiosInstance.post(`/notification`, notification);
        return { data: data, message: "notifications Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error creating user data:', error);
        return { data: null, message: "Error in notifications creating", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }

}

const updateNotificationApi = async (notification: FormData, id: string): Promise<ApiReturnType> => {

    console.log(notification)

    try {
        const { data } = await axiosInstance.put(`/notification/${id}`, notification, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return { data: data, message: "notifications Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error creating user data:', error);
        return { data: null, message: "Error in notifications creating", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }

}


export { createNotificationApi, getAllNotification, updateNotificationApi };
