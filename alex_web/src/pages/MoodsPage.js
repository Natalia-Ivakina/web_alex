import VideoList from "../components/VideoList";
import AddNewVideoComponent from "../components/AddVideoForm";
import { useEffect, useState } from "react";
import {loadVideos} from "../services/videoService";

const MoodsPage = () => {
    const [moods, setMoods] = useState([]);

    const fetchVideos = async () => {
        try {
            const videos = await loadVideos("moods");
            setMoods(videos);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    //start page
    useEffect(() => {
        fetchVideos();
    }, []);

    //after add
    const afterAddVideos = (videos) => {
        setMoods(videos);
    };
    //after deleting
    const afterDeleteVideos = (updatedVideos) => {
        setMoods(updatedVideos);
    };
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
                updateVideos={afterDeleteVideos}
                reorderVideos={afterReorderVideos}/>
        </>
    );
};

export default MoodsPage;