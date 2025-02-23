import React, { useState, useEffect } from "react";
import styles from "../../assets/css/CDashboard.module.css";
import { BASE_URL } from "../../constants/api";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const ClientDashboard = () => {
  const [content, setContent] = useState([]);
  const [copyContent,setCopyContent] = useState([]);
  const [userList, setUserList] = useState([]);
  const [searchQuery,setSearchQuery] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/list/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setList(response.data);
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Failed to load your list!", { theme: "dark" });
    }
  };


  useEffect(() => {
    fetchList();
  }, []);

  const fetchMoviesAndSeries = async () => {
    try {
      const token = localStorage.getItem("token");
      const [moviesResponse, seriesResponse] = await Promise.all([
        axios.get(`${BASE_URL}/movies`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${BASE_URL}/series`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const movies = moviesResponse.data.data;
      const series = seriesResponse.data.data;
      return [...movies, ...series].sort(() => Math.random() - 0.5); 
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const fetchUserList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/list/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserList(response.data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchMoviesAndSeries();
      setContent(data);
      setCopyContent(data);
    };
    loadData();
    fetchUserList();
  }, []);

  const addToList = async (item) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASE_URL}/list/add`,
        {
          userId,
          movieId: item.movieCover ? item._id : null,
          serieId: item.serieCover ? item._id : null,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUserList(); 
    } catch (error) {
      console.error("Error adding to list:", error);
    }
  };

  const isItemInList = (item) => {
    return userList.some((listItem) => 
      listItem.movieId === item._id || listItem.serieId === item._id
    );
  };

  const filtered = content.filter((item)=>item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <div className={`${styles.dashboard}`}>
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

      <div className="bg-black">
        <input className="border rounded mt-12 ml-2 px-3 py-2 text-gray-300" placeholder="search..." type="text" onChange={(e)=>setSearchQuery(e.target.value)}/>
        <h2 className="text-white text-3xl py-5 ml-1">Awarded</h2>
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          freeMode={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {copyContent && filtered.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={styles.movieCard}>
                <Link
                  to={
                    item.movieCover
                      ? `/client/movie-details/${item._id}`
                      : `/client/serie-details/${item._id}`
                  }
                >
                  <img
                    className={styles.movieImage}
                    src={item.movieCover || item.serieCover}
                    alt={item.title}
                  />
                </Link>
                <button
                  className={styles.addButton}
                  onClick={() => addToList(item)}
                  disabled={isItemInList(item)}
                >
                  {isItemInList(item) ? "Added" : "+ List"}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <h2 className="text-white text-3xl py-5 ml-1">My List</h2>
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          freeMode={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {list && list.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={styles.movieCard}>
                <Link
                 to={
                  item?.movieId?.movieCover
                    ? `/client/movie-details/${item.movieId._id}`
                    : `/client/serie-details/${item.serieId._id}`
                }
                >
                  <img
                    className={styles.movieImage}
                    src={item?.movieId?.movieCover || item?.serieId?.serieCover}
                    alt={item?.serieId?.title || item?.movieId?.title}
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <Link to={`/client/messages/${userId}`} className="block">
          <i className="fa-solid fa-message bg-red-600 text-white text-4xl p-4 fixed right-3 bottom-16 rounded z-50"></i>
        </Link>
      </div>
    </>
  );
};

export default ClientDashboard;