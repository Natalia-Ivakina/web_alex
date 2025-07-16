import { createContext, useContext, useState, useEffect } from "react";
import {
  checkAuth,
  login as apiLogin,
  logout as apiLogout,
} from "../services/loginService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth()
      .then(setIsAuthenticated)
      .catch(() => setIsAuthenticated(false));
  }, []);

  const login = async (username, password) => {
    await apiLogin(username, password);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await apiLogout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
