/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/api/axiosInstance";
import { ApiReturnType } from "@/types/AppTypes";

const getAllSpotLightApi = async (): Promise<ApiReturnType> => {
    try {
        const { data } = await axiosInstance.get(`/spotLight/all`);
        return { data: data, message: "spotLight Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { data: null, message: "Error in spotLights Fetching", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }
};

const getSinglespotLightApi = async (id: string): Promise<ApiReturnType> => {
    try {
        const { data } = await axiosInstance.get(`/spotLight/single/${id}`);
        return { data: data, message: "spotLights Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { data: null, message: "Error in spotLights Fetching", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }
};

const createspotLightApi = async (spotLight: FormData): Promise<ApiReturnType> => {

    console.log("spotLight : ", spotLight)

    try {
        const { data } = await axiosInstance.post(`/spotLight/create`, spotLight, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("DATA INSIDE CREATE spotLight API : ", data)
        return { data: data, message: "spotLights Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error creating user data:', error);
        return { data: null, message: "Error in spotLights creating", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }

}

const updatespotLightApi = async (spotLight: FormData, id: string, query?: any): Promise<ApiReturnType> => {

    console.log(spotLight)

    try {
        const { data } = await axiosInstance.patch(`/spotLight/${id}?${query ? query : ""}`, spotLight, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return { data: data, message: "spotLights Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error creating user data:', error);
        return { data: null, message: "Error in spotLights creating", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }

}

export { createspotLightApi, getAllSpotLightApi, updatespotLightApi, getSinglespotLightApi };
