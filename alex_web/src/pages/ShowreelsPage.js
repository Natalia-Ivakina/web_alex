import VideoPageTemplate from "../components/VideoPageTemplate";
import NavBar from "../components/NavBar";
const ShowreelsPage = () => (
  <>
    <NavBar />
    <div className="wrapper">
      <VideoPageTemplate apiType="showreels" />
    </div>
  </>
);

export default ShowreelsPage;
