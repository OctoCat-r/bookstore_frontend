import React, { createContext, useState, useEffect } from "react";
import axios from "axios"; 
// import { Jwt } from "jsonwebtoken";
// import { jwt_decode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoading(true);

      try {
        const decoded = jwtDecode(storedToken);
        // setUser(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
        setErrorMessage("Invalid token");
        removeToken();
      } finally {
        setIsLoading(false);
      }
    }
  }, []);
  const login = async (username, password) => {
    setErrorMessage(null);
    setIsLoading(true);

    const response = await axios.post(
      // "http://localhost:4000/api/v1/books/login",
      "https://book-store-backend-roan.vercel.app/api/v1/books/login",
      { username, password }
    );

    console.log(response.data);

    if (response.data.message === "ok") {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      console.log(response.data.user);
      // setUser(response.data.user);
      localStorage.setItem("user", response.data.user.id);
      return true;
    } else {
      return false;
    }
  };

  const register = async (username, password, email) => {
    const response = await axios.post(
      // "http://localhost:4000/api/v1/books/register",
      "https://book-store-backend-roan.vercel.app/api/v1/books/register",
      {
        username,
        password,
        email,
      }
    );
    console.log(response);
    if (response.data.message === "ok") {
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    sessionStorage.removeItem("admin");
    localStorage.removeItem("user");
    setUser(null);
  };

  

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, errorMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
