import React, {useEffect, useState} from "react";
import {loadPageText} from "../services/pageTextService";
import {EditPageTextComponent} from "../components/EditPageText";

const AboutPage = () => {
    const [message, setMessage] = useState("");
    const [pageText, setPageText] = useState({
        title: '',
        text1: '',
        text2: '',
        text3: '',
        text4: '',
        text5: ''
    });

    //initial text
    useEffect(() => {
        const fetchPageText = async () => {
            try {
                const textData = await loadPageText('about');
                setPageText(textData);
            } catch (error) {
                console.error("Error fetching page text:", error);
            }
        };

        fetchPageText();
    }, ['about']);

    const updatePageText = (updatedText) => {
        setPageText(updatedText);
    };
    return (
        <>
            <div>
                <EditPageTextComponent
                    apiType="about"
                    onTextUpdate={updatePageText}
                    textData={pageText}
                />
            </div>
            <div>
                <div>
                    <p className="headertext">{pageText.title}</p>
                    <div className='aboutme'>
                        <p className='abouttext'>{pageText.text1}</p>
                        <p className='abouttext'>{pageText.text2}</p>
                        <p className='abouttext'>{pageText.text3}</p>
                        <p className='abouttext'>{pageText.text4}</p>
                        <p className='abouttext'>{pageText.text5}</p>
                    </div>
                </div>
            </div>

        </>
    )
        ;
};

export default AboutPage;
