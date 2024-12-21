import {useState} from "react";
import DeleteReorderButtonsComponent from "../components/DeleteReorderButtons";

const VideoList = ({videos, apiType, deleteVideos, reorderVideos}) => {
    const [message, setMessage] = useState('');

    return (
        <div>
            {message && <div className="message">{message}</div>}
            <div className="video-grid">
                {videos && videos.length > 0 ? (
                    videos.map((project, index) => {
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
        </div>
    );
};

export default VideoList;