import {useEffect, useState} from "react";
import { EditPageTextComponent } from "../components/EditPageText";
import PageTextComponent from "../components/PageText";
import {loadPageText} from "../services/pageTextService";

const HomePage = () => {
    const [message, setMessage] = useState("");
    const [pageText, setPageText] = useState({
        title: '',
        text: '',
    });

    //initial text
    useEffect(() => {
        const fetchPageText = async () => {
            try {
                const textData = await loadPageText('home');
                setPageText(textData);
            } catch (error) {
                console.error("Error fetching page text:", error);
            }
        };

        fetchPageText();
    }, ['home']);

    const updatePageText = (updatedText) => {
        setPageText(updatedText);
    };

    return (
        <>
            <div className="adminlayout">
                <EditPageTextComponent
                    apiType="home"
                    onTextUpdate={updatePageText}
                    textData={pageText}
                />
            </div>
                <div>
                    <PageTextComponent pageText={pageText}/>
                </div>
            </>
    );
};

export default HomePage;