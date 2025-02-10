import axios from "axios";

/**
 * LOAD
 *
 * @param {string} pageName
 * @returns {Promise<text>}
 */
export const loadPageText = async (pageName) => {
    try {
        const response = await axios.get(`/api/text/${pageName}`);
        return response.data;
    } catch (error) {
        console.error("Error loading text:", error);
        throw new Error("Failed to load text");
    }
};

/**
 * EDIT
 *
 * @param {string} pageName
 * @param {object} newText
 * @returns {Promise<any>}
 */
export const editPageText = async (pageName, newText) => {
    try {
        const response = await axios.post(`/api/text/${pageName}`, newText);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            // Handle unauthorized access
            console.error("Unauthorized to edit video count");
            throw new Error("You are not authorized to edit the text.");
        }
        console.error("Error editing text:", error);
        throw new Error("Failed to edit text");
    }
};