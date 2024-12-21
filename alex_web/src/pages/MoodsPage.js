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

    //new list
    const afterAddVideos = (videos) => {
        setMoods(videos);
    };

    //new list after deleting
    const afterDeleteVideos = (updatedVideos) => {
        setMoods(updatedVideos);
    };
    return (
        <>
            <div>
                <h2>Moods</h2>
                <AddNewVideoComponent apiType="moods" onAddVideo={afterAddVideos}/>
            </div>
            <p className="headertext">Moods</p>
            <VideoList videos={moods} apiType="moods" updateVideos={afterDeleteVideos}/> {/* Updated to use moods */}
        </>
    );
};

export default MoodsPage;