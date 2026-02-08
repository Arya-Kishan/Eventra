import axiosInstance from "@/api/axiosInstance";
import { ApiReturnType, userType } from "@/types/AppTypes";

export const getAllVenueApi = async ({
  type,
  searchQuery,
  location,
}: {
  type: "all" | "search" | "nearBy";
  searchQuery?: string;
  location?: userType["location"];
}): Promise<ApiReturnType> => {
  try {
    const query =
      type === "all"
        ? "type=all"
        : type === "search"
          ? `type=search&word=${searchQuery}`
          : `type=nearBy&lat=${location?.coordinates[1]}&lng=${location?.coordinates[0]}`;
    const { data } = await axiosInstance.get(`/venue/all?${query}`);
    return { data: data, message: "Venue Fetched", success: true, error: null }; // Return the response data
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      data: null,
      message: "Error in venues Fetching",
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

export const getSingleVenueApi = async (id: string): Promise<ApiReturnType> => {
  try {
    const { data } = await axiosInstance.get(`/venue/single/${id}`);
    return {
      data: data,
      message: "Venues Fetched",
      success: true,
      error: null,
    }; // Return the response data
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      data: null,
      message: "Error in Venues Fetching",
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};
