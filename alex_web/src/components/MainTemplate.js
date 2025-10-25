import React, { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { loadHomeVideos } from "../services/videoService";
import MainCard from "./MainCard";
import NavBar from "./NavBar";
import { useAuth } from "../contexts/AuthContext";
import "../styles/VideoCardMain.css";
import "../styles/Home.css";
import LogoutButtonComponent from "../components/LogoutButton";

const MainTemplate = ({ apiType }) => {
  const { isAuthenticated } = useAuth();

  const queryClient = useQueryClient();
  const [flippedIndex, setFlippedIndex] = useState(null);
  const cardsRef = useRef([]);
  const [message, setMessage] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  //size of screen
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 900);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // fetch & cache videos
  const {
    data: videos = [],
    //error: videosError,
    //isLoading: videosLoading,
    refetch: refetchVideos,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: () => loadHomeVideos(),
    staleTime: 1000 * 60 * 5, //5 min
  });

  const extractVideoId = (url) => {
    const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (flippedIndex !== null) {
        const clickedOutside = cardsRef.current.every(
          (cardRef, index) =>
            index !== flippedIndex ||
            (cardRef && !cardRef.contains(event.target))
        );

        if (clickedOutside) {
          setFlippedIndex(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [flippedIndex]);

  const setCardRef = (index, element) => {
    cardsRef.current[index] = element;
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // after any change - refetch
  const afterCRUDVideo = () => refetchVideos();

  return !isSmallScreen ? (
    <div className="film-grid">
      <div className="empty-cell"></div>
      <div className="photo-cell"></div>
      <div className="film-cell">
        <LogoutButtonComponent></LogoutButtonComponent>
        <MainCard
          index={0}
          videoId={extractVideoId(videos[0]?.link || "")}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[0]?.color || ""}
          apiType={apiType}
          onReplace={afterCRUDVideo}
          onChangeColor={afterCRUDVideo}
        />
        <MainCard
          index={1}
          videoId={extractVideoId(videos[1]?.link || "")}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[1]?.color || ""}
          apiType={apiType}
          onReplace={afterCRUDVideo}
          onChangeColor={afterCRUDVideo}
        />
      </div>
      <div className="photo-cell"></div>
      <div className="info-cell">
        <div className="info" id="homeNav">
          <NavBar />
        </div>
        <div className="top-transparent">
          <div className="info">
            <img src="./Video-editing.png" alt=""></img>
          </div>
          <div className="info">
            <img src="./Directed.png" alt=""></img>
          </div>
          <div className="info">
            <img src="./Color_Grading.png" alt=""></img>
          </div>
        </div>
      </div>
      <div className="photo-cell"></div>
      <div className="film-cell">
        <MainCard
          index={2}
          videoId={extractVideoId(videos[2]?.link || "")}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[2]?.color || ""}
          apiType={apiType}
          onReplace={afterCRUDVideo}
          onChangeColor={afterCRUDVideo}
        />
        <MainCard
          index={3}
          videoId={extractVideoId(videos[3]?.link || "")}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[3]?.color || ""}
          apiType={apiType}
          onReplace={afterCRUDVideo}
          onChangeColor={afterCRUDVideo}
        />
      </div>
      <div className="photo-cell">
        <div className="photo">
          <img src="./17_2.png" id="top17" alt=""></img>
        </div>
        <div className="photo">
          <img src="./20_2.png" id="top20" alt=""></img>
        </div>
      </div>
      <div className="empty-cell"></div>
      <div className="empty-cell"></div>
      <div className="photo-cell">
        <img src="./Mark.png" id="photomark" alt=""></img>
      </div>
      <div className="photo-cell"></div>
      <div className="photo-cell"></div>
      <div className="photo-cell">
        <img src="./Alex_Logo1.png" id="photoName" alt=""></img>
      </div>
      <div className="photo-cell"></div>
      <div className="photo-cell"></div>
      <div className="photo-cell"></div>
      <div className="empty-cell"></div>
      <div className="empty-cell"></div>
      <div className="photo-cell"></div>
      <div className="film-cell">
        <MainCard
          index={4}
          videoId={extractVideoId(videos[4]?.link || "")}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[4]?.color || ""}
          apiType={apiType}
          onReplace={afterCRUDVideo}
          onChangeColor={afterCRUDVideo}
        />
        <MainCard
          index={5}
          videoId={extractVideoId(videos[5]?.link || "")}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[5]?.color || ""}
          apiType={apiType}
          onReplace={afterCRUDVideo}
          onChangeColor={afterCRUDVideo}
        />
      </div>
      <div className="photo-cell"></div>
      <div className="info-cell">
        <div className="bottom-transparent">
          <div className="info">
            <img src="./Sound_design.png" alt=""></img>
          </div>
          <div className="info">
            <img src="./VFX_1.png" alt=""></img>
          </div>
          <div className="info">
            <img src="./Written_story.png" alt=""></img>
          </div>
        </div>
        <div className="info">
          <div className="row developer" id="homeFooter">
            <p>Design and Development by Natalia Ivakina ~ 2025</p>
          </div>
        </div>
      </div>
      <div className="photo-cell"></div>
      <div className="film-cell">
        <MainCard
          index={6}
          videoId={extractVideoId(videos[6]?.link || "")}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[6]?.color || ""}
          apiType={apiType}
          onReplace={afterCRUDVideo}
          onChangeColor={afterCRUDVideo}
        />
        <MainCard
          index={7}
          videoId={extractVideoId(videos[7]?.link || "")}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[7]?.color || ""}
          apiType={apiType}
          onReplace={afterCRUDVideo}
          onChangeColor={afterCRUDVideo}
        />
      </div>
      <div className="photo-cell">
        <div className="photo">
          <img src="./17.png" id="bottom17" alt=""></img>
        </div>
        <div className="photo">
          <img src="./20.png" id="bottom20" alt=""></img>
        </div>
      </div>
      <div className="empty-cell"></div>
    </div>
  ) : (
    <div className="film-grid">
      <div className="empty-cell"></div>
      <div className="empty-cell"></div>
      <div className="empty-cell">
        <NavBar />
        <LogoutButtonComponent></LogoutButtonComponent>
      </div>
      <div className="empty-cell"></div>
      <div className="logo-cell">
        <img src="./Alex_Logo1.png" id="smallName" alt="" />
      </div>
      <div className="empty-cell"></div>
      <div className="empty-cell">
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
      </div>
      <div className="empty-cell">
        <MainCard
          index={0}
          videoId={extractVideoId(videos[0]?.link || "")}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[0]?.color || ""}
          apiType={apiType}
          onReplace={afterCRUDVideo}
          onChangeColor={afterCRUDVideo}
        />
      </div>
      <div className="empty-cell">
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
      </div>
      <div className="empty-cell"></div>
      <div className="logo-cell">
        <img src="./Video-editing.png" alt=""></img>
      </div>
      <div className="empty-cell"></div>
      <div className="empty-cell">
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
      </div>
      <div className="empty-cell">
        <MainCard
          index={1}
          videoId={extractVideoId(videos[1]?.link || "")}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[1]?.color || ""}
          apiType={apiType}
          onReplace={afterCRUDVideo}
          onChangeColor={afterCRUDVideo}
        />
      </div>
      <div className="empty-cell">
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
      </div>
      <div className="empty-cell"></div>
      <div className="logo-cell">
        <img src="./Directed.png" alt=""></img>
      </div>
      <div className="empty-cell"></div>
      <div className="empty-cell">
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
      </div>

      <div className="empty-cell">
        <MainCard
          index={2}
          videoId={extractVideoId(videos[2]?.link || "")}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[2]?.color || ""}
          apiType={apiType}
          onReplace={afterCRUDVideo}
          onChangeColor={afterCRUDVideo}
        />
      </div>
      <div className="empty-cell">
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
      </div>
      <div className="empty-cell"></div>
      <div className="logo-cell">
        <img src="./Color_Grading.png" alt=""></img>
      </div>
      <div className="empty-cell"></div>
      <div className="empty-cell">
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
      </div>

      <div className="empty-cell">
        <MainCard
          index={3}
          videoId={extractVideoId(videos[3]?.link || "")}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[3]?.color || ""}
          apiType={apiType}
          onReplace={afterCRUDVideo}
          onChangeColor={afterCRUDVideo}
        />
      </div>
      <div className="empty-cell">
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
      </div>
      <div className="empty-cell"></div>
      <div className="logo-cell">
        <img src="./Sound_design.png" alt=""></img>
      </div>
      <div className="empty-cell"></div>
      <div className="empty-cell">
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
      </div>

      <div className="empty-cell">
        <MainCard
          index={4}
          videoId={extractVideoId(videos[4]?.link || "")}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[4]?.color || ""}
          apiType={apiType}
          onReplace={afterCRUDVideo}
          onChangeColor={afterCRUDVideo}
        />
      </div>
      <div className="empty-cell">
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
      </div>
      <div className="empty-cell"></div>
      <div className="logo-cell">
        <img src="./VFX_1.png" alt=""></img>
      </div>
      <div className="empty-cell"></div>
      <div className="empty-cell">
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
      </div>

      <div className="empty-cell">
        <MainCard
          index={5}
          videoId={extractVideoId(videos[5]?.link || "")}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[5]?.color || ""}
          apiType={apiType}
          onReplace={afterCRUDVideo}
          onChangeColor={afterCRUDVideo}
        />
      </div>
      <div className="empty-cell">
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
      </div>
      <div className="empty-cell"></div>
      <div className="logo-cell">
        <img src="./Written_story.png" alt=""></img>
      </div>
      <div className="empty-cell"></div>
      <div className="empty-cell">
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
      </div>
      <div className="empty-cell">
        <MainCard
          index={6}
          videoId={extractVideoId(videos[6]?.link || "")}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[6]?.color || ""}
          apiType={apiType}
          onReplace={afterCRUDVideo}
          onChangeColor={afterCRUDVideo}
        />
      </div>
      <div className="empty-cell">
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
        <div className="light-cell"></div>
      </div>
    </div>
  );
};

export default MainTemplate;
