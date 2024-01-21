import React from "react";
import { Navbar1 } from "./components/Navbar/Navbar1.jsx";
import { Home, Login, Books, Signup, BookDetails } from "./pages";
import {
  EditBook,
  CreateBooks,
  DeleteBook,
  ShowBook,
  AdminHome,
} from "./admin/pages";
import AdminAuthRoute from "./components/others/AdminAuth.jsx";

import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/Cart.jsx";

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar1 />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/books" element={<Books />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books/:id" element={<BookDetails />} />
        
        <Route element={<AdminAuthRoute />}>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="admin/create" element={<CreateBooks />} />
          <Route path="admin/details/:id" element={<ShowBook />} />
          <Route path="admin/edit/:id" element={<EditBook />} />
          <Route path="admin/delete/:id" element={<DeleteBook />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
