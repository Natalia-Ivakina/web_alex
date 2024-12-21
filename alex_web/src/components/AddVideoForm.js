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
        <div>
            <form id="add-new-video" onSubmit={handleSubmit}>
                <h3>Add a Video</h3>
                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    placeholder="Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                />
                <button type="submit">Add Video</button>
            </form>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default AddNewVideoComponent;
