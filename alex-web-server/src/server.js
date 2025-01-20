const express = require("express");
const path = require("path");
const {
    saveVideoData,
    loadJsonData,
    deleteVideo,
    reorderVideo,
    changeData
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

const nunOfPageVideoPaths = {
    nunOfPageVideo: path.join(__dirname, "../videodata/numberOfVideos.json"),
};

const textPaths = {
    text: path.join(__dirname, "../textdata/textdata.json"),
};

/**
 * Load Videos for different categories
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
        const videos = loadJsonData(filePath);
        res.json(videos);
    } catch (error) {
        res.status(500).json({message: "Error loading videos", error: error.message});
    }
});

/**
 * Add Video to Category
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
        const videos = loadJsonData(filePath); // new list
        res.status(201).json({message: `${category}: ${newVideo.name} added successfully`, videos});
    } catch (error) {
        res.status(500).json({message: "Error saving video", error: error.message});
    }
});

/**
 * DELETE Video in Category
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
        const videos = loadJsonData(filePath);
        res.status(201).json({message: `Video: ${name} deleted successfully`, videos});

    } catch (error) {
        res.status(500).json({
            message: "Error deleting video", error: error.message
        });
    }
});

/**
 * REORDER Video in Category
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
        const videos = loadJsonData(filePath); // Load the updated list

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


/**
 * Count Videos (for /api/count/:page)
 */
app.get("/api/count/:page", (req, res) => {
    const { page } = req.params;
    const filePath = nunOfPageVideoPaths.nunOfPageVideo;

    if (!filePath) {
        return res.status(404).json({message: "Count data not found"});
    }

    try {
        const videosCount = loadJsonData(filePath);
        // Find the entry where 'name' matches the 'page' parameter
        const result = videosCount.find(item => item.name === page);
        if (result) {
            res.json(result.quantity); // Send the quantity directly
        } else {
            res.status(404).json({ error: `Page "${page}" not found` });
        }
    } catch (error) {
        res.status(500).json({message: "Error loading videos Count", error: error.message});
    }

});

/**
 * Edit Video Count (for /api/count/:page)
 */
app.post("/api/count/:page", (req, res) => {
    const pageName = req.params.page;
    const { newNum } = req.body;

    if (typeof newNum !== 'number' || newNum <= 0) {
        return res.status(400).json({ message: "Please provide a valid number greater than 0." });
    }

    changeData(nunOfPageVideoPaths.nunOfPageVideo, pageName, newNum);

    res.status(200).json({ message: `Updated quantity for "${pageName}" to ${newNum}` });
});

/**
 * Load text page
 */
app.get("/api/text/:page", (req, res) => {
    const { page } = req.params;
    const filePath = textPaths.text;

    if (!filePath) {
        return res.status(404).json({message: "Count data not found"});
    }

    try {
        const pageText = loadJsonData(filePath);
        // Find the entry where 'name' matches the 'page' parameter
        const result = pageText.find(item => item.name === page);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: `Page "${page}" not found` });
        }
    } catch (error) {
        res.status(500).json({message: "Error loading page text", error: error.message});
    }
    //res.send("Text");
});

/**
 * Edit text page
 */
// app.post("/api/text/:page", (req, res) => {
//     const pageName = req.params.page;
//     const { newText } = req.body;
//
//     if (typeof newText <= 0) {
//         return res.status(400).json({ message: "Please provide a text" });
//     }
//
//     changeData(textPaths.text, pageName, newText);
//
//     res.status(200).json({ message: `Updated text for "${pageName}"` });
// });

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