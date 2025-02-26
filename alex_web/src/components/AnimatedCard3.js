import React, { useState } from "react";
import '../Card3.css';

const Card3 = () => {
    const [flippedIndex, setFlippedIndex] = useState(null);

    const handleFlip = (index) => {
        setFlippedIndex(flippedIndex === index ? null : index);
    };
    return (
        <div className="cards-list">
            {[
                "VS3EE8v5pcY",
                "tjO1eWQ7AM8",
                "SGx_vYfs_P0",
                "-VOMQDBQjfE"
            ].map((videoId, index) => (
                <div
                    key={index}
                    className={`card3 ${flippedIndex === index ? "flipped" : ""}`}
                    onClick={() => handleFlip(index)}
                >
                    <div className="card-inner">
                        <div className="card-front">
                            <img src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                 alt="YouTube thumbnail"/>
                        </div>
                        <div className="card-back">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&modestbranding=1&controls=1&rel=0`}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    );
};

export default Card3;