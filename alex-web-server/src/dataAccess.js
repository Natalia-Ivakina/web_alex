const fs = require("fs");
const path = require("path");

//load
const loadVideoData = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log(`Loaded data from ${filePath}`);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error loading data from ${filePath}:`, error);
    throw error;
  }
};

//save
const saveVideoData = (filePath, videoData) => {
  try {
    const existingData = loadVideoData(filePath);
    existingData.unshift(videoData);  // Добавляем новое видео в список
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));  // Записываем в файл
    console.log(`Saved new video data to ${filePath}`);
  } catch (error) {
    console.error(`Error saving video to ${filePath}:`, error);
    throw error;
  }
};

//delete
function deleteVideo(dir, videoName) {
  const videoList = loadVideoData(dir);
  //console.log("Loaded video list:", videoList); // Логируем, что было загружено

  if (!videoList || videoList.length === 0) {
    return null;
  }

  const index = videoList.findIndex((video) => video.name === videoName);
  if (index === -1) {
    return null;
  }
  videoList.splice(index, 1);
  //console.log("Updated video list:", videoList); // Логируем обновленный список
  fs.writeFileSync(dir, JSON.stringify(videoList, null, 2), "utf8");
  return videoList;
}

//reorder
// function reorderVideo(dir, videoName, newIndex) {
//   let videoList = loadVideoData(dir);
//   if (!videoList || videoList.length === 0) {
//     return;
//   }
//
//   //find index
//   const videoIndex = videoList.findIndex((video) => video.name === videoName);
//   if (videoIndex === -1) {
//     return;
//   }
//
//   const [videoToMove] = videoList.splice(videoIndex, 1);
//   videoList.splice(newIndex, 0, videoToMove);
//
//   fs.writeFileSync(dir, JSON.stringify(videoList, null, 2), "utf8");
// }

module.exports = {
  loadVideoData,
  saveVideoData,
  deleteVideo,
  //reorderVideo,
};
