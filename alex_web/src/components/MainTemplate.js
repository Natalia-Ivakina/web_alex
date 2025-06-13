import React, { useState, useEffect, useRef } from "react";
import "../styles/VideoCardMain.css";
import "../styles/Home.css";
import MainCard from "./MainCard";
import NavBar from "./NavBar";

const MainTemplate = () => {
  const [flippedIndex, setFlippedIndex] = useState(null);
  const cardsRef = useRef([]);

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

  const videoIds = [];

  return (
    <div className="film-grid">
      <div className="empty-cell"></div>
      <div className="photo-cell"></div>
      <div className="film-cell">
        <MainCard
          index={0}
          videoId="VS3EE8v5pcY"
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
        />

        <MainCard
          index={1}
          videoId="tjO1eWQ7AM8"
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
        />
      </div>
      <div className="photo-cell"></div>
      <div className="info-cell">
        <div className="info" id="homeNav">
          <NavBar />
        </div>
        <div class="top-transparent">
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
          videoId="SGx_vYfs_P0"
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
        />

        <MainCard
          index={3}
          videoId="-VOMQDBQjfE"
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
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
          videoId="z52ZuqvYXM8"
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
        />

        <MainCard
          index={5}
          videoId="yx3AYiFVIis"
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
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
          videoId="TuoRb0lvfpI"
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
        />

        <MainCard
          index={7}
          videoId="MjNJ0IbfN-g"
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setCardRef={setCardRef}
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
