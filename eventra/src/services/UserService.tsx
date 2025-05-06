import { ApiReturnType } from "types/AppTypes";
import axiosInstance from "../api/axiosInstance";


const getAlluserApi = async (): Promise<ApiReturnType> => {
    try {
        const { data } = await axiosInstance.get(`/user/all`);
        return { data: data, message: "user Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { data: null, message: "Error in users Fetching", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }
};

const getSingleuserApi = async (id: string): Promise<ApiReturnType> => {
    try {
        const { data } = await axiosInstance.get(`/user/single/${id}`);
        return { data: data, message: "users Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { data: null, message: "Error in users Fetching", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }
};

const getLoggedInUserApi = async (id: string): Promise<ApiReturnType> => {
    try {
        const { data } = await axiosInstance.get(`/user/loggedIn/${id}`);
        return { data: data, message: "users Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { data: null, message: "Error in users Fetching", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }
};

const createUserApi = async (user: any): Promise<ApiReturnType> => {

    console.log("user : ", user)

    try {
        const { data } = await axiosInstance.post(`/user/signup`, user);
        console.log("DATA INSIDE CREATE user API : ", data)
        return { data: data, message: "users created", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error creating user data:', error);
        return { data: null, message: "Error in users creating", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }

}

const loginUserApi = async (user: any): Promise<ApiReturnType> => {

    try {
        const { data } = await axiosInstance.post(`/user/login`, user);
        return { data: data, message: "users created", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error login user:', error);
        return { data: null, message: "Error in users login", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }

}

const updateUserApi = async (user: FormData, id: string): Promise<ApiReturnType> => {

    console.log(user)

    try {
        const { data } = await axiosInstance.patch(`/user/${id}`, user, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return { data: data, message: "users Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error creating user data:', error);
        return { data: null, message: "Error in users creating", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }

}

const searchUserApi = async (word: string): Promise<ApiReturnType> => {

    try {
        const { data } = await axiosInstance.get(`/user/search?word=${word}`);
        return { data: data, message: "users created", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error login user:', error);
        return { data: null, message: "Error in users login", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }

}

export { createUserApi, getAlluserApi, getSingleuserApi, loginUserApi, updateUserApi, getLoggedInUserApi, searchUserApi };
