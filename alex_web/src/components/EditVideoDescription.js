import { useRef, useState } from "react";
import "../styles/ManageVideoForm.css";

const EditVideoDescComponent = ({ onSaveDesc, desc }) => {
  const DescInputRef = useRef(null);
  const [newDesc, setNewDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSaveDesc(newDesc);
    } catch (error) {
      //setMessage("Error updating description");
      //todo
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="reorder">
        <div>
          <input
            type="text"
            className="desc"
            placeholder="Description"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          ></input>
        </div>
        <div>
          <button type="submit">Edit</button>
        </div>
      </form>
    </>
  );
};

export default EditVideoDescComponent;
