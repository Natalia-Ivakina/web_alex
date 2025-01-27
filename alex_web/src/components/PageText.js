import React, { useEffect, useState } from "react";

const PageTextComponent = ({ pageText }) => {

    return (
        <div>
            <p className="headertext">{pageText.title}</p>
            {pageText.text.split('\n').map((line, index) => (
                <p className='abouttext' key={index}>
                    {line}
                </p>
            ))}
        </div>
    );
};

export default PageTextComponent;