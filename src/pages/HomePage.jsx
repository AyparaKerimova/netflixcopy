import React from "react";
import Slider from "../components/common/Slider";
import styles from "../assets/css/Home.module.css";
import Navbar from "../components/common/Navbar";
import { Link } from "react-router-dom";
import TrendingMovies from "../components/common/TrendingMovies";

const HomePage = () => {
  return (
    <>
      <div className={styles.homeBackground}>
        <Navbar />
        <Slider />
        <p className="text-center text-gray-300 text-lg mt-10">
          Ready to watch? Create an account or restart your membership.
        </p>
        <Link to="/registration-previous" className="mt-12 px-8 py-4 bg-red-600 from-blue-500 to-purple-500 text-white font-bold rounded-full hover:-translate-y-1 hover:shadow-lg mx-auto flex justify-center w-46">
          Get Started
        </Link>
        <h2>Trending Now</h2>
        <TrendingMovies/>
      </div>
    </>
  );
};

export default HomePage;
