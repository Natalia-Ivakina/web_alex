const fs = require("fs");
const path = require("path");

//load
const loadVideoData = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw error;
    }
};

//save
const saveVideoData = (filePath, videoData) => {
    try {
        const existingData = loadVideoData(filePath);
        existingData.unshift(videoData);  //start of list
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    } catch (error) {
        throw error;
    }
};

//delete
function deleteVideo(dir, videoName) {
    const videoList = loadVideoData(dir);

    if (!videoList || videoList.length === 0) {
        return null;
    }

    const index = videoList.findIndex((video) => video.name === videoName);
    if (index === -1) {
        return null;
    }
    videoList.splice(index, 1);
    fs.writeFileSync(dir, JSON.stringify(videoList, null, 2), "utf8");
    return videoList;
}

//reorder
function reorderVideo(dir, videoName, newIndex) {
    let videoList = loadVideoData(dir);
    if (!videoList || videoList.length === 0) {
        return;
    }

    const zeroBasedIndex = newIndex - 1;

    // Find the current index of the video to be moved
    const videoIndex = videoList.findIndex((video) => video.name === videoName);
    if (videoIndex === -1 || zeroBasedIndex < 0 || zeroBasedIndex >= videoList.length) {
        return; // Invalid index or video not found
    }

    // Remove the video from its current position
    const [videoToMove] = videoList.splice(videoIndex, 1);

    // Adjust newIndex for splicing when moving backwards
    const adjustedIndex = videoIndex < zeroBasedIndex ? zeroBasedIndex : zeroBasedIndex;

    // Insert the video into the new position
    videoList.splice(adjustedIndex, 0, videoToMove);

    // Write the updated list back to the file
    fs.writeFileSync(dir, JSON.stringify(videoList, null, 2), "utf8");
}

module.exports = {
    loadVideoData,
    saveVideoData,
    deleteVideo,
    reorderVideo,
};
