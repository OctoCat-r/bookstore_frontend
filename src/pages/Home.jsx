import React from "react";
import {
  Banner,
  Services,
  NewArrivals,
  Hero,
  Footer,
  BookCard,
} from "../components";
import { Navbar1 } from "../components/Navbar/Navbar1.jsx";
import Img1 from "../assets/books/book2.jpg";
import Img2 from "../assets/books/book1.jpg";
import Img3 from "../assets/books/book3.jpg";
const ServicesData = [
  {
    id: 1,
    image: Img1,
    title: "His Life",
    description:
      "Inspiring those who feel like nothing in their livesis going right. Even for those who want to make a difference in this world or in someone else's life. May they find peace in knowing that there is a better way, God's way",
  },
  {
    id: 2,
    image: Img2,
    title: "Who's there",
    description:
      "This book is about exploration of consciousness and finding the true purpose and meaning of life.",
  },
  {
    id: 3,
    image: Img3,
    title: "Lost Boy",
    description:
      "Trying it God's way is a book about wanting to do things different where all else has failed. It's about giving hope to the hopeless, encouraging those who seek to find a different direction in life and making better choices. Teaching people about trusting God and in His word. Inspiring those who feel like nothing in their livesis going right. Even for those who want to make a difference in this world or in someone else's life. May they find peace in knowing that there is a better way, God's way.",
  },
];
const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Hero />
      <BookCard ServicesData={ServicesData} />
      <Banner />
      <NewArrivals />
      <Footer />
    </div>
  );
};

export default Home;
