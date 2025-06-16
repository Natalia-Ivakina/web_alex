import { useState } from "react";

const useVideoForm = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const resetForm = () => {
    setTitle("");
    setLink("");
    setDescription("");
  };

  return {
    title,
    setTitle,
    link,
    setLink,
    description,
    setDescription,
    resetForm,
  };
};

export default useVideoForm;
