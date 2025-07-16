import React, { useState, useEffect } from "react";
import { logout, checkAuth } from "../services/loginService"; // Import the login services
import { useAuth } from "../contexts/AuthContext";

const LogoutButtonComponent = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      {isAuthenticated && (
        <div className="login-form">
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </>
  );
};

export default LogoutButtonComponent;
