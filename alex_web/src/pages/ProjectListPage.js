import VideoList from "../components/VideoList";
import AddNewVideoComponent from "../components/AddVideoForm";
import { useEffect, useState } from "react";
import {loadVideos} from "../services/videoService";

const ProjectListPage = () => {
    const [projects, setProjects] = useState([]);

    const fetchVideos = async () => {
        try {
            const videos = await loadVideos("projects");
            setProjects(videos);
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
                reorderVideos={afterReorderVideos}/>
        </>
    );
};

export default ProjectListPage;