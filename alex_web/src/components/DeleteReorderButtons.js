import { useState } from "react";
import { deleteVideo, reorderVideo } from "../services/videoService";

const DeleteReorderButtonsComponent = ({ videoName, apiType, onActionComplete, OnDelete, OnReorder }) => {
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
            OnDelete(response.videos);
        } catch (err) {
            onActionComplete("Error deleting video");
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
            const response = await reorderVideo(videoName, parseInt(newIndex, 10), apiType);
            onActionComplete(response.message);
            OnReorder(response.videos);
        } catch (err) {
            onActionComplete("Error reordering video");
            setError(err);
        }
    };

    return (
        <div className="adminPanel">
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

            {/* delete */}
            {!isModalOpen && (
                <div>
                    <button className="deleteButton" onClick={handleDelete}>Delete</button>
                </div>
            )}

            {/* confirm deleting */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Delete?</p>
                        <button id={"confirm"} onClick={confirmDelete}>Yes</button>
                        <button id={"cancel"} onClick={cancelDelete}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteReorderButtonsComponent;