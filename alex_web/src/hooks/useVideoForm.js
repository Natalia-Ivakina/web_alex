import { useState } from "react";

const useVideoForm = () => {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

    const resetForm = () => {
        setTitle("");
        setLink("");
    };

    return {
        title,
        setTitle,
        link,
        setLink,
        resetForm
    };
};

export default useVideoForm;