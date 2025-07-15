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
    if (error.response && error.response.status === 403) {
      // Handle unauthorized access
      console.error("Unauthorized to edit video count");
      throw new Error("You are not authorized to add the video");
    }
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
    if (error.response && error.response.status === 403) {
      // Handle unauthorized access
      console.error("Unauthorized to edit video count");
      throw new Error("You are not authorized to delete the video.");
    }
    throw new Error("Error deleting video");
  }
};

/**
 * LOAD PAGE VIDEOS
 * @param category
 * @returns {Promise<any>}
 */
export const loadVideos = async (category) => {
  try {
    const response = await axios.get(`/api/${category}`);
    //console.log("Videos fetched from server:", response.data);
    return response.data;
  } catch (error) {
    //console.error("Error loading videos:", error);
    throw new Error("Failed to fetch videos");
  }
};

/**
 * LOAD HOME VIDEOS
 * @param category
 * @returns {Promise<any>}
 */
export const loadHomeVideos = async () => {
  try {
    const response = await axios.get(`/api/home`);
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
    const response = await axios.put(`/api/${apiType}/reorder`, {
      name: videoName,
      newIndex: newIndex,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // Handle unauthorized access
      console.error("Unauthorized to edit video count");
      throw new Error("You are not authorized to reorder the video.");
    }
    //console.error("Error reordering video:", error);
    throw new Error("Failed to reorder video");
  }
};

/**
 * CHANGE THE ICON COLOR
 * @param videoName
 * @param newColor
 * @param apiType
 * @returns {Promise<any>}
 */
export const changeIconColor = async (videoName, newColor, apiType) => {
  try {
    const response = await axios.put(`/api/${apiType}/color`, {
      name: videoName,
      color: newColor,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // Handle unauthorized access
      console.error("Unauthorized to edit video count");
      throw new Error("You are not authorized to change the icon color.");
    }
    //console.error("Error changing color:", error);
    throw new Error("Failed to change color");
  }
};

/**
 * CHANGE THE VIDEO DESC
 * @param videoName
 * @param newColor
 * @param apiType
 * @returns {Promise<any>}
 */
export const editVideoDesc = async (videoName, newDesc, apiType) => {
  try {
    const response = await axios.put(`/api/${apiType}/desc`, {
      name: videoName,
      desc: newDesc,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // Handle unauthorized access
      console.error("Unauthorized to edit video desc");
      throw new Error("You are not authorized to change the video desc.");
    }
    //console.error("Error changing video desc:", error);
    throw new Error("Failed to change video desc");
  }
};

/**
 * REPLACE VIDEO
 * @param index
 * @param link
 * @param apiType
 * @returns {Promise<any>}
 */
export const replaceVideo = async (index, link) => {
  try {
    const response = await axios.put(`/api/replace`, {
      index: index,
      link: link,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // Handle unauthorized access
      console.error("Unauthorized to edit video count");
      throw new Error("You are not authorized to change the icon color.");
    }
    throw new Error("Failed to replace video");
  }
};
