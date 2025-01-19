import React from "react";

const VideosPerPageSelector = ({
                                   inputVideosPerPage,
                                   handleVideosPerPageInputChange,
                                   handleSaveVideosPerPage,
                                   message,
                               }) => {
    return (
        <div className="videos-per-page-selector">
            <p>How many videos do you want per page?</p>
            <input
                type="number"
                className="adminInput"
                value={inputVideosPerPage}
                onChange={handleVideosPerPageInputChange}
                min="1"
            />
            <button onClick={handleSaveVideosPerPage}>Save</button>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default VideosPerPageSelector;