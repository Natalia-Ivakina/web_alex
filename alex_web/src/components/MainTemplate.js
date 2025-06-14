import React, { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { loadHomeVideos } from "../services/videoService";
import { checkAuth } from "../services/loginService";
import MainCard from "./MainCard";
import NavBar from "./NavBar";
import "../styles/VideoCardMain.css";
import "../styles/Home.css";

const MainTemplate = ({ apiType }) => {
  const queryClient = useQueryClient();
  const [flippedIndex, setFlippedIndex] = useState(null);
  const cardsRef = useRef([]);
  const [message, setMessage] = useState("");

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

  const VideoCardByIndex = ({ index }) => (
    <MainCard
      index={index}
      videoId={extractVideoId(videos[index]?.link || "")}
      flippedIndex={flippedIndex}
      setFlippedIndex={setFlippedIndex}
      setCardRef={setCardRef}
      auth={isAuthenticated}
      color={videos[index]?.color || ""}
      apiType={apiType}
      onReplace={afterCRUDVideo}
      onChangeColor={afterCRUDVideo}
    />
  );

  return (
    <div className="film-grid">
      <div className="empty-cell"></div>
      <div className="photo-cell"></div>
      <div className="film-cell">
        <VideoCardByIndex index={0} />
        <VideoCardByIndex index={1} />
      </div>
      <div className="photo-cell"></div>
      <div className="info-cell">
        <div className="info" id="homeNav">
          <NavBar />
        </div>
        <div className="top-transparent">
          <div className="info">
            <img src="./Edited.png" alt=""></img>
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
        <VideoCardByIndex index={2} />
        <VideoCardByIndex index={3} />
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
        <img src="./mark.png" id="photomark" alt=""></img>
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
        <VideoCardByIndex index={4} />
        <VideoCardByIndex index={5} />
      </div>
      <div className="photo-cell"></div>
      <div className="info-cell">
        <div className="bottom-transparent">
          <div className="info">
            <img src="./Sound.png" alt=""></img>
          </div>
          <div className="info">
            <img src="./VFX.png" alt=""></img>
          </div>
          <div className="info">
            <img src="./Written.png" alt=""></img>
          </div>
        </div>
        <div className="info">
          <div className="row developer" id="homeFooter">
            <p>Design and Development by Natalia Ivakina © ~ 2025</p>
          </div>
        </div>
      </div>
      <div className="photo-cell"></div>
      <div className="film-cell">
        <VideoCardByIndex index={6} />
        <VideoCardByIndex index={7} />
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
  );
};

export default MainTemplate;
