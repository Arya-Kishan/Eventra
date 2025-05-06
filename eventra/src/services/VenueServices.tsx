import { showErrorAlert } from "@utils/Helper";
import { ApiReturnType, VenueType } from "types/AppTypes";
import axiosInstance from "../api/axiosInstance";


const getAllVenueApi = async (): Promise<ApiReturnType> => {
    try {
        const { data } = await axiosInstance.get(`/venue/all`);
        return { data: data, message: "Venue Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error fetching user data:', error);
        showErrorAlert("Error Occured", JSON.stringify(error));
        return { data: null, message: "Error in venues Fetching", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }
};

const getSingleVenueApi = async (id: string): Promise<ApiReturnType> => {
    try {
        const { data } = await axiosInstance.get(`/venue/single/${id}`);
        return { data: data, message: "Venues Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { data: null, message: "Error in Venues Fetching", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }
};

const createVenueApi = async (venue: VenueType | FormData): Promise<ApiReturnType> => {

    console.log("venue : ", venue)

    try {
        const { data } = await axiosInstance.post(`/venue`, venue, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("DATA INSIDE CREATE venue API : ", data)
        return { data: data, message: "venues Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error creating user data:', error);
        showErrorAlert("Error Occured", JSON.stringify(error));
        return { data: null, message: "Error in venues creating", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }

}

const updateVenueApi = async (venue: FormData, id: string): Promise<ApiReturnType> => {

    console.log(venue)

    try {
        const { data } = await axiosInstance.patch(`/venue/${id}`, venue, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return { data: data, message: "venues Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error creating user data:', error);
        return { data: null, message: "Error in venues creating", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }

}

const searchVenueApi = async (word: string): Promise<ApiReturnType> => {

    try {
        const { data } = await axiosInstance.get(`/venue/search?word=${word}`);
        return { data: data, message: "search venue fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error in venue searching:', error);
        return { data: null, message: "Error in search venue", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }

}

export { createVenueApi, getAllVenueApi, updateVenueApi, getSingleVenueApi, searchVenueApi };