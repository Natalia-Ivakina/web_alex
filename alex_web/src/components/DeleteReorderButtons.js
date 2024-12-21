import { useState } from "react";
import { deleteVideo } from "../services/videoService";

const DeleteReorderButtonsComponent = ({ videoName, apiType, onActionComplete, OnDelete }) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setError(null);
        try {
            const response = await deleteVideo(videoName, apiType);
            onActionComplete(response.message);
            OnDelete(response.videos);
        } catch (err) {
            onActionComplete("Error deleting video");
            setError(err);
        }
    };

    return (
        <div className="adminPanel">
            <div className="reorder">
                <input type="text" className="adminInput"/>
                <button>Reorder</button>
            </div>
            <div>
                <button className="deleteButton" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default DeleteReorderButtonsComponent;