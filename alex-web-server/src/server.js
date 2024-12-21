const express = require("express");
const path = require("path");
const {saveVideoData,
        loadVideoData,
        deleteVideo,
        //reorderVideo
}
    = require("./dataAccess.js");

const app = express();
app.use(express.json());

const videoPaths = {
    amv: path.join(__dirname, "../videodata/amv.json"),
    moods: path.join(__dirname, "../videodata/moods.json"),
    projects: path.join(__dirname, "../videodata/projects.json"),
    showreels: path.join(__dirname, "../videodata/showreels.json"),
};

// load
app.get("/api/:category", (
    req,
    res) => {
    const { category } = req.params;
    const filePath = videoPaths[category];

    if (!filePath) {
        //console.error(`Category ${category} not found`);
        return res.status(404).json({ message: "Category not found" });
    }

    try {
        const videos = loadVideoData(filePath);
        //console.log(`Fetched videos for category: ${category}`);
        res.json(videos);
    } catch (error) {
        //console.error("Error fetching videos:", error);
        res.status(500).json({ message: "Error loading videos", error: error.message });
    }
});

// add
app.post("/api/:category", (
    req,
    res) => {
    const { category } = req.params;
    const filePath = videoPaths[category];

    if (!filePath) {
        return res.status(404).json({ message: "Category not found" });
    }

    try {
        const newVideo = req.body;
        saveVideoData(filePath, newVideo);
        const videos = loadVideoData(filePath); // Получаем обновленный список видео
        res.status(201).json({ message: `${category}: ${newVideo.name} added successfully`, videos });
    } catch (error) {
        res.status(500).json({ message: "Error saving video", error: error.message });
    }
});

//delete
app.delete("/api/:category", (
    req,
    res) => {
    const { category } = req.params;
    const filePath = videoPaths[category];
    const { name } = req.body; // 'name'
    console.log("Category:", category);
    console.log("Video name:", name);

    if (!filePath) {
        return res.status(404).json({
            message: "Category not found" });
    }

    try {
        if (!name) {
            return res.status(400).json({
                message: "Video name is required" });
        }

        const updatedList = deleteVideo(filePath, name);
        const videos = loadVideoData(filePath);
        res.status(201).json({ message: `Video: ${name} deleted successfully`,  videos} );

    } catch (error) {
        res.status(500).json({
            message: "Error deleting video", error: error.message });
    }
});

//reorder

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});