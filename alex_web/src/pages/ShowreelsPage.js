import { useEffect, useState } from "react";
import { loadVideos } from "../services/videoService";
import VideoList from "../components/VideoList";
import AddNewVideoComponent from "../components/AddVideoForm";

const ShowreelsPage = () => {
    const [showreel, setShowreel] = useState([]);

    const fetchVideos = async () => {
        try {
            const videos = await loadVideos("showreels");
            setShowreel(videos);
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
        setShowreel(videos);
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
            <div>
                <h2>Show reels</h2>
                <AddNewVideoComponent
                    apiType="showreels"
                    onAddVideo={afterAddVideos} />
            </div>
            <p className="headertext">Show reel</p>
            <VideoList
                videos={showreel}
                apiType="showreels"
                deleteVideos={afterDeleteVideos}
                reorderVideos={afterReorderVideos}/>
        </>
    );
};

export default ShowreelsPage;