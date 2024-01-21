import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchSearchResults = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        // `http://localhost:4000/api/v1/books/search?query=${searchQuery}`
        `https://book-store-backend-roan.vercel.app/api/v1/books/search?query=${searchQuery}`
      );
      const data = response.data.data;
      console.log(data); 
      setSearchResults(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    console.log(searchQuery);
    if (searchQuery) {
      fetchSearchResults();
    }
    navigate("/books");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const value = {
    searchQuery,
    searchResults,
    isLoading,
    error,
    handleSearchChange,
    handleSearchClick,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
