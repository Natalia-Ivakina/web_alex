import axios from "axios";

/**
 * Login Service
 * @param {string} password - password
 * @returns {Promise<any>} - Response
 */
export const login = async (password) => {
    try {
        const response = await axios.post('/api/login', { password });
        if (response.data.success) {
            console.log("Login successful!");
            return response.data;
        }
    } catch (error) {
        console.error("Login failed:", error.response?.data?.message || error.message);
        throw new Error("Login failed");
    }
};

/**
 * Check if the user is authenticated (by checking the cookie)
 * @returns {Promise<any>} - Response
 */
export const checkAuth = async () => {
    try {
        const response = await axios.get('/api/check-auth', { withCredentials: true });
        return response.data.authenticated;
    } catch (error) {
        console.error("Failed to check authentication:", error.response?.data?.message || error.message);
        throw new Error("Failed to check authentication");
    }
};

/**
 * Logout service (clear authToken)
 * @returns {Promise<any>} - Response from the logout request
 */
export const logout = async () => {
    try {
        const response = await axios.post('/api/logout');
        console.log("Logged out successfully");
        return response.data;
    } catch (error) {
        console.error("Logout failed:", error.response?.data?.message || error.message);
        throw new Error("Logout failed");
    }
};