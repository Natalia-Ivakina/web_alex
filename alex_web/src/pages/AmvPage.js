import VideoList from "../components/VideoList";
import AddNewVideoComponent from "../components/AddVideoForm";
import {useEffect, useState} from "react";
import {loadVideos} from "../services/videoService";
import { loadVideoCount, editVideoCount } from "../services/videoPerPageService";
import PageTextComponent from "../components/PageText";
import EditPageTextComponent from "../components/EditPageText";

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
            <div className="horizontal-container">
                <AddNewVideoComponent
                    apiType="amv"
                    onAddVideo={afterAddVideos}/>
                <EditPageTextComponent
                    apiType="amv"/>
            </div>
            <PageTextComponent
                apiType="amv"
            />
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