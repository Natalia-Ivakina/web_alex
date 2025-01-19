import VideoList from "../components/VideoList";
import AddNewVideoComponent from "../components/AddVideoForm";
import { useEffect, useState } from "react";
import {loadVideos} from "../services/videoService";
import { loadVideoCount, editVideoCount } from "../services/videoPerPageService";

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
    const afterAddVideos = (videos) => {
        setProjects(videos);
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
            <div>
                <h2>Projects</h2>
                <AddNewVideoComponent
                    apiType="projects"
                    onAddVideo={afterAddVideos}/>
            </div>
            <p className="headertext">Projects</p>
            <VideoList
                videos={projects}
                apiType="projects"
                deleteVideos={afterDeleteVideos}
                reorderVideos={afterReorderVideos}
                videosPerPage={videosPerPage} // Pass the dynamic
            />
        </>
    );
};

export default ProjectListPage;