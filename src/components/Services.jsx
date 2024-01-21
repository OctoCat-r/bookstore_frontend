import React, { useState, useContext } from "react";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Services = ({ ServicesData }) => {
  const token = localStorage.getItem("token");
  const [ cart, setCart ] = useCart();

  const handleButtonClick = (e, id) => {
    e.preventDefault();
    const BookData = ServicesData.filter((item) => item.id === id);
    console.log(BookData);

    if (token) {
      setCart([...cart, BookData]);
      localStorage.setItem("cart", JSON.stringify([...cart, BookData]));
      console.log(cart);
      toast.success("Added to cart");
    } else {
      toast.warning("Please login first");
    }
  };
  return (
    <>
      <span id="services"></span>
      <div className="py-1">
        <div className="container">
          <div className="text-center mb-20 max-w-[400px] mx-auto">
            <h1 className="text-3xl font-mono">Best Books</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-10 place-items-center">
            {ServicesData?.map((service) => (
              <div
                data-aos="zoom-in"
                className="rounded-2xl bg-white dark:bg-gray-800 hover:shadow-2xl hover:scale-110 dark:hover:bg-primary hover:text-white relative shadow-lg duration-high group max-w-[250px] mb-10"
              >
                <Link to={`/books/${service?.id}`} className="h-[100px]">
                  <img
                    src={service.image}
                    alt=""
                    className="max-w-[100px] block mx-auto transform -translate-y-14
                  group-hover:scale-105  duration-300 shadow-md"
                  />
                </Link>
                <div className="p-4 text-center">
                  <h1 className="text-xl font-bold text-black">
                    {service.title}
                  </h1>
                  <span className="text-gray-500 group-hover:text-black duration-high text-xs line-clamp-2">
                    - by {service.authors}
                  </span>
                  <br></br>
                  {/* <span>{service.rating}</span>
                  <span>Rs. {service.price}</span> */}
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <span className=" text-gray-500 group-hover:text-black ">
                      {service?.rating}
                    </span>
                    <span className="text-gray-500 group-hover:text-black ">
                      &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rs.{" "}
                      {service.price}
                    </span>
                  </div>
                  <br></br>
                  {/* <p className="text-gray-500 group-hover:text-black duration-high text-sm line-clamp-2">
                    {service.description}
                  </p> */}
                  <button
                    className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full group-hover:bg-cyan-300 group-hover:text-black"
                    onClick={(e) => handleButtonClick(e, service.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
