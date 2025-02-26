import React, {useEffect, useState} from "react";
import {loadPageText} from "../services/pageTextService";
import {EditPageTextComponent} from "../components/EditPageText";
import { checkAuth } from "../services/loginService";

const AboutPage = () => {
    const [isMediumScreen, setIsMediumScreen] = useState(false);
    const [pageText, setPageText] = useState({
        title: '',
        text: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isImagesLoaded, setIsImagesLoaded] = useState(false);

    // Check if the user is authenticated_____________
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuth()
            .then((authenticated) => {
                setIsAuthenticated(authenticated); // Set auth state
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    //pause for text_________________________
    useEffect(() => {
        const fetchPageText = async () => {
            try {
                const textData = await loadPageText('about');
                setPageText(textData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching page text:", error);
                setIsLoading(false);
            }
        };

        fetchPageText();
    }, ['about']);

    const updatePageText = (updatedText) => {
        setPageText(updatedText);
    };

    //pause for img_________________________
    useEffect(() => {
        const images = [
            '/findme.png',
            '/textme.png',
            '/arrow.png',
            '/logome.png'
        ];

        let loadedImages = 0;

        const preloadImages = () => {
            images.forEach((src) => {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    loadedImages += 1;
                    if (loadedImages === images.length) {
                        setIsImagesLoaded(true);
                    }
                };
                img.onerror = () => {
                    console.error(`Error loading image: ${src}`);
                };
            });
        };

        preloadImages();
    }, []);

    //size of screen_______________________
    useEffect(() => {
        const handleResize = () => {
            setIsMediumScreen(window.innerWidth <= 1024);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

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
            {!isLoading && isImagesLoaded ? (
                <>
                    <div className="page-container">
                        <main>
                            {isAuthenticated && (
                                <div className="adminlayout">
                                    <EditPageTextComponent
                                        apiType="about"
                                        onTextUpdate={updatePageText}
                                        textData={pageText}
                                    />
                                </div>
                            )}
                            <div>
                                <p className="headertext">{pageText.title}</p>
                                <div className='edit-form'>
                                    <div className="row">
                                        <div className='aboutme'>
                                            {pageText.text.split('\n').map((line, index) => (
                                                <p className='abouttext' key={index}>
                                                    {line}
                                                </p>
                                            ))}
                                        </div>
                                        {!isMediumScreen && contactBlock}
                                    </div>
                                    <div className="row">
                                        {isMediumScreen && contactBlock}
                                        <div className="container2 right-align">
                                            <div id="me">
                                                <p><img src="/textme.png" alt="logo"/></p>
                                            </div>
                                            <div id="arrow">
                                                <img src="/arrow.png" alt="logo"/>
                                            </div>
                                            <div id="logo">
                                                <img src="/logome.png" alt="logo"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>

                    <div className="row developer">
                        <p>Design and Development by Natalia Ivakina © ~ 2025</p>
                    </div>
                        </>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default AboutPage;
