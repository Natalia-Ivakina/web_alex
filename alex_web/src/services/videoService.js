import axios from "axios";

/**
 * ADD
 * @param videoData
 * @param apiType
 * @returns {Promise<any>}
 */
export const addVideo = async (videoData, apiType) => {
    try {
        const response = await axios.post(`/api/${apiType}`, videoData);
        return response.data;
    } catch (error) {
        throw new Error("Error adding video");
    }
};

/**
 * DELETE
 * @param videoName
 * @param apiType
 * @returns {Promise<any>}
 */
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

/**
 * LOAD
 * @param category
 * @returns {Promise<any>}
 */
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

/**
 * REORDER
 * @param videoName
 * @param newIndex
 * @param apiType
 * @returns {Promise<any>}
 */
export const reorderVideo = async (videoName, newIndex, apiType) => {
    try {
        const response = await axios.put(`/api/${apiType}`, {
            name: videoName,
            newIndex: newIndex,
        });
        return response.data;
    } catch (error) {
        console.error("Error reordering video:", error);
        throw new Error("Failed to reorder video");
    }
};