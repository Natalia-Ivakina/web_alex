const express = require("express");
const path = require("path");
const {
    saveVideoData,
    loadVideoData,
    deleteVideo,
    reorderVideo
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

/**
 * LOAD
 */
app.get("/api/:category", (
    req,
    res) => {
    const {category} = req.params;
    const filePath = videoPaths[category];

    if (!filePath) {
        return res.status(404).json({message: "Category not found"});
    }

    try {
        const videos = loadVideoData(filePath);
        res.json(videos);
    } catch (error) {
        res.status(500).json({message: "Error loading videos", error: error.message});
    }
});

/**
 * ADD
 */
app.post("/api/:category", (
    req,
    res) => {
    const {category} = req.params;
    const filePath = videoPaths[category];

    if (!filePath) {
        return res.status(404).json({message: "Category not found"});
    }

    try {
        const newVideo = req.body;
        saveVideoData(filePath, newVideo);
        const videos = loadVideoData(filePath); // new list
        res.status(201).json({message: `${category}: ${newVideo.name} added successfully`, videos});
    } catch (error) {
        res.status(500).json({message: "Error saving video", error: error.message});
    }
});

/**
 * DELETE
 */
app.delete("/api/:category", (
    req,
    res) => {
    const {category} = req.params;
    const filePath = videoPaths[category];
    const {name} = req.body; // 'name'

    if (!filePath) {
        return res.status(404).json({
            message: "Category not found"
        });
    }

    try {
        if (!name) {
            return res.status(400).json({
                message: "Video name is required"
            });
        }

        const updatedList = deleteVideo(filePath, name);
        const videos = loadVideoData(filePath);
        res.status(201).json({message: `Video: ${name} deleted successfully`, videos});

    } catch (error) {
        res.status(500).json({
            message: "Error deleting video", error: error.message
        });
    }
});

/**
 * REORDER
 */
app.put("/api/:category", (
    req,
    res) => {
    const { category } = req.params;
    const filePath = videoPaths[category];
    const { name, newIndex } = req.body;

    if (!filePath) {
        return res.status(404).json({
            message: "Category not found"
        });
    }

    try {
        if (!name || typeof newIndex !== "number") {
            return res.status(400).json({
                message: "Video name and new index are required"
            });
        }

        // Perform the reorder operation
        reorderVideo(filePath, name, newIndex);
        const videos = loadVideoData(filePath); // Load the updated list

        res.status(200).json({
            message: `Video: ${name} reordered successfully`,
            videos
        });
    } catch (error) {
        res.status(500).json({
            message: "Error reordering video",
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});