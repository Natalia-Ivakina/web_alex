import { useEffect, useState, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { checkAuth } from "../services/loginService";
import { EditPageTextComponent } from "./EditPageTextForm";
import { loadPageText } from "../services/pageTextService";
import PageTextComponent from "./PageText";
import AddNewVideoComponent from "./AddVideoForm";
import ManageVideoFormComponent from "../components/ManageVideoForm";
import VideosPerPageSelector from "../components/VideosPerPageSelector";
import PaginationNavigator from "../components/PaginationNavigator";
import VideoCard from "./VideoCard";

const VideoList = ({
  videos,
  apiType,
  deleteVideos,
  reorderVideos,
  videosPerPage: externalVideosPerPage,
  addVideos,
  changeColor,
}) => {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [internalVideosPerPage, setInternalVideosPerPage] = useState(
    externalVideosPerPage || 4
  ); // Default 4 videos per page

  // Check if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth()
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Fetch the initial page text
  const {
    data: pageText = { title: "", text: "" },
    isLoading: isTextLoading,
    error: textError,
  } = useQuery({
    queryKey: ["pageText", apiType],
    queryFn: () => loadPageText(apiType),
    staleTime: 1000 * 60 * 5, // 5 min
  });

  const updatePageText = (updatedText) => {
    queryClient.setQueryData(["pageText", apiType], updatedText);
  };

  //pagination
  const indexOfLastVideo = currentPage * internalVideosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - internalVideosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(videos.length / internalVideosPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleVideosPerPageChange = (newCount) => {
    setInternalVideosPerPage(newCount);
    setCurrentPage(1);
  };

  // Lazy loading video iframe________________________________________
  const videoRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const iframe = entry.target;
            iframe.src = iframe.dataset.src;
            observer.unobserve(iframe);
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRef.current.forEach((video) => observer.observe(video));

    return () => {
      videoRef.current.forEach((video) => observer.unobserve(video));
    };
  }, []);

  //if (isTextLoading) return <div>Loading page text...</div>;
  //if (textError) return <div>Error loading text</div>;

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="page-container">
      <main>
        {isAuthenticated && (
          //_________________ for admin_____________________________
          <div>
            <div>
              <div className="row adminlayout">
                <AddNewVideoComponent
                  apiType={apiType}
                  onAddVideo={addVideos}
                />
                <EditPageTextComponent
                  apiType={apiType}
                  onTextUpdate={updatePageText}
                  textData={pageText}
                />
              </div>
            </div>
            <div id="info-pagination-row">
              <div className="infoMessage">
                {message && <div>{message}</div>}
              </div>
              <div className="row content">
                <VideosPerPageSelector
                  initialVideosPerPage={internalVideosPerPage}
                  apiType={apiType}
                  onVideosPerPageChange={handleVideosPerPageChange}
                  onMessage={setMessage}
                />
              </div>
            </div>
          </div>
        )}
        {/*____________________________________________________*/}
        <div>
          <PageTextComponent pageText={pageText} />
        </div>
        <div className="video-grid">
          {currentVideos.length > 0 ? (
            currentVideos.map((project, index) => {
              const videoId = new URLSearchParams(
                new URL(project.link).search
              ).get("v");

              return (
                <div key={project.name} className="video-item">
                  {isAuthenticated && (
                    <div>
                      <p>Video # {index + 1}</p>
                    </div>
                  )}
                  <VideoCard
                    videoId={videoId}
                    title={project.name}
                    color={project.color}
                  />
                  {/*_________________ for admin_____________________________*/}
                  {isAuthenticated && (
                    <div id="admin-counter-panel">
                      <ManageVideoFormComponent
                        videoName={project.name}
                        apiType={apiType}
                        onActionComplete={(msg) => setMessage(msg)}
                        onDelete={deleteVideos}
                        onReorder={reorderVideos}
                        onChangeColor={changeColor}
                      />
                    </div>
                  )}
                  {/*_______________________________________________________*/}
                </div>
              );
            })
          ) : (
            <p>No projects available.</p>
          )}
        </div>
      </main>
      {/*if q of pages > 1*/}
      {totalPages > 1 && (
        <div className="pagination-wrapper">
          <PaginationNavigator
            currentPage={currentPage}
            totalPages={totalPages}
            goToPrevPage={goToPrevPage}
            goToNextPage={goToNextPage}
          />
        </div>
      )}
    </div>
  );
};

export default VideoList;
