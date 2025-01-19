import VideoList from "../components/VideoList";
import AddNewVideoComponent from "../components/AddVideoForm";
import {useEffect, useState} from "react";
import {loadVideos} from "../services/videoService";
import { loadVideoCount, editVideoCount } from "../services/videoPerPageService";

const AmvPage = () => {
    const [amv, setAmv] = useState([]);
    const [videosPerPage, setVideosPerPage] = useState(4); // Default value

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
    const afterAddVideos = (videos) => {
        setAmv(videos);
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
            <div>
                <h2>AMV</h2>
                <AddNewVideoComponent
                    apiType="amv"
                    onAddVideo={afterAddVideos}/>
            </div>
            <p className="headertext">amvProjects</p>
            <p className="amvtext">Here are some explanations to help you make sense of what you’re seeing on this page.
                AMV stands for "Anime Music Video."
                Amv is a massive culture, with animemusicvideos.org as its core.
                Simply put, it’s a huge community of anime, video editing, and visual effects fans.
                And they use all of their passion and knowledge to make short videos using a variety of anime
                sources and all the world’s music.
                They do it not for sale, not for profit, they do it because they feel it!
                Some of them are real pro’s in video editing, motion design and visual effects.
                I’m proud to have been a part of the Amv community!
                And who knows, maybe I’ll go back to the origins eventually.</p>
            <VideoList
                videos={amv}
                apiType="amv"
                deleteVideos={afterDeleteVideos}
                reorderVideos={afterReorderVideos}
                videosPerPage={videosPerPage} // Pass the dynamic
            />
        </>
    );
};

export default AmvPage;