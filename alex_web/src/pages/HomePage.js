import {useEffect, useState} from "react";
import { EditPageTextComponent } from "../components/EditPageText";
import PageTextComponent from "../components/PageText";
import {loadPageText} from "../services/pageTextService";
import { checkAuth } from "../services/loginService";
import Card3 from "../components/AnimatedCard3";

const HomePage = () => {
    const [message, setMessage] = useState("");
    const [pageText, setPageText] = useState({
        title: '',
        text: '',
    });
    const [isLoading, setIsLoading] = useState(true);

    // Check if the user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuth()
            .then((authenticated) => {
                setIsAuthenticated(authenticated);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    //pause for text_________________________
    useEffect(() => {
        const fetchPageText = async () => {
            try {
                const textData = await loadPageText('home');
                setPageText(textData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching page text:", error);
                setIsLoading(false);
            }
        };

        fetchPageText();
    }, ['home']);

    const updatePageText = (updatedText) => {
        setPageText(updatedText);
    };

    return (
        <>
            {!isLoading ? (
                <>
                    {isAuthenticated && (
                        <div className="adminlayout">
                            <EditPageTextComponent
                                apiType="home"
                                onTextUpdate={updatePageText}
                                textData={pageText}
                            />
                        </div>
                    )}
                    <div>
                        <PageTextComponent pageText={pageText}/>
                        <Card3/>
                    </div>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};


export default HomePage;