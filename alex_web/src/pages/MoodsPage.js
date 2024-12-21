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
    const updateVideos = (videos) => {
        setMoods(videos);
    };
    return (
        <>
            <div>
                <h2>Moods</h2>
                <AddNewVideoComponent apiType="moods" onAddVideo={updateVideos}/>
            </div>
            <p className="headertext">Moods</p>
            <VideoList videos={moods} apiType="moods"/> {/* Updated to use moods */}
        </>
    );
};

export default MoodsPage;