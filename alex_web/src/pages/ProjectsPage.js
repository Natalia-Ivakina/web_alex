import VideoPageTemplate from "../components/VideoPageTemplate";
import NavBar from "../components/NavBar";
const ProjectsPage = () => (
  <>
    <NavBar />
    <div className="wrapper">
      <VideoPageTemplate apiType="projects" />
    </div>
  </>
);

export default ProjectsPage;
