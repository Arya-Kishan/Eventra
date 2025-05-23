import { ApiReturnType, PostCommentType, PostType } from "types/AppTypes";
import axiosInstance from "../api/axiosInstance";


const getAllPostApi = async (): Promise<ApiReturnType> => {
    try {
        const { data } = await axiosInstance.get(`/post/all`);
        return { data: data, message: "post Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { data: null, message: "Error in posts Fetching", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }
};

const getSinglePostApi = async (id: string): Promise<ApiReturnType> => {
    try {
        const { data } = await axiosInstance.get(`/post/single/${id}`);
        return { data: data, message: "posts Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error fetching single post data:', error);
        return { data: null, message: "Error in posts Fetching", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }
};

const getUserPostsApi = async (id: string): Promise<ApiReturnType> => {
    try {
        const { data } = await axiosInstance.get(`/post/user/${id}`);
        return { data: data, message: "posts Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { data: null, message: "Error in posts Fetching", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }
};

const createPostApi = async (post: FormData): Promise<ApiReturnType> => {

    console.log("post : ", post)

    try {
        const { data } = await axiosInstance.post(`/post`, post, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("DATA INSIDE CREATE post API : ", data)
        return { data: data, message: "posts Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error creating user data:', error);
        return { data: null, message: "Error in posts creating", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }

}

const updatePostApi = async (post: FormData, id: string, query?: any): Promise<ApiReturnType> => {

    console.log(post)

    try {
        const { data } = await axiosInstance.patch(`/post/${id}?${query ? query : ""}`, post, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return { data: data, message: "posts Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error creating user data:', error);
        return { data: null, message: "Error in posts creating", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }

}

const getCommentsOfSinglePostApi = async (postId: string): Promise<ApiReturnType> => {
    try {
        const { data } = await axiosInstance.get(`/postComment/${postId}`);
        return { data: data, message: "post Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error fetching post comment:', error);
        return { data: null, message: "Error in post comment fetching", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }
};

const createCommentPostApi = async (comment: PostCommentType): Promise<ApiReturnType> => {
    try {
        const { data } = await axiosInstance.post(`/postComment`, comment);
        return { data: data, message: "post Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error fetching post comment:', error);
        return { data: null, message: "Error in post comment fetching", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }
};

const deletePostCommentApi = async (id: string): Promise<ApiReturnType> => {

    try {
        const { data } = await axiosInstance.delete(`/postComment/${id}`);
        return { data: data, message: "posts Fetched", success: true, error: null };  // Return the response data
    } catch (error) {
        console.error('Error creating user data:', error);
        return { data: null, message: "Error in posts creating", success: false, error: JSON.stringify(error) };  // Rethrow the error to be handled by the calling function
    }

}

export { createPostApi, getAllPostApi, updatePostApi, getUserPostsApi, getCommentsOfSinglePostApi, createCommentPostApi, deletePostCommentApi, getSinglePostApi };