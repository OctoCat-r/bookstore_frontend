import React, { useState, useEffect } from "react";
import { MdStar } from "react-icons/md";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import axios from "axios";

export default function Product() {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState({});
  const [quantity, setQuanity] = useState(1);
  const [cart, setCart] = useCart();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:4000/api/v1/books/${id}`
          `https://book-store-backend-roan.vercel.app/api/v1/books/${id}`
        );
        setBookDetails(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fetchData();
  }, [id]);

  const handleButtonClick = (e) => {
    e.preventDefault();
    // const BookData = ServicesData.filter((item) => item.id === id);
    // console.log(BookData);

    if (token) {
      setCart([...cart, bookDetails]);
      localStorage.setItem("cart", JSON.stringify([...cart, bookDetails]));
      console.log(cart);
      toast.success("Added to cart");
    } else {
      toast.warning("Please login first");
    }
  };
  const rating = parseInt(bookDetails[0]?.rating);
  console.log(typeof rating);

  console.log(quantity);
  return (
    <div className="container mx-auto p-4">
      {" "}
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        {" "}
        <div className="w-full md:w-1/4 aspect-w-16 aspect-h-9 rounded-xl overflow-hidden py-6 mt-10">
          {" "}
          <img
            src={bookDetails[0]?.image}
            alt={bookDetails[0]?.title}
            className="h-full w-full object-cover align-middle mt-7"
          />
        </div>
        <div className="flex flex-col w-full md:w-2/3 justify-between">
          <div>
            <h1 className="text-3xl text-red-500 font-semibold sm:text-4xl top-0 inset-0">
              {bookDetails[0]?.title}
            </h1>
            <span className="text-gray-500 group-hover:text-black duration-high text-xs line-clamp-2">
              - by {bookDetails[0]?.authors}
            </span>

            <hr className="w-full mb-3 mt-3" />
            <p className="mt-3 text-gray-600 text-md leading-6 text-justify sm:text-left sm:mt-4">
              {bookDetails[0]?.description}
            </p>
            <p className="mt-3 text-gray-600 text-md leading-6 text-justify sm:text-left sm:mt-4">
              Genre: {bookDetails[0]?.genre}
            </p>
            <span className="my-3 text-xl text-yellow-600 flex items-center gap-1 sm:my-4">
              {Array.from({ length: rating }).map((_, index) => (
                <MdStar key={index} />
              ))}
            </span>
            <span className="text-xl text-red-500 font-semibold sm:text-2xl mb-4 py-1">
              Rs. {bookDetails[0]?.price}
            </span>
          </div>
          <div className="flex flex-row items-center gap-4 mt-3">
            
            <button
              className="w-1/2 py-2 px-4 bg-red-500 text-white text-md font-bold border border-red-500 rounded-md hover:bg-white hover:text-red-500"
              onClick={(e) => handleButtonClick(e)}
            >
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
