import {useEffect, useState} from "react";
import DeleteReorderButtonsComponent from "../components/DeleteReorderButtons";
import PaginationComponent from "../components/Pagination";

const VideoList = ({videos, apiType, deleteVideos, reorderVideos}) => {
    const [message, setMessage] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [videosPerPage, setVideosPerPage] = useState(4); // Default 4 videos per page
    const [inputVideosPerPage, setInputVideosPerPage] = useState(videosPerPage); // For input field value

    // index of page
    const indexOfLastVideo = currentPage * videosPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
    const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

    // number of pages
    const totalPages = Math.ceil(videos.length / videosPerPage);

    // next page
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // pre page
    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // handle change in number of videos per page (input field change)
    const handleVideosPerPageInputChange = (e) => {
        setInputVideosPerPage(e.target.value);
    };

    // handle save button click (apply the new videos per page value)
    const handleSaveVideosPerPage = () => {
        const value = parseInt(inputVideosPerPage, 10);
        if (!isNaN(value) && value > 0) {
            setVideosPerPage(value);
            setCurrentPage(1); // reset to first page when changing video per page
        } else {
            setMessage('Please enter a valid number greater than 0.');
        }
    };


    /**
     * clear msg - 5 sec
     */
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 5000); // 5 sec
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div>
            <div className="reorder">
                <PaginationComponent
                    inputVideosPerPage={inputVideosPerPage}
                    handleVideosPerPageInputChange={handleVideosPerPageInputChange}
                    handleSaveVideosPerPage={handleSaveVideosPerPage}
                />
            </div>
            {message && <div className="message">{message}</div>}
            <div className="video-grid">
                {currentVideos && currentVideos.length > 0 ? (
                    currentVideos.map((project, index) => {
                        const videoId = new URLSearchParams(new URL(project.link).search).get("v");
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
                                <span style={{width: '100%'}}>
                                    {/* for admin */}
                                    <DeleteReorderButtonsComponent
                                        videoName={project.name}
                                        apiType={apiType}
                                        onActionComplete={(msg) => setMessage(msg)}
                                        OnDelete={deleteVideos}
                                        OnReorder={reorderVideos}
                                    />
                                    <p>Video # {index + 1}</p>
                                </span>
                            </div>
                        );
                    })
                ) : (
                    <p>No projects available.</p>
                )}
            </div>

            {/* Pagination */}
            {videosPerPage > 0 && (
                <div className="pagination">
                    <button onClick={goToPrevPage} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
                </div>)
            }
        </div>
    );
};

export default VideoList;