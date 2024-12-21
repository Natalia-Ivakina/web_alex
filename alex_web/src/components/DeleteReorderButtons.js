import { useState } from "react";
import { deleteVideo } from "../services/videoService";

const DeleteReorderButtonsComponent = ({ videoName, apiType, onActionComplete }) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setError(null);
        try {
            const response = await deleteVideo(videoName, apiType);
            onActionComplete(response.message);
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