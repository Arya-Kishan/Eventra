import { ApiReturnType } from "types/AppTypes";
import axiosInstance from "../api/axiosInstance";


const getAllEvent = async (): Promise<ApiReturnType> => {
  try {
    const { data } = await axiosInstance.get(`/event/all`);
    return { data: data, message: "Events Fetched", success: true, error: null };  // Return the response data
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { data: null, message: "Error in events Fetching", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
  }
};

const getUpcomingEventsApi = async (): Promise<ApiReturnType> => {
  try {
    const { data } = await axiosInstance.get(`/event/upcoming`);
    return { data: data, message: "Events Fetched", success: true, error: null };  // Return the response data
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { data: null, message: "Error in events Fetching", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
  }
};

const createEventApi = async (event: FormData): Promise<ApiReturnType> => {

  console.log("event : ", event)

  try {
    const { data } = await axiosInstance.post(`/event`, event, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { data: data, message: "Events Fetched", success: true, error: null };  // Return the response data
  } catch (error) {
    console.error('Error creating user data:', error);
    return { data: null, message: "Error in events creating", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
  }

}

const updateEventApi = async (event: FormData, id: string): Promise<ApiReturnType> => {

  console.log(event)

  try {
    const { data } = await axiosInstance.put(`/event/${id}`, event, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { data: data, message: "Events Fetched", success: true, error: null };  // Return the response data
  } catch (error) {
    console.error('Error creating user data:', error);
    return { data: null, message: "Error in events creating", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
  }

}

const getSingleEvent = async (id: string): Promise<ApiReturnType> => {
  try {
    const { data } = await axiosInstance.get(`/event/single/${id}`);
    return { data: data, message: "Events Fetched", success: true, error: null };  // Return the response data
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { data: null, message: "Error in events Fetching", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
  }
};

const searchEventApi = async (word: string): Promise<ApiReturnType> => {

  try {
    const { data } = await axiosInstance.get(`/event/search?word=${word}`);
    return { data: data, message: "search event fetched", success: true, error: null };  // Return the response data
  } catch (error) {
    console.error('Error in event searching:', error);
    return { data: null, message: "Error in search event", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
  }

}


const bookEventApi = async (event: any, id: string): Promise<ApiReturnType> => {

  console.log(event)

  try {
    const { data } = await axiosInstance.patch(`/event/book/${id}`, event);
    return { data: data, message: "Events Fetched", success: true, error: null };  // Return the response data
  } catch (error) {
    console.error('Error creating event booking:', error);
    return { data: null, message: "Error in events booking creating", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
  }

}

export { createEventApi, getAllEvent, updateEventApi, getSingleEvent, getUpcomingEventsApi, searchEventApi, bookEventApi };
