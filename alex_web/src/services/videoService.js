import axios from "axios";

export const addVideo = async (videoData, apiType) => {
    try {
        const response = await axios.post(`/api/${apiType}`, videoData);
        return response.data;
    } catch (error) {
        throw new Error("Error adding video");
    }
};

export const deleteVideo = async (videoName, apiType) => {
    try {
        const response = await axios.delete(`/api/${apiType}`, {
            data: { name: videoName },
        });
        return response.data;
    } catch (error) {
        throw new Error("Error deleting video");
    }
};

export const loadVideos = async (category) => {
    try {
        const response = await axios.get(`/api/${category}`);
        console.log("Videos fetched from server:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error loading videos:", error);
        throw new Error("Failed to fetch videos");
    }
};