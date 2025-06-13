import React, { useRef, useEffect } from "react";
import ManageHomeVideoComponent from "../components/ManageHomeVideo";
import "../styles/VideoCardMain.css";

const VideoCard = ({
  videoId,
  index,
  flippedIndex,
  setFlippedIndex,
  setCardRef,
  auth,
  color,
}) => {
  const cardRef = useRef();

  useEffect(() => {
    setCardRef(index, cardRef.current);
  }, [index, setCardRef]);

  const handleFlip = () => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <div
      ref={cardRef}
      className={`card3 ${flippedIndex === index ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      <div className="card-inner">
        <div className="card-front">
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="thumbnail"
          />
          <div id="play-button">
            <div>
              <svg viewBox="0 0 24 24" fill={`#${color}`}>
                <path d="M5 3l14 9-14 9z" />
              </svg>
            </div>
          </div>
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
      {/*_________________ for admin_____________________________*/}
      {auth && (
        <div id="admin-counter-panel">
          {/* <ManageHomeVideoComponent
            index={index}
            apiType={apiType}
            onActionComplete={(msg) => setMessage(msg)}
            onChangeColor={changeColor}
            onReplace={changeColor}
          />*/}
          <p>Video # {index + 1}</p>
        </div>
      )}
      {/*_______________________________________________________*/}
    </div>
  );
};

export default VideoCard;
