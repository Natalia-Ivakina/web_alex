import { addVideo } from "../services/videoService";
import useVideoForm from "../hooks/useVideoForm";
import { useEffect, useState } from "react";

const AddNewVideoComponent = ({ apiType, onAddVideo }) => {
  const {
    title,
    setTitle,
    link,
    setLink,
    description,
    setDescription,
    resetForm,
  } = useVideoForm();
  const [message, setMessage] = useState("");

  /**
   * clear msg - 5 sec
   */
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000); // 5 sec
      return () => clearTimeout(timer);
    }
  }, [message]);

  /**
   *
   * @param event
   * @returns {Promise<void>}
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newVideo = {
      name: title,
      link: link,
      color: "fff",
      description: description,
    }; //default color

    try {
      const response = await addVideo(newVideo, apiType);
      setMessage(response.message); // success
      resetForm(); // clean form
      onAddVideo(response.videos);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="edit-form">
      <p>Add new video</p>
      <form onSubmit={handleSubmit} className="form-container ">
        <div>
          <input
            type="text"
            placeholder="Video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          ></input>
          <input
            type="text"
            placeholder="Video link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          ></input>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></input>
        </div>
        <div className="row">
          <button type="submit">Save</button>
        </div>
      </form>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default AddNewVideoComponent;
