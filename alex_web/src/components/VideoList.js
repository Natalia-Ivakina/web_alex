import { useEffect, useState } from "react";
import DeleteReorderButtonsComponent from "../components/DeleteReorderButtons";
import VideosPerPageSelector from "../components/VideosPerPageSelector";
import PaginationNavigator from "../components/PaginationNavigator";
import { loadVideoCount, editVideoCount } from "../services/videoPerPageService";

const VideoList = ({ videos, apiType, deleteVideos, reorderVideos, videosPerPage: externalVideosPerPage }) => {
    const [message, setMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [internalVideosPerPage, setInternalVideosPerPage] = useState(externalVideosPerPage || 4); // Default 4 videos per page
    const [inputVideosPerPage, setInputVideosPerPage] = useState(internalVideosPerPage);

    useEffect(() => {
        // Update internalVideosPerPage if externalVideosPerPage changes
        if (externalVideosPerPage !== internalVideosPerPage) {
            setInternalVideosPerPage(externalVideosPerPage);
        }
    }, [externalVideosPerPage]); // Depend on externalVideosPerPage

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
        //console.log("inputted value:", value);
        if (!isNaN(value) && value > 0) {
            setInternalVideosPerPage(value);
            setCurrentPage(1);

            try {
                // Save count to the server
                await editVideoCount(apiType, value);
                setMessage("Video count updated successfully!");
            } catch (error) {
                setMessage("Error updating video count.");
            }
        } else {
            setMessage("Please enter a valid number greater than 0.");
        }
    };

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
    }, [internalVideosPerPage]); // update inputVideosPerPage

    return (
        <div>
            <div className="controls">
                <VideosPerPageSelector
                    inputVideosPerPage={inputVideosPerPage}
                    handleVideosPerPageInputChange={handleVideosPerPageInputChange}
                    handleSaveVideosPerPage={handleSaveVideosPerPage}
                    message={message}
                />
            </div>

            <div className="video-grid">
                {currentVideos.length > 0 ? (
                    currentVideos.map((project, index) => {
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
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                                <DeleteReorderButtonsComponent
                                    videoName={project.name}
                                    apiType={apiType}
                                    onActionComplete={(msg) => setMessage(msg)}
                                    OnDelete={deleteVideos}
                                    OnReorder={reorderVideos}
                                />
                                <p>Video # {index + 1}</p>
                            </div>
                        );
                    })
                ) : (
                    <p>No projects available.</p>
                )}
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