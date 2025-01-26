import {addVideo} from "../services/videoService";
import useVideoForm from "../hooks/useVideoForm";
import {useEffect, useState} from "react";

const AddNewVideoComponent = ({apiType, onAddVideo}) => {
    const {title, setTitle, link, setLink, resetForm} = useVideoForm();
    const [message, setMessage] = useState('');

    /**
     * clear msg - 5 sec
     */
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 5000); // 5 sec
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newVideo = {name: title, link: link};

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
            <h4>Add new video</h4>
            <form onSubmit={handleSubmit} className="form-container ">
                <div className="row">
                    <textarea
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    ></textarea>
                    <textarea
                        placeholder="Link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="row">
                    <button type="submit">Add Video</button>
                </div>
            </form>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default AddNewVideoComponent;
