import axios from "axios";

/**
 * LOAD
 *
 * @param {string} pageName
 * @returns {Promise<number>}
 */
export const loadVideoCount = async (pageName) => {
    try {
        const response = await axios.get(`/api/count/${pageName}`);

        // the server returns the quantity number
        console.log("count fetched from server:", response.data);

        // Return the data directly as a number
        return response.data;
    } catch (error) {
        console.error("Error loading video count:", error);
        throw new Error("Failed to load video count");
    }
};

/**
 * EDIT
 *
 * @param {string} pageName
 * @param {number} newNum
 * @returns {Promise<any>}
 */
export const editVideoCount = async (pageName, newNum) => {
    try {
        const response = await axios.post(`/api/count/${pageName}`, { newNum });
        return response.data;
    } catch (error) {
        console.error("Error editing video count:", error);
        throw new Error("Failed to edit video count");
    }
};