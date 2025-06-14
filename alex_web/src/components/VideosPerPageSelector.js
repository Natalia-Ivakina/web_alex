import React, { useState, useEffect } from "react";
import { editVideoCount } from "../services/videoPerPageService";

const VideosPerPageSelector = ({
  initialVideosPerPage,
  apiType,
  onVideosPerPageChange,
  onMessage,
}) => {
  const [inputVideosPerPage, setInputVideosPerPage] =
    useState(initialVideosPerPage);

  useEffect(() => {
    setInputVideosPerPage(initialVideosPerPage);
  }, [initialVideosPerPage]);

  const handleVideosPerPageInputChange = (e) => {
    setInputVideosPerPage(e.target.value);
  };

  const handleSaveVideosPerPage = async () => {
    const value = parseInt(inputVideosPerPage, 10);
    if (!isNaN(value) && value > 0) {
      try {
        await editVideoCount(apiType, value);
        onMessage?.("Number of videos per page updated successfully!");
        if (onVideosPerPageChange) {
          onVideosPerPageChange(value);
        }
      } catch (error) {
        onMessage?.(error.message);
      }
    } else {
      onMessage?.("Please enter a number greater than 0.");
    }
  };

  return (
    <div className="edit-form" id="pagePanel">
      <div className="row reorder">
        <p>Change number of videos per page</p>
        <input
          className="adminInput"
          type="text"
          value={inputVideosPerPage}
          onChange={handleVideosPerPageInputChange}
          min="1"
        />
        <button onClick={handleSaveVideosPerPage}>Save</button>
      </div>
    </div>
  );
};

export default VideosPerPageSelector;
