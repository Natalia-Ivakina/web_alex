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
  const [videos, setVideos] = useState([]);

  // fetch & cache videos
  const {
    data,
    error: videosError,
    isLoading: videosLoading,
    refetch: refetchVideos,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: () => loadHomeVideos(),
    staleTime: 1000 * 60 * 5, //5 min
  });

  useEffect(() => {
    if (data) setVideos(data);
  }, [data]);

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

  return (
    <div className="film-grid">
      <div className="empty-cell"></div>
      <div className="photo-cell"></div>
      <div className="film-cell">
        <MainCard
          index={0}
          videoId={videos[0] ? extractVideoId(videos[0].link) : ""}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[0] ? videos[0].color : ""}
        />

        <MainCard
          index={1}
          videoId={videos[1] ? extractVideoId(videos[1].link) : ""}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[1] ? videos[1].color : ""}
        />
      </div>
      <div className="photo-cell"></div>
      <div className="info-cell">
        <div className="info" id="homeNav">
          <NavBar />
        </div>
        <div className="top-transparent">
          <div className="info">
            <img src="./Edited.png"></img>
          </div>
          <div className="info">
            <img src="./Directed.png"></img>
          </div>
          <div className="info">
            <img src="./Color_Grading.png"></img>
          </div>
        </div>
      </div>
      <div className="photo-cell"></div>
      <div className="film-cell">
        <MainCard
          index={2}
          videoId={videos[2] ? extractVideoId(videos[2].link) : ""}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[2] ? videos[2].color : ""}
        />

        <MainCard
          index={3}
          videoId={videos[3] ? extractVideoId(videos[3].link) : ""}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[4] ? extractVideoId(videos[4].color) : ""}
        />
      </div>
      <div className="photo-cell">
        <div className="photo">
          <img src="./17_2.png" id="top17"></img>
        </div>
        <div className="photo">
          <img src="./20_2.png" id="top20"></img>
        </div>
      </div>
      <div className="empty-cell"></div>
      <div className="empty-cell"></div>
      <div className="photo-cell">
        <img src="./mark.png" id="photomark"></img>
      </div>
      <div className="photo-cell"></div>
      <div className="photo-cell"></div>
      <div className="photo-cell">
        <img src="./Alex_Logo1.png" id="photoName"></img>
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
          videoId={videos[4] ? extractVideoId(videos[4].link) : ""}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[4] ? videos[4].color : ""}
        />

        <MainCard
          index={5}
          videoId={videos[5] ? extractVideoId(videos[5].link) : ""}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[5] ? videos[5].color : ""}
        />
      </div>
      <div className="photo-cell"></div>
      <div className="info-cell">
        <div className="bottom-transparent">
          <div className="info">
            <img src="./Sound.png"></img>
          </div>
          <div className="info">
            <img src="./VFX.png"></img>
          </div>
          <div className="info">
            <img src="./Written.png"></img>
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
        <MainCard
          index={6}
          videoId={videos[6] ? extractVideoId(videos[6].link) : ""}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[6] ? videos[6].color : ""}
        />

        <MainCard
          index={7}
          videoId={videos[7] ? extractVideoId(videos[7].link) : ""}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
          auth={isAuthenticated}
          color={videos[7] ? videos[7].color : ""}
        />
      </div>
      <div className="photo-cell">
        <div className="photo">
          <img src="./17.png" id="bottom17"></img>
        </div>
        <div className="photo">
          <img src="./20.png" id="bottom20"></img>
        </div>
      </div>
      <div className="empty-cell"></div>
    </div>
  );
};

export default MainTemplate;
