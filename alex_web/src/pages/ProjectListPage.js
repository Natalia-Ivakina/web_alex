import VideoList from "../components/VideoList";
import { useEffect, useState } from "react";
import {loadVideos} from "../services/videoService";
import { loadVideoCount } from "../services/videoPerPageService";

const ProjectListPage = () => {
    const [projects, setProjects] = useState([]);
    const [videosPerPage, setVideosPerPage] = useState(4); // Default value

    const fetchVideos = async () => {
        try {
            const videos = await loadVideos("projects");
            setProjects(videos);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    const fetchVideosPerPage = async () => {
        try {
            const quantity = await loadVideoCount("projects");

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
        setProjects(newVideos);
    };
    //after deleting
    const afterDeleteVideos = (updatedVideos) => {
        setProjects(updatedVideos);
    }
    //after reordering
    const afterReorderVideos = (reorderedVideos) => {
        setProjects(reorderedVideos);
    };

    return (
        <>
            <VideoList
                videos={projects}
                apiType="projects"
                deleteVideos={afterDeleteVideos}
                reorderVideos={afterReorderVideos}
                videosPerPage={videosPerPage} // Pass the dynamic
                addVideos={afterAddVideo}
            />
        </>
    );
};

export default ProjectListPage;