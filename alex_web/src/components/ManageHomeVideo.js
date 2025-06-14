import { useState, useRef } from "react";
import { changeIconColor, replaceVideo } from "../services/videoService";
import "../styles/ManageVideoForm.css";
import ColorPickerButton from "./ChangeColor";

const ManageHomeComponent = ({
  index,
  apiType,
  //onActionComplete,
  onChangeColor,
  onReplace,
}) => {
  const [error, setError] = useState(null);
  const [newLink, setNewLink] = useState("");

  const handleReplace = async () => {
    setError(null);
    try {
      const response = await replaceVideo(index, newLink, apiType);
      //onActionComplete(response.message);
      onReplace(response.videos);
    } catch (err) {
      //onActionComplete(err.message);
      setError(err);
    }
  };

  const handleIconColor = async (color) => {
    setError(null);
    try {
      const response = await changeIconColor(index, color, apiType);
      //onActionComplete(response.message);
      onChangeColor(response.videos);
    } catch (err) {
      //onActionComplete(err.message);
      setError(err);
    }
  };

  return (
    <div className="homeAdminPanel">
      <div id="homeColorPicker">
        {/* Color Picker */}
        <ColorPickerButton onColorChange={handleIconColor} />
      </div>

      {/* replace */}
      <div className="replace">
        <input
          type="text"
          id="newLink"
          placeholder="link"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
        />

        <button onClick={handleReplace} id="replaceBtn">
          Switch
        </button>
      </div>
    </div>
  );
};

export default ManageHomeComponent;
