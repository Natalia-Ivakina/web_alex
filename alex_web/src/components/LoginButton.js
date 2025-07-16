import React, { useState, useEffect } from "react";
import LoginFormComponent from "./LoginForm";
import LogoutButtonComponent from "../components/LogoutButton";
import { useAuth } from "../contexts/AuthContext";

const LoginButtonComponent = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminClick = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      setIsLoginVisible(false);
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <button id="loginButton" onClick={handleAdminClick}>
        <img src="/logome.png" alt="Login" />
      </button>

      {isLoginVisible && !isAuthenticated && (
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

      {isAuthenticated && (
        <div className="login-form">
          <p>Hi, Admin!</p>
          <LogoutButtonComponent />
        </div>
      )}
    </div>
  );
};

export default LoginButtonComponent;
