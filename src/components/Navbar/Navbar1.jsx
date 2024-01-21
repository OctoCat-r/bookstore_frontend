import React, { useState, useContext } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { Search } from "@mui/icons-material";
import axios from "axios";
import Search1 from "./Search";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

import Cart from "../Cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toast } from "react-toastify";

export function Navbar1() {
  const [openNav, setOpenNav] = useState(false);
  const [cart] = useCart();
  const count = cart?.length || 0;
  const admin = sessionStorage.getItem("admin");

  const [openCart, setOpenCart] = useState(false);
  const token = localStorage.getItem("token");
  const { logout, user } = useContext(AuthContext);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const handleCartOpening = (e) => {
    e.preventDefault();

    if (token) {
      setOpenCart(true);
    } else {
      console.log("amans");
      toast.warning("Please login first");
    }
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to="/books" className="flex items-center">
          Books
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <a
          href="#"
          className="flex items-center"
          onClick={(e) => {
            handleCartOpening(e);
          }}
        >
          <ShoppingCartIcon />
          {count > 0 && (
            <div className="top-0 -mt-5 -translate-x-1/2 px-1 py-0.75 rounded-full bg-red-500 text-white text-xs font-bold">
              {count}
            </div>
          )}
        </a>
      </Typography>
      {token || admin ? (
        <Link to="/">
          <button
            className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3"
            onClick={logout} // Trigger logout on click
          >
            Logout
          </button>
        </Link>
      ) : (
        <Link to="/login">
          <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3">
            Login/SignUp
          </button>
        </Link>
      )}
    </ul>
  );

  return (
    <>
      {openCart && <Cart open={openCart} setOpen={setOpenCart} />}
      <Navbar className="mx-auto max-w-screen-3xl px-4 py-2 lg:px-2 lg:py-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="flex items-center mr-auto cursor-pointer py-1.5 font-bold text-2xl"
            variant="h1"
          >
            BookStore
          </Typography>
          <div className="hidden mr-10 gap-x-2 lg:flex">
            <Search1 />
          </div>
          <div className="hidden lg:block ml-2">{navList}</div>

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <MobileNav open={openNav}>
          <div className="container mx-auto">
            {navList}
            <div className="flex flex-col gap-x-2 sm:flex-row sm:items-center">
              <div className="relative w-full gap-2 md:w-max">
                <Input
                  type="search"
                  placeholder="Search"
                  containerProps={{
                    className: "min-w-[288px]",
                  }}
                  className=" !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <div className="absolute inset-y-0 right-0  flex items-center">
                  <IconButton>
                    <Search />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        </MobileNav>
      </Navbar>
    </>
  );
}
