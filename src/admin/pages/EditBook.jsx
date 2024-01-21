import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  // const [publishYear, setPublishYear] = useState("");
  // const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  // const [id, setId] = useState("");
  const [price, setPrice] = useState(300);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        // `http://localhost:4000/api/v1/books/${id}`
        `https://book-store-backend-roan.vercel.app/api/v1/books/${id}`
      )
      .then((response) => {
        console.log(response.data.data);
        const BookData = response.data.data[0];
        setAuthor(BookData.authors);
        setPrice(BookData?.price);
        setImageUrl(BookData?.image);
        setTitle(BookData?.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please Check console");
        console.log(error);
      });
  }, []);

  const handleEditBook = (e) => {
    e.preventDefault();
    const data = {
      title,
      author,
      price,
      imageUrl,
    };
    setLoading(true);
    axios
      .put(
        `https://book-store-backend-roan.vercel.app/api/v1/books/${id}`,
        data
      )
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Edited successfully", { variant: "success" });
        navigate("/admin");
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <button
          className="p-2 m-8 bg-teal-300 rounded-xl text-white text-xl"
          onClick={(e) => handleEditBook(e)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
