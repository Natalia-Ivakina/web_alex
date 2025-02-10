import { useEffect, useState } from "react";
import { checkAuth } from "../services/loginService";
import DeleteReorderButtonsComponent from "../components/DeleteReorderButtons";
import VideosPerPageSelector from "../components/VideosPerPageSelector";
import PaginationNavigator from "../components/PaginationNavigator";
import { editVideoCount } from "../services/videoPerPageService";
import PageTextComponent from "./PageText";
import AddNewVideoComponent from "./AddVideoForm";
import {EditPageTextComponent} from "./EditPageText";
import {loadPageText} from "../services/pageTextService";


const VideoList = ({
                       videos,
                       apiType,
                       deleteVideos,
                       reorderVideos,
                       videosPerPage: externalVideosPerPage,
                       addVideos,

}) => {
    const [message, setMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [internalVideosPerPage, setInternalVideosPerPage] = useState(externalVideosPerPage || 4); // Default 4 videos per page
    const [inputVideosPerPage, setInputVideosPerPage] = useState(internalVideosPerPage);
    const [pageText, setPageText] = useState({
        title: '',
        text: '',
    });

    const updatePageText = (updatedText) => {
        setPageText(updatedText);
    };

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

    // Fetch the initial page text
    useEffect(() => {
        const fetchPageText = async () => {
            try {
                const textData = await loadPageText(apiType);
                setPageText(textData);
            } catch (error) {
                console.error("Error fetching page text:", error);
            }
        };

        fetchPageText();
    }, [apiType]);

    useEffect(() => {
        // Update internalVideosPerPage if externalVideosPerPage changes
        if (externalVideosPerPage !== internalVideosPerPage) {
            setInternalVideosPerPage(externalVideosPerPage);
        }
    }, [externalVideosPerPage]);

    const indexOfLastVideo = currentPage * internalVideosPerPage;
    const indexOfFirstVideo = indexOfLastVideo - internalVideosPerPage;
    const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);
    const totalPages = Math.ceil(videos.length / internalVideosPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleVideosPerPageInputChange = (e) => {
        setInputVideosPerPage(e.target.value);
    };

    const handleSaveVideosPerPage = async () => {
        const value = parseInt(inputVideosPerPage, 10);
        if (!isNaN(value) && value > 0) {
            setInternalVideosPerPage(value);
            setCurrentPage(1);
            try {
                // Save count to the server
                await editVideoCount(apiType, value);
                setMessage("Number videos per page updated successfully!");
            } catch (error) {
                setMessage(error.message);
            }
        } else {
            setMessage("Please enter a valid number greater than 0.");
        }
    };

    /**
     * clear msg - 5 sec
     */
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    useEffect(() => {
        setInputVideosPerPage(internalVideosPerPage);
    }, [internalVideosPerPage]);

    return (
        <div>
            {isAuthenticated && (
                <div>
                    <div>
                        <div className="row adminlayout">
                            <AddNewVideoComponent
                                apiType={apiType}
                                onAddVideo={addVideos}
                            />
                            <EditPageTextComponent
                                apiType={apiType}
                                onTextUpdate={updatePageText}
                                textData={pageText}
                            />
                        </div>
                    </div>
                    <div>
                        <PageTextComponent
                            pageText={pageText}/>
                    </div>
                    <div className="row content">
                        <div>
                            <VideosPerPageSelector
                                inputVideosPerPage={inputVideosPerPage}
                                handleVideosPerPageInputChange={handleVideosPerPageInputChange}
                                handleSaveVideosPerPage={handleSaveVideosPerPage}
                                message={message}/>
                        </div>
                    </div>
                </div>
            )}

            <div className="video-grid">
                {currentVideos.length > 0 ?
                    (currentVideos.map((project, index) => {
                        const videoId = new URLSearchParams(
                            new URL(project.link).search
                        ).get("v");
                        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                        return (
                            <div key={project.name} className="video-item">
                                <p>{project.name}</p>
                                <iframe
                                    width="560"
                                    height="315"
                                    src={embedUrl}
                                    title={project.name}
                                    allow="
                                accelerometer;
                                autoplay;
                                clipboard-write;
                                encrypted-media;
                                gyroscope;
                                picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                                {isAuthenticated && (
                                    <div>
                                        <DeleteReorderButtonsComponent
                                            videoName={project.name}
                                            apiType={apiType}
                                            onActionComplete={(msg) => setMessage(msg)}
                                            OnDelete={deleteVideos}
                                            OnReorder={reorderVideos}
                                        />
                                        <p>Video # {index + 1}</p>
                                    </div>
                                )}
                            </div>);
                    })) :
                    (<p>No projects available.</p>)
                }
            </div>
            <PaginationNavigator
                currentPage={currentPage}
                totalPages={totalPages}
                goToPrevPage={goToPrevPage}
                goToNextPage={goToNextPage}
            />
        </div>
        );
    };

export default VideoList;