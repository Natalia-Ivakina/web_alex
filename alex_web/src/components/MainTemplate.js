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

  const videoIds = [
    "VS3EE8v5pcY",
    "tjO1eWQ7AM8",
    "SGx_vYfs_P0",
    "-VOMQDBQjfE",
    "z52ZuqvYXM8",
    "yx3AYiFVIis",
    "TuoRb0lvfpI",
    "MjNJ0IbfN-g",
  ];

  return (
    <div className="film-grid">
      <div className="empty-cell" id="1">
        1
      </div>
      <div className="foto-cell" id="2">
        2
      </div>
      <div className="film-cell" id="3">
        <div className="film" id="4">
          5
        </div>
        <div className="film" id="6">
          7
        </div>
      </div>
      <div className="foto-cell" id="40">
        40
      </div>
      <div className="info-cell">
        <div class="top-transparent">
          <div className="info" id="32">
            <NavBar />
          </div>
          <div className="info" id="33">
            33
          </div>
          <div className="info" id="34">
            34
          </div>
          <div className="info" id="35">
            35
          </div>
        </div>
      </div>
      <div className="foto-cell" id="41">
        41
      </div>
      <div className="film-cell" id="9">
        <div className="film" id="10">
          10
        </div>
        <div className="film" id="11">
          11
        </div>
      </div>
      <div className="foto-cell" id="12">
        12
      </div>
      <div className="empty-cell" id="13">
        13
      </div>
      <div className="empty-cell" id="25">
        25
      </div>
      <div className="foto-cell" id="26">
        26
      </div>
      <div className="foto-cell" id="27">
        27
      </div>
      <div className="foto-cell" id="28">
        28
      </div>
      <div className="foto-cell" id="29">
        29
      </div>
      <div className="foto-cell" id="30">
        30
      </div>
      <div className="foto-cell" id="31">
        31
      </div>
      <div className="foto-cell" id="14">
        14
      </div>
      <div className="empty-cell" id="15">
        15
      </div>
      <div className="empty-cell" id="44">
        44
      </div>
      <div className="foto-cell" id="45">
        45
      </div>
      <div className="film-cell" id="16">
        <div className="film" id="17">
          17
        </div>
        <div className="film" id="18">
          18
        </div>
      </div>
      <div className="foto-cell" id="42">
        42
      </div>
      <div className="info-cell">
        <div className="bottom-transparent">
          <div className="info" id="36">
            36
          </div>
          <div className="info" id="37">
            37
          </div>
          <div className="info" id="38">
            38
          </div>
          <div className="info" id="39">
            39
          </div>
        </div>
      </div>
      <div className="foto-cell" id="43">
        43
      </div>
      <div className="film-cell" id="20">
        <div className="film" id="21">
          21
        </div>
        <div className="film" id="22">
          22
        </div>
      </div>
      <div className="foto-cell" id="23">
        23
      </div>
      <div className="empty-cell" id="24">
        24
      </div>
    </div>
    // <div className="cards-list">
    //   {videoIds.map((videoId, index) => (
    //     <MainCard
    //       key={index}
    //       index={index}
    //       videoId={videoId}
    //       flippedIndex={flippedIndex}
    //       setFlippedIndex={setFlippedIndex}
    //       setCardRef={setCardRef}
    //     />
    //   ))}
    // </div>
  );
};

export default MainTemplate;
