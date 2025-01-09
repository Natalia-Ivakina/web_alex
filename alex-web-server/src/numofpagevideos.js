const express = require("express");
const path = require("path");
const {
    loadData,
    changeNonOfVideoOnPage
}
    = require("./dataAccess.js");

const app = express();
app.use(express.json());

const nunOfPageVideoPaths = {
    nunOfPageVideo: path.join(__dirname, "../videodata/numberofvideo.json"),
};

/**
 * LOAD
 */
app.get("/api/:page", (
    req,
    res) => {

});

/**
 * EDIT
 */
app.post("/api/:page", (
    req,
    res) => {
    
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