require("dotenv").config({ path: "config/.env" });
console.log("SESSION_SECRET:", process.env.SESSION_SECRET);
const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');

const {
    saveVideoData,
    loadJsonData,
    deleteVideo,
    reorderVideo,
    changeQVideoData,
    changeTextData
}
    = require("./dataAccess.js");

const app = express();
app.use(express.json());
app.use(cookieParser());

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

//__________________LOGIN   ________________________________
// Middleware for auth
const authMiddleware = (req, res, next) => {
    console.log("Cookies:", req.cookies);  // Логирование cookies
    if (req.cookies.authToken === process.env.SESSION_SECRET) {
        return next(); // Proceed to the next middleware or route
    }
    res.status(403).json({ message: "Unauthorized" }); // Forbidden if not authenticated
};

// login
app.post("/api/login", (req, res) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
        res.cookie("authToken", process.env.SESSION_SECRET, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only true in production
            sameSite: "strict", // value
            maxAge: 60 * 60 * 1000 * 24 * 7// time of the session - 7 days
        });
        return res.json({ success: true });
    }
    res.status(401).json({ message: "Invalid password" });
});


// logout
app.post("/api/logout", (req, res) => {
    res.clearCookie("authToken");
    res.json({ success: true });
});

// isAuth
app.get("/api/check-auth", (req, res) => {
    if (req.cookies.authToken === process.env.SESSION_SECRET) {
        return res.json({ authenticated: true });
    }
    return res.json({ authenticated: false });
});

//_________________________FOR ALL USERS   ________________________________
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
 * Count Videos (for /api/count/:page)
 */
app.get("/api/count/:page",  (req, res) => {
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
 * Load text page
 */
app.get("/api/text/:page", (req, res) => {
    const { page } = req.params;
    const filePath = textPaths.text;

    if (!filePath) {
        return res.status(404).json({message: "Text not found"});
    }

    try {
        const pageText = loadJsonData(filePath);
        // Find  'name'  'page' parameter
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


//_________________________FOR ADMIN  ________________________________
/**
 * Add Video to Category
 */
app.post("/api/:category",  authMiddleware, (
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
app.delete("/api/:category", authMiddleware, (
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
app.put("/api/:category", authMiddleware, (
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
 * Edit Video Count (for /api/count/:page)
 */
app.post("/api/count/:page", authMiddleware, (req, res) => {
    const pageName = req.params.page;
    const { newNum } = req.body;

    if (typeof newNum !== 'number' || newNum <= 0) {
        return res.status(400).json({ message: "Please provide a valid number greater than 0." });
    }

    changeQVideoData(nunOfPageVideoPaths.nunOfPageVideo, pageName, newNum);

    res.status(200).json({ message: `Updated quantity of videos for "${pageName}" to ${newNum}` });
});


/**
 * Edit text page
 */
app.post("/api/text/:page", authMiddleware, (req, res) => {
    const pageName = req.params.page;
    const { title, text} = req.body;
    const newTextObject = {title, text};

    changeTextData(textPaths.text, pageName, newTextObject);

    res.status(200).json({ message: `The text for "${pageName}" updated successfully` });
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