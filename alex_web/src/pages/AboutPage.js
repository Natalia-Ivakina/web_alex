import React, {useEffect, useState} from "react";
import {loadPageText} from "../services/pageTextService";
import {EditPageTextComponent} from "../components/EditPageText";

const AboutPage = () => {
    const [isMediumScreen, setIsMediumScreen] = useState(false);
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

    //size of screnn
    useEffect(() => {
        const handleResize = () => {
            setIsMediumScreen(window.innerWidth <= 1024);
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Устанавливаем начальное состояние

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    //adjustable content
    const contactBlock = (
        <div id="contact">
            <img id="findme" src="/findme.png" alt="Find me" />
            <a id="artstationlink" href="https://www.artstation.com/alexboy">
                ArtStation
            </a>
            <br />
            <a id="youtubelink" href="https://www.youtube.com/user/AlexboyAMV">
                Youtube
            </a>
            <br />
            <a id="linkeldnlink" href="https://www.linkedin.com/in/akialex/">
                LinkedIn
            </a>
        </div>
    );

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
                <p className="headertext">{pageText.title}</p>
                <div className='edit-form' id="footerborder">
                    <div className="row">
                        <div className='aboutme'>
                            <p className='abouttext'>{pageText.text1}</p>
                            <p className='abouttext'>{pageText.text2}</p>
                            <p className='abouttext'>{pageText.text3}</p>
                            <p className='abouttext'>{pageText.text4}</p>
                            <p className='abouttext'>{pageText.text5}</p>
                        </div>
                        {!isMediumScreen && contactBlock}
                    </div>
                    <div className="row pos2">
                        {isMediumScreen && contactBlock}
                        <div className="container2  right-align">
                            <div id="me">
                                <p><img src="/textme.png" alt="logo"/></p>
                                <div id="arrow">
                                    <img src="/arrow.png" alt="logo"/>
                                </div>
                            </div>
                            <div id="logo">
                                <img src="/logome.png" alt="logo"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row developer">
                <p>Design and Development by Natalia Ivakina © ~ 2025</p>
            </div>
        </>
    );
};

export default AboutPage;
