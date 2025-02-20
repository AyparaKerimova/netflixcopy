import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../constants/api";

const MyList = () => {
  const { userId } = useParams(); 
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

  const removeFromList = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/list/remove/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setList((prevList) => prevList.filter((item) => item._id !== itemId));

      toast.success("Removed from your list!", { theme: "dark" });
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove from list!", { theme: "dark" });
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h2 className="text-3xl font-bold mt-24 mb-6 text-center">🎬 My List</h2>

      {list.length === 0 ? (
        <p className="text-center text-gray-400">Your list is empty! 🥺</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {list && list.map((item) => (
            <div key={item?._id} className="relative group">
              <Link  to={
                    item?.movieId?.movieCover
                      ? `/client/movie-details/${item.movieId._id}`
                      : `/client/serie-details/${item.serieId._id}`
                  }>
              <img
                src={item?.serieId?.serieCover || item?.movieId?.movieCover}
                alt={item?.serieId?.title || item?.movieId?.title}
                className="rounded-xl w-full h-52 object-cover shadow-lg transform transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
                <h3 className="text-lg font-semibold">{item?.serieId?.title || item?.movieId?.title}</h3>
                <button
                  onClick={() => removeFromList(item?._id)}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Remove ❌
                </button>
              </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList;
