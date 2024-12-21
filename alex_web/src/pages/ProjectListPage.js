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
    const updateVideos = (videos) => {
        setProjects(videos);
    };

    return (
        <>
            <div>
                <h2>Projects</h2>
                <AddNewVideoComponent apiType="projects" onAddVideo={updateVideos}/>
            </div>
            <p className="headertext">Projects</p>
            <VideoList videos={projects} apiType="projects"/>
        </>
    );
};

export default ProjectListPage;