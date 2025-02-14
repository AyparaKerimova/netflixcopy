import React from "react";
import styles from "../../assets/css/CDashboard.module.css";
import { BASE_URL } from "../../constants/api";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const ClientDashboard = () => {
  const [content, setContent] = useState([]);
  const fetchMoviesAndSeries = async () => {
    try {
      const token = localStorage.getItem("token");
      const [moviesResponse, seriesResponse] = await Promise.all([
        axios.get(`${BASE_URL}/movies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(`${BASE_URL}/series`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const movies = moviesResponse.data.data;
      const series = seriesResponse.data.data;

      const combinedData = [...movies, ...series];

      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };

      return shuffleArray(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchMoviesAndSeries();
      setContent(data);
    };
    loadData();
  }, []);

  return (
    <>
      <div className={styles.dashboard}>
        <img
          className="absolute bottom-0"
          width={400}
          src="https://upload.wikimedia.org/wikipedia/commons/9/92/Squid_Game_international_logo.png"
          alt="squid game"
        />
        <div className="absolute bottom-12 right-0 bg-gray-500 opacity-80 px-3 py-1">
          <p className="text-white text-lg">16 +</p>
        </div>
      </div>
      <div>
        <h2>Netflix-style Dashboard</h2>
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {content.map((item, index) => (
            <SwiperSlide key={index}>
              <Link to={item.movieCover? `/client/movie-details/${item._id}`: `/client/serie-details/${item._id}` }>
              <img
                style={{ width: "300px", height: "200px", objectFit: "cover" }}
                src={item.movieCover || item.serieCover}
                alt={item.title}
              />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ClientDashboard;
