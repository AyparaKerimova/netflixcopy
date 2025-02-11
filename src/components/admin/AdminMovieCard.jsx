import React from "react";
import { Link } from "react-router-dom";

const AdminMovieCard = ({ title, movieCover, movieId, deleteMovie,imdbScore }) => {
  return (
    <>
      <div className="col-lg-3 col-md-6 col-sm-12 inline-block mr-2">
        <div style={{width:"250px"}} className="border border-red-100 rounded">
          <img
            width={250}
            height={200}
            src={movieCover}
            alt={title}
          />
          <h1 className="text-black font-semibold text-xl text-center">{title}</h1>
          <div className="flex gap-6 mx-auto item-center justify-center">
            <button onClick={deleteMovie}>
              <i className="fa-solid fa-trash text-red-600"></i>
            </button>
            <Link to={`/movie-details/${movieId}`}>
              <i className="fa-solid fa-info text-black"></i>
            </Link>
            <h1 className="font-medium text-gray-400">IMDB/{imdbScore}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMovieCard;
