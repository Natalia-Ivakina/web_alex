import {useEffect, useState} from "react";
import {editPageText} from "../services/pageTextService";

export const EditPageTextComponent = ({ apiType, onTextUpdate, textData}) => {
    const [message, setMessage] = useState('');

    // sending
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    //filling
    useEffect(() => {
        if (textData) {
            setTitle(textData.title || "");
            setText(textData.text || "");
        }
    }, [textData]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Sending data to the server
            const updatedText = await editPageText(apiType, {
                title, text});
            setMessage(updatedText.message);
            onTextUpdate({
                title, text});
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
            <p>Edit page text</p>
            <form onSubmit={handleSubmit} className="form-container">
                <div>
                    <input
                        type='text'
                        placeholder="Page title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)}
                    ></input>
                    <textarea
                        placeholder="Enter page text"
                        value={text}
                        onChange={(e) =>
                            setText(e.target.value)}
                    ></textarea>
                </div>
                <div className="row">
                    <button type="submit">Save</button>
                </div>
            </form>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                {message && <div className="message">{message}</div>}
            </div>
        </div>
    );
};