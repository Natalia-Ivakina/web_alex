import React, { useState, useEffect } from "react";
import { editVideoCount } from "../services/videoPerPageService";

const VideosPerPageSelector = ({
  inputVideosPerPage,
  handleVideosPerPageInputChange,
  handleSaveVideosPerPage,
  message,
}) => {
  return (
    <div className="edit-form" id="pagePanel">
      <div className="row reorder">
        <p>Change number of videos per page </p>
        <input
          className="adminInput"
          type="number"
          value={inputVideosPerPage}
          onChange={handleVideosPerPageInputChange}
          min="1"
        />
        <button onClick={handleSaveVideosPerPage}>Save</button>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default VideosPerPageSelector;
