import { useEffect, useState, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { checkAuth } from "../services/loginService";
import DeleteReorderButtonsComponent from "../components/DeleteReorderButtons";
import VideosPerPageSelector from "../components/VideosPerPageSelector";
import PaginationNavigator from "../components/PaginationNavigator";
import { editVideoCount } from "../services/videoPerPageService";
import PageTextComponent from "./PageText";
import AddNewVideoComponent from "./AddVideoForm";
import { EditPageTextComponent } from "./EditPageText";
import { loadPageText } from "../services/pageTextService";

const VideoList = ({
  videos,
  apiType,
  deleteVideos,
  reorderVideos,
  videosPerPage: externalVideosPerPage,
  addVideos,
}) => {
  const queryClient = useQueryClient();

  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [internalVideosPerPage, setInternalVideosPerPage] = useState(
    externalVideosPerPage || 4
  ); // Default 4 videos per page
  const [inputVideosPerPage, setInputVideosPerPage] = useState(
    internalVideosPerPage
  );

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
    staleTime: 1000 * 60 * 5, // кэш живёт 5 минут
  });

  const updatePageText = (updatedText) => {
    queryClient.setQueryData(["pageText", apiType], updatedText);
  };

  //pagination__________________________________
  useEffect(() => {
    // Update internalVideosPerPage if externalVideosPerPage changes
    if (externalVideosPerPage !== internalVideosPerPage) {
      setInternalVideosPerPage(externalVideosPerPage);
    }
  }, [externalVideosPerPage]);

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

  const handleVideosPerPageInputChange = (e) => {
    setInputVideosPerPage(e.target.value);
  };

  const handleSaveVideosPerPage = async () => {
    const value = parseInt(inputVideosPerPage, 10);
    if (!isNaN(value) && value > 0) {
      setInternalVideosPerPage(value);
      setCurrentPage(1);
      try {
        // Save count to the server
        await editVideoCount(apiType, value);
        setMessage("Number videos per page updated successfully!");
      } catch (error) {
        setMessage(error.message);
      }
    } else {
      setMessage("Please enter a valid number greater than 0.");
    }
  };

  /**
   * clear msg - 5 sec
   */
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    setInputVideosPerPage(internalVideosPerPage);
  }, [internalVideosPerPage]);

  // Lazy loading video iframe________________________________________
  const videoRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const iframe = entry.target;
            iframe.src = iframe.dataset.src; // Lazy load the video source
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
            <div className="row content">
              <div>
                <VideosPerPageSelector
                  inputVideosPerPage={inputVideosPerPage}
                  handleVideosPerPageInputChange={
                    handleVideosPerPageInputChange
                  }
                  handleSaveVideosPerPage={handleSaveVideosPerPage}
                  message={message}
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
              const embedUrl = `https://www.youtube.com/embed/${videoId}`;
              return (
                <div key={project.name} className="video-item">
                  <p>{project.name}</p>
                  <iframe
                    width="560"
                    height="315"
                    src={embedUrl}
                    title={project.name}
                    allow="
                                            accelerometer;
                                            autoplay;
                                            clipboard-write;
                                            encrypted-media;
                                            gyroscope;
                                            picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  {/*_________________ for admin_____________________________*/}
                  {isAuthenticated && (
                    <div>
                      <DeleteReorderButtonsComponent
                        videoName={project.name}
                        apiType={apiType}
                        onActionComplete={(msg) => setMessage(msg)}
                        OnDelete={deleteVideos}
                        OnReorder={reorderVideos}
                      />
                      <p>Video # {index + 1}</p>
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
      <PaginationNavigator
        currentPage={currentPage}
        totalPages={totalPages}
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
      />
    </div>
  );
};

export default VideoList;
