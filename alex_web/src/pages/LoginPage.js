import React, {useEffect, useState} from "react";
import LoginButtonComponent from "../components/LoginButton";

const LoginPage = () => {
    return (
        <>
            <div className="developer-container">
                <p>For Admin Only</p>
                <LoginButtonComponent/>
            </div>
        </>
    );
};

export default LoginPage;