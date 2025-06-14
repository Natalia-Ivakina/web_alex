import { useEffect, useState, useRef } from "react";
import ManageHomeComponent from "../components/ManageHomeVideo";
import "../styles/VideoCardMain.css";

const VideoCard = ({
  index,
  videoId,
  flippedIndex,
  setFlippedIndex,
  setCardRef,
  auth,
  color,
  apiType,
  onReplace,
  onChangeColor,
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
    >
      <div className="card-inner" onClick={handleFlip}>
        <div className={`card-front ${auth ? "auth" : ""}`}>
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="thumbnail"
          />
          <div className="play-button">
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
        <div className="home-adminPanel">
          <ManageHomeComponent
            index={index}
            apiType={apiType}
            onChangeColor={onChangeColor}
            onReplace={onReplace}
          />
        </div>
      )}
      {/*_______________________________________________________*/}
    </div>
  );
};

export default VideoCard;
