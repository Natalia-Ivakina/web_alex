import { useEffect, useState } from "react";
import { loadPageText } from "../services/pageTextService";

const PageTextComponent = ({ apiType }) => {
    const [pageText, setPageText] = useState({ title: '', text1: '', text2: '', text3: '' });

    // Fetch the page text when the component mounts
    useEffect(() => {
        const fetchPageText = async () => {
            try {
                const textData = await loadPageText(apiType); // Fetch the text based on the apiType
                setPageText(textData); // Set the fetched text to state
            } catch (error) {
                console.error("Error fetching page text:", error);
            }
        };

        fetchPageText();
    }, [apiType]); // Re-run when apiType changes

    return (
        <div>
            <p className="headertext">{pageText.title}</p>
            <p className="amvtext">{pageText.text1}</p>
            <p className="amvtext">{pageText.text2}</p>
            <p className="amvtext">{pageText.text3}</p>
        </div>
    );
};

export default PageTextComponent;