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

    // Check if the user is authenticated when the component mounts
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuth()
            .then((authenticated) => {
                setIsAuthenticated(authenticated); // Set authentication state
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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
    );
};


export default HomePage;