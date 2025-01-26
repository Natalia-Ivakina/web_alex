import React from "react";

const VideosPerPageSelector = ({
                                   inputVideosPerPage,
                                   handleVideosPerPageInputChange,
                                   handleSaveVideosPerPage,
                                   message,
                               }) => {
    return (
        <div className="edit-form ">
            <div className="videos-per-page-selector" >
                <p>Change number videos per page </p>
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