import { useEffect, useState } from "react";
import { loadVideos } from "../services/videoService";
import VideoList from "../components/VideoList";
import AddNewVideoComponent from "../components/AddVideoForm";
import { loadVideoCount, editVideoCount } from "../services/videoPerPageService";


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
                reorderVideos={afterReorderVideos}
                videosPerPage={videosPerPage} // Pass the dynamic
            />
        </>
    );
};

export default ShowreelsPage;