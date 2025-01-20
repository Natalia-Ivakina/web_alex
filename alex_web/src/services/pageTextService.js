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

// /**
//  * EDIT
//  *
//  * @param {string} pageName
//  * @param {number} newText
//  * @returns {Promise<any>}
//  */
// export const editPageText = async (pageName, newText) => {
//     try {
//         const response = await axios.post(`/api/text/${pageName}`, { newText });
//         return response.data;
//     } catch (error) {
//         console.error("Error editing text:", error);
//         throw new Error("Failed to edit text");
//     }
// };