import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProductProvider } from "./context/BookContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";

import { CartProvider } from "./context/CartContext.jsx";
import { SnackbarProvider } from "notistack";

// Import css files
import { BrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <SnackbarProvider>
        <AuthProvider>
          <CartProvider>
            <SearchProvider>
              <ProductProvider>
                <ThemeProvider>
                  <App />
                </ThemeProvider>
              </ProductProvider>
            </SearchProvider>
          </CartProvider>
        </AuthProvider>
      </SnackbarProvider>
    </React.StrictMode>
  </BrowserRouter>
);
