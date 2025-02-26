import VideoList from "../components/VideoList";
import { useEffect, useState } from "react";
import {loadVideos} from "../services/videoService";
import { loadVideoCount } from "../services/videoPerPageService";

const MoodsPage = () => {
    const [moods, setMoods] = useState([]);
    const [videosPerPage, setVideosPerPage] = useState(4); // Default value

    const fetchVideos = async () => {
        try {
            const videos = await loadVideos("moods");
            setMoods(videos);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    const fetchVideosPerPage = async () => {
        try {
            const quantity = await loadVideoCount("moods");

            if (isNaN(quantity)) {
                console.error("Invalid quantity:", quantity);
                return;
            }

            setVideosPerPage(quantity); //videos per page
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
        setMoods(newVideos);
    };
    //after deleting
    const afterDeleteVideos = (updatedVideos) => {
        setMoods(updatedVideos);
    }
    //after reordering
    const afterReorderVideos = (reorderedVideos) => {
        setMoods(reorderedVideos);
    };
    return (
        <>
            <VideoList
                videos={moods}
                apiType="moods"
                deleteVideos={afterDeleteVideos}
                reorderVideos={afterReorderVideos}
                videosPerPage={videosPerPage} // Pass the dynamic
                addVideos={afterAddVideo}
            />
        </>
    );
};

export default MoodsPage;