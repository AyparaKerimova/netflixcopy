import React from "react";
import Slider from "../components/common/Slider";
import styles from "../assets/css/Home.module.css";
import Navbar from "../components/common/Navbar";
import { Link } from "react-router-dom";
import TrendingMovies from "../components/common/TrendingMovies";
import { useSelector } from "react-redux";
import OfferCards from "../components/common/OfferCards";
import Accordion from "../components/common/Accordion";

const HomePage = () => {
  const { user, token } = useSelector((state) => state.auth);
  return (
    <>
      <div className={styles.homeBackground}>
        <Navbar />
        <Slider />
        <p className="text-center text-gray-300 text-lg mt-10">
          Ready to watch? Create an account or restart your membership.
        </p>
        {user && token ? (
        <Link
          to="/client/dashboard"
          className="mt-12 text-center px-12 py-4 bg-red-600 text-white font-bold rounded-full hover:-translate-y-1 hover:shadow-lg mx-auto flex justify-center w-46"
        >
          Continue to watch
        </Link>
      ) : (
        <Link
          to="/registration-previous"
          className="mt-12 px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:-translate-y-1 hover:shadow-lg mx-auto flex justify-center w-46"
        >
          Get Started
        </Link>
      )}
        <div className="ml-48">
          <h2 className="text-gray-200 text-4xl font-medium">Trending Now</h2>
          <TrendingMovies/>
          <h2 className="text-gray-200 text-4xl font-medium mt-16"> More Reasons to Join</h2>
          <OfferCards/>           
          <h2 className="text-gray-200 text-4xl font-medium mt-16"> Frequently Asked Questions</h2>
          <Accordion/>
        </div>
      </div>
    </>
  );
};

export default HomePage;
