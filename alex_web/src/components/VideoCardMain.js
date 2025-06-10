import React, { useState, useEffect, useRef } from "react";
import "../VideoCardMain.css";

const VideoCardMain = () => {
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

  const handleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    /**
     * list of cards
     */
    <div className="cards-list">
      {[
        "VS3EE8v5pcY",
        "tjO1eWQ7AM8",
        "SGx_vYfs_P0",
        "-VOMQDBQjfE",
        "z52ZuqvYXM8",
        "yx3AYiFVIis",
        "TuoRb0lvfpI",
        "MjNJ0IbfN-g",
      ].map((videoId, index) => (
        <div
          key={index}
          ref={(el) => (cardsRef.current[index] = el)}
          className={`card3 ${flippedIndex === index ? "flipped" : ""}`}
          onClick={() => handleFlip(index)}
        >
          <div className="card-inner">
            <div className="card-front">
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="YouTube thumbnail"
              />
            </div>
            <div className="card-back">
              {flippedIndex === index && (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=0&modestbranding=1&controls=0&rel=0`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoCardMain;
