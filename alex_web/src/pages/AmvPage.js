import VideoList from "../components/VideoList";
import {useEffect, useState} from "react";
import {loadVideos} from "../services/videoService";
import { loadVideoCount, editVideoCount } from "../services/videoPerPageService";

const AmvPage = () => {
    const [amv, setAmv] = useState([]);
    const [videosPerPage, setVideosPerPage] = useState();

    const fetchVideos = async () => {
        try {
            const videos = await loadVideos("amv");
            setAmv(videos);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    const fetchVideosPerPage = async () => {
        try {
            const quantity = await loadVideoCount("amv");

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
        setAmv(newVideos);
    };
    //after deleting
    const afterDeleteVideos = (updatedVideos) => {
        setAmv(updatedVideos);
    }
    //after reordering
    const afterReorderVideos = (reorderedVideos) => {
        setAmv(reorderedVideos);
    };


    return (
        <>
            <VideoList
                videos={amv}
                apiType="amv"
                deleteVideos={afterDeleteVideos}
                reorderVideos={afterReorderVideos}
                videosPerPage={videosPerPage} // Pass the dynamic
                addVideos={afterAddVideo}

            />
        </>
    );
};

export default AmvPage;