import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminMovieCard from "../../components/admin/AdminMovieCard";
import axios from "axios";
import { BASE_URL } from "../../constants/api";

const AdminDashboard = () => {
  const [movies, setMovies] = useState();
  const [copyMovies, setCopyMovies] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const resp = await axios.get(BASE_URL + "/movies", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMovies(resp.data.data);
        setCopyMovies(resp.data.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="ml-12">
        <div className="flex gap-2 mt-6">
          <Link
            to="/admin/add-movie"
            className="bg-red-600 text-white px-12 py-3 rounded"
          >
            Add Movie
          </Link>
          <Link
            to="/admin/add-serie"
            className="bg-black text-white px-12 py-3 rounded"
          >
            Add Serie
          </Link>
        </div>
        <h1 className="text-4xl font-semibold">Movies</h1>
        <div className="container">
          <div className="row">
            {copyMovies &&
              copyMovies.map((movie) => {
                return (
                  <AdminMovieCard
                    key={movie._id}
                    movieId={movie._id}
                    movieCover={movie.movieCover}
                    title={movie.title}
                    imdbScore={movie.imdbScore}
                  />
                );
              })}
          </div>
          <h1 className="text-4xl font-semibold">Series</h1>
          ...
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
