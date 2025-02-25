import React from 'react';
import '../Card3.css';

const Card3 = () => {
    return (
        <div className="cards-list">
            {[
                "VS3EE8v5pcY",
                "tjO1eWQ7AM8",
                "SGx_vYfs_P0",
                "-VOMQDBQjfE"
            ].map((videoId, index) => (
                <div className="card3" key={index}>
                    <div className="card_image">
                        <img src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} alt="YouTube thumbnail"/>
                    </div>
                </div>

            ))}
        </div>
    );
};

export default Card3;