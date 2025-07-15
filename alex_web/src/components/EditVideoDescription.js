import { useRef, useState } from "react";
import "../styles/ManageVideoForm.css";

const EditVideoDescComponent = ({ onSaveDesc }) => {
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
      <form onSubmit={handleSubmit} className="form-container ">
        <div>
          <input
            type="text"
            placeholder="Description"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          ></input>
        </div>
        <div className="row">
          <button type="submit">Save</button>
        </div>
      </form>
    </>
  );
};

export default EditVideoDescComponent;
