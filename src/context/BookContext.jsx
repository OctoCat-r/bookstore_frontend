import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://book-store-backend-roan.vercel.app/api/v1/books"
        );
        const fetchedProducts = response.data.data;

        const sortedProducts = sortBy
          ? fetchedProducts.slice().sort((a, b) => {
              if (sortBy === "desc") {
                return b.price - a.price; 
              } else {
                return a.price - b.price; 
              }
            })
          : fetchedProducts;
        setProducts(sortedProducts);
        console.log(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortBy]);

  const sortProducts = (sortBy) => {
    setSortBy(sortBy);
  };

  const value = { products, loading, error, sortProducts };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
