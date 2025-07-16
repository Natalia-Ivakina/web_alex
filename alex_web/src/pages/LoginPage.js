import React from "react";
import { Helmet } from "react-helmet-async";
import LoginButtonComponent from "../components/LoginButton";
import "../styles/LoginForm.css";
import NavBar from "../components/NavBar";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <NavBar />
      <div className="wrapper">
        <div className="developer-container">
          <LoginButtonComponent />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
