import {useEffect, useState} from "react";
import {editPageText} from "../services/pageTextService";

export const EditPageTextComponent = ({ apiType, onTextUpdate, textData}) => {
    const [message, setMessage] = useState('');

    // sending
    const [title, setTitle] = useState(textData?.title || '');
    const [text1, setText1] = useState(textData?.text1 || '');
    const [text2, setText2] = useState(textData?.text2 || '');
    const [text3, setText3] = useState(textData?.text3 || '');


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Sending data to the server
            const updatedText = await editPageText(apiType, { title, text1, text2, text3 });
            setMessage(updatedText.message);
            onTextUpdate({ title, text1, text2, text3 });
        } catch (error) {
            console.error("Error editing text:", error);
            setMessage(error.message);
        }
    };

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

    return (
        <div className="edit-form">
            <h4>Edit Text</h4>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="row">
                    <textarea
                        placeholder="Enter title"
                        //value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)}
                        required
                    ></textarea>
                    <textarea
                        placeholder="Enter text 1"
                        //value={text1}
                        onChange={(e) =>
                            setText1(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="row">
                    <textarea
                        placeholder="Enter text 2"
                        //value={text2}
                        onChange={(e) =>
                            setText2(e.target.value)}
                        required
                    ></textarea>
                    <textarea
                        placeholder="Enter text 3"
                        //value={text3}
                        onChange={(e) =>
                            setText3(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Edit Text</button>
            </form>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                {message && <div className="message">{message}</div>}
            </div>
        </div>
    );
};