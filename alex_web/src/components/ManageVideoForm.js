import { useState, useRef } from "react";
import {
  changeIconColor,
  deleteVideo,
  reorderVideo,
  editVideoDesc,
} from "../services/videoService";
import "../styles/ManageVideoForm.css";
import ColorPickerButton from "./ChangeColor";
import EditVideoDescComponent from "./EditVideoDescription";

const ManageVideoFormComponent = ({
  videoName,
  apiType,
  onActionComplete,
  onDelete,
  onReorder,
  onChangeColor,
  onEditDesc,
}) => {
  const [error, setError] = useState(null);
  const [newIndex, setNewIndex] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    setError(null);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    setIsModalOpen(false);

    try {
      const response = await deleteVideo(videoName, apiType);
      onActionComplete(response.message);
      onDelete(response.videos);
    } catch (err) {
      onActionComplete(err.message);
      setError(err);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  const handleReorder = async () => {
    setError(null);
    if (newIndex === "" || isNaN(newIndex)) {
      onActionComplete("Invalid index provided for reordering");
      return;
    }
    try {
      const response = await reorderVideo(
        videoName,
        parseInt(newIndex, 10),
        apiType
      );
      onActionComplete(response.message);
      onReorder(response.videos);
    } catch (err) {
      onActionComplete(err.message);
      setError(err);
    }
  };

  const handleIconColor = async (color) => {
    setError(null);
    try {
      const response = await changeIconColor(videoName, color, apiType);
      onActionComplete(response.message);
      onChangeColor(response.videos);
    } catch (err) {
      onActionComplete(err.message);
      setError(err);
    }
  };

  const handleVideoDesc = async (desc) => {
    setError(null);
    try {
      const response = await editVideoDesc(videoName, desc, apiType);
      onActionComplete(response.message);
      onEditDesc(response.videos);
    } catch (err) {
      onActionComplete(err.message);
      setError(err);
    }
  };

  return (
    <div className="adminPanel">
      {/* delete */}
      <div style={{ width: "130px" }}>
        {!isModalOpen && (
          <div>
            <button className="deleteButton" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}

        {/* confirm deleting */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <p>Delete?</p>
              <button id={"confirm"} onClick={confirmDelete}>
                Y
              </button>
              <button id={"cancel"} onClick={cancelDelete}>
                N
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <EditVideoDescComponent onSaveDesc={handleVideoDesc} />

      {/* reorder */}
      <div className="reorder">
        <input
          type="text"
          className="adminInput"
          placeholder=""
          value={newIndex}
          onChange={(e) => setNewIndex(e.target.value)}
        />
        <button onClick={handleReorder}>Reorder</button>
      </div>

      {/* Color Picker */}
      <ColorPickerButton onColorChange={handleIconColor} />
    </div>
  );
};

export default ManageVideoFormComponent;
