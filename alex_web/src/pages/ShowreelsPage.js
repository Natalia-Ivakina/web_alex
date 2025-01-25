import { useEffect, useState } from "react";
import { loadVideos } from "../services/videoService";
import VideoList from "../components/VideoList";
import { loadVideoCount } from "../services/videoPerPageService";


const ShowreelsPage = () => {
    const [showreel, setShowreel] = useState([]);
    const [videosPerPage, setVideosPerPage] = useState(4); // Default value

    const fetchVideos = async () => {
        try {
            const videos = await loadVideos("showreels");
            setShowreel(videos);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    const fetchVideosPerPage = async () => {
        try {
            const quantity = await loadVideoCount("showreels");

            if (isNaN(quantity)) {
                console.error("Invalid quantity:", quantity);
                return;
            }

            setVideosPerPage(quantity); // Set the videos per page
        } catch (error) {
            console.error("Error fetching videos per page:", error);
        }
    };

    //start page
    useEffect(() => {
        fetchVideos();
        fetchVideosPerPage();
    }, []);

    //new list
    const afterAddVideo = (newVideos) => {
        setShowreel(newVideos);
    };
    //after deleting
    const afterDeleteVideos = (updatedVideos) => {
        setShowreel(updatedVideos);
    }
    //after reordering
    const afterReorderVideos = (reorderedVideos) => {
        setShowreel(reorderedVideos);
    };

    return (
        <>
            <VideoList
                videos={showreel}
                apiType="showreels"
                deleteVideos={afterDeleteVideos}
                reorderVideos={afterReorderVideos}
                videosPerPage={videosPerPage} // Pass the dynamic
                addVideos={afterAddVideo}
            />
        </>
    );
};

export default ShowreelsPage;