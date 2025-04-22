import { showAlert } from "@utils/Helper";
import axiosInstance from "../api/axiosInstance";
import { ApiReturnType, EventType } from "types/AppTypes";


const getAllEvent = async (): Promise<ApiReturnType> => {
  try {
    const { data } = await axiosInstance.get(`/event/all`);
    return { data: data, message: "Events Fetched", success: true, error: null };  // Return the response data
  } catch (error) {
    console.error('Error fetching user data:', error);
    showAlert("Error Occured", JSON.stringify(error));
    return { data: null, message: "Error in events Fetching", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
  }
};

const createEventApi = async (event: EventType | FormData): Promise<ApiReturnType> => {

  console.log("event : ", event)

  try {
    const {data} = await axiosInstance.post(`/event`, event, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("DATA INSIDE CREATE EVENT API : ", data)
    return { data: data, message: "Events Fetched", success: true, error: null };  // Return the response data
  } catch (error) {
    console.error('Error creating user data:', error);
    showAlert("Error Occured", JSON.stringify(error));
    return { data: null, message: "Error in events creating", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
  }

}

export { createEventApi, getAllEvent };