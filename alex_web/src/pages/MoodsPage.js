import VideoList from "../components/VideoList";
import AddNewVideoComponent from "../components/AddVideoForm";
import { useEffect, useState } from "react";
import {loadVideos} from "../services/videoService";
import { loadVideoCount, editVideoCount } from "../services/videoPerPageService";

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
    const afterAddVideos = (videos) => {
        setMoods(videos);
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
            <div>
                <h2>Moods</h2>
                <AddNewVideoComponent
                    apiType="moods"
                    onAddVideo={afterAddVideos}/>
            </div>
            <p className="headertext">Moods</p>
            <VideoList
                videos={moods}
                apiType="moods"
                deleteVideos={afterDeleteVideos}
                reorderVideos={afterReorderVideos}
                videosPerPage={videosPerPage} // Pass the dynamic
            />
        </>
    );
};

export default MoodsPage;