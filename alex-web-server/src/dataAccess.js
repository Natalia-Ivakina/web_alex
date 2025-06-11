const fs = require("fs");
const path = require("path");

//loadData
const loadJsonData = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

//save Video
const saveVideoData = (filePath, videoData) => {
  try {
    const existingData = loadJsonData(filePath);
    existingData.unshift(videoData); //start of list
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
  } catch (error) {
    throw error;
  }
};

//delete Video
function deleteVideo(dir, videoName) {
  const videoList = loadJsonData(dir);

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

//reorder Video
function reorderVideo(dir, videoName, newIndex) {
  let videoList = loadJsonData(dir);
  if (!videoList || videoList.length === 0) {
    return;
  }

  const zeroBasedIndex = newIndex - 1;

  // Find the current index of the video to be moved
  const videoIndex = videoList.findIndex((video) => video.name === videoName);
  if (
    videoIndex === -1 ||
    zeroBasedIndex < 0 ||
    zeroBasedIndex >= videoList.length
  ) {
    return; // Invalid index or video not found
  }

  // Remove the video from its current position
  const [videoToMove] = videoList.splice(videoIndex, 1);

  // Adjust newIndex for splicing when moving backwards
  const adjustedIndex =
    videoIndex < zeroBasedIndex ? zeroBasedIndex : zeroBasedIndex;

  // Insert the video into the new position
  videoList.splice(adjustedIndex, 0, videoToMove);

  // Write the updated list back to the file
  fs.writeFileSync(dir, JSON.stringify(videoList, null, 2), "utf8");
}

// Edit data
function changeVideosPerPage(dir, pageName, newData) {
  let data = loadJsonData(dir);
  if (!data) {
    console.error("Failed to load data");
    return;
  }

  // found page
  const page = data.find((item) => item.name === pageName);
  if (page) {
    // edit
    page.quantity = String(newData);
    //console.log(`Updated ${pageName} data to ${newData}`);
  } else {
    console.error(`Page "${pageName}" not found in data`);
  }

  // save
  fs.writeFileSync(dir, JSON.stringify(data, null, 2), "utf8");
}

function changeTextData(dir, pageName, newData) {
  let data = loadJsonData(dir);
  if (!data) {
    console.error("Failed to load data");
    return;
  }

  const page = data.find((item) => item.name === pageName);
  if (page) {
    Object.assign(page, newData);
    console.log(`Updated ${pageName} data to`, newData);
  } else {
    console.error(`Page "${pageName}" not found in data`);
  }

  fs.writeFileSync(dir, JSON.stringify(data, null, 2), "utf8");
}

function changeIconColor(dir, itemName, newColor) {
  let data = loadJsonData(dir);
  if (!data) {
    console.error("Failed to load data");
    return;
  }

  const updatingItem = data.find((item) => item.name === itemName);
  if (updatingItem) {
    updatingItem.color = newColor;
    console.log(`Updated ${itemName} data to`, newColor);
    fs.writeFileSync(dir, JSON.stringify(data, null, 2), "utf8");
  } else {
    console.error(`Page "${itemName}" not found in data`);
  }
}

module.exports = {
  loadJsonData,
  saveVideoData,
  deleteVideo,
  reorderVideo,
  changeVideosPerPage,
  changeTextData,
  changeIconColor,
};
