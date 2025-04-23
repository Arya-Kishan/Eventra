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

export { createVenueApi, getAllVenueApi };
