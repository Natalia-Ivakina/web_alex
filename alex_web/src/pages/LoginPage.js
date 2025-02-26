import React from "react";
import { Helmet } from "react-helmet-async";
import LoginButtonComponent from "../components/LoginButton";

const LoginPage = () => {
    return (
        <>
            <Helmet>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="developer-container">
                <p>For Admin Only</p>
                <LoginButtonComponent/>
            </div>
        </>
    );
};

export default LoginPage;