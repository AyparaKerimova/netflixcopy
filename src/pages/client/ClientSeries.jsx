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
import Footer from "../../components/common/Footer";

const ClientSeries = () => {
  const [content, setContent] = useState([]);
  const [copyContent,setCopyContent] = useState([]);
  const [userList, setUserList] = useState([]);
  const [searchQuery,setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

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
      return [...series].sort(() => Math.random() - 0.5); 
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

  let filtered = content.filter((item)=>item.title.toLowerCase().includes(searchQuery.toLowerCase()));
   filtered = selectedGenre
    ? filtered.filter((item) => item.genre.includes(selectedGenre))
    : filtered;
  return (
    <>
      <div className={`${styles.series}`}>
        <img
          className="absolute bottom-0"
          width={400}
          src="https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABc-Lz5VWQvtOl6Zpx9ltsxhqGcix53cs38POtgZfByjT-b83PzcGtiBNYL4d7ySlhd_161sry1evArYLyu8kwnAnSTzhxe8qWHJFmxIlRWHA3STl9NsFdTtPPUB0G-arVJSCNDlgG9JDP1-GGk9L84VcgBiX4qHGrmhLfy36_tdI3QWEf2NDiQ.png?r=53c"
          alt="squid game"
        />
        <div className="absolute bottom-12 right-0 bg-gray-500 opacity-80 px-3 py-1">
          <p className="text-white text-lg">16 +</p>
        </div>
      </div>

      <div className="bg-black">
        <input className="border rounded mt-12 ml-2 px-3 py-2 text-gray-300" placeholder="search..." type="text" onChange={(e)=>setSearchQuery(e.target.value)}/>
        <select className=" rounded px-3 py-2 text-gray-300 ml-4" name="" onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">All</option>
          <option value="drama">Drama</option>
          <option value="crime">Crime</option>
          <option value="comedy">Comedy</option>
          <option value="romantic">Romantic</option>
          <option value="scifi">Sci-Fi</option>
          <option value="detective">Detective</option>
          <option value="horror">horror</option>
          <option value="thriller">thriller</option>
        </select>
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
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          freeMode={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
        </Swiper>

        <Link to={`/client/messages/${userId}`} className="block">
          <i className="fa-solid fa-message bg-red-600 text-white text-4xl p-4 fixed right-3 bottom-16 rounded z-50"></i>
        </Link>
        <Footer/>
      </div>

    </>
  );
};

export default ClientSeries;