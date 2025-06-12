import VideoPageTemplate from "../components/VideoPageTemplate";
import NavBar from "../components/NavBar";
const AmvPage = () => (
  <>
    <NavBar />
    <div className="wrapper">
      <VideoPageTemplate apiType="amv" />
    </div>
  </>
);

export default AmvPage;
