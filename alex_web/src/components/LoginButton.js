import React, { useState, useEffect } from "react";
import { login, logout, checkAuth } from "../services/loginService"; // Import the login services
import LoginFormComponent from "./LoginForm";

const LoginButtonComponent = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Check if the user is logged
  useEffect(() => {
    checkAuth()
      .then((authenticated) => {
        setIsUserLoggedIn(authenticated);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAdminClick = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login(username, password);
      setIsUserLoggedIn(true);
    } catch (error) {
      alert("Login failed");
    }
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call logout service
      setIsUserLoggedIn(false);
    } catch (error) {
      alert("Logout failed");
    }
  };

  return (
    <div className="login-container">
      <button id="loginButton" onClick={handleAdminClick}>
        <img src="/logome.png" alt="Login" />
      </button>

      {isLoginVisible && !isUserLoggedIn && (
        <div className="login-form-container">
          <LoginFormComponent
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleLogin}
          />
        </div>
      )}

      {isUserLoggedIn && (
        <div className="login-form">
          <p>Hi, Admin!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default LoginButtonComponent;
