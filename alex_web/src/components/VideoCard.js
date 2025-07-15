import React, { useState, useEffect, useRef } from "react";
import "../styles/VideoCard.css";

const VideoCard = ({ videoId, title, color, description }) => {
  const [showVideo, setShowVideo] = useState(false);
  const videoCardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        videoCardRef.current &&
        !videoCardRef.current.contains(event.target)
      ) {
        setShowVideo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [videoCardRef]);

  return (
    <div className="video-card" ref={videoCardRef}>
      {showVideo ? (
        <div>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&controls=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          ></iframe>
        </div>
      ) : (
        <div className="video-img" onClick={() => setShowVideo(true)}>
          {/* tooltip */}
          {description?.length > 0 && (
            <span className="tooltipdesc">{description}</span>
          )}
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
          />
          <div className="play-button">
            <svg viewBox="0 0 24 24" fill={`#${color}`}>
              <path d="M5 3l14 9-14 9z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
