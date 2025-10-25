import { useRef, useState } from "react";
import "../styles/ManageVideoForm.css";

const EditVideoDescComponent = ({ onSaveDesc, desc }) => {
  const DescInputRef = useRef(null);
  const [newDesc, setNewDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSaveDesc(newDesc);
    } catch (error) {}
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="reorder">
        <div>
          <textarea
            ref={DescInputRef}
            id="description"
            placeholder="Description"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </>
  );
};

export default EditVideoDescComponent;
