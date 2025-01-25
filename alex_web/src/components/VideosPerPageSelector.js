import React from "react";

const VideosPerPageSelector = ({
                                   inputVideosPerPage,
                                   handleVideosPerPageInputChange,
                                   handleSaveVideosPerPage,
                                   message,
                               }) => {
    return (
        <div>
            <div className="videos-per-page-selector edit-form">
                <p>How many videos do you want per page?</p>
                <input
                    type="number"
                    className="adminInput"
                    value={inputVideosPerPage}
                    onChange={handleVideosPerPageInputChange}
                    min="1"
                />
                <button onClick={handleSaveVideosPerPage}>Save</button>

            </div>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                {message && <div className="message">{message}</div>}
            </div>
        </div>
    );
};

export default VideosPerPageSelector;