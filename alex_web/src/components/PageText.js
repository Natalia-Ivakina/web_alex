import React, { useEffect, useState } from "react";

const PageTextComponent = ({ pageText }) => {

    return (
        <div>
            <p className="headertext">{pageText.title}</p>
            <p className="amvtext">{pageText.text1}</p>
            <p className="amvtext">{pageText.text2}</p>
            <p className="amvtext">{pageText.text3}</p>
        </div>
    );
};

export default PageTextComponent;