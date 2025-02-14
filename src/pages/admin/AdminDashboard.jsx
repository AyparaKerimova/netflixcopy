import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/api";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [copyMovies, setCopyMovies] = useState([]);

  const [series, setSeries] = useState([]);
  const [copySeries, setCopySeries] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
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

    async function fetchSeries() {
      try {
        const token = localStorage.getItem("token");
        const resp = await axios.get(BASE_URL + "/series", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSeries(resp.data.data);
        setCopySeries(resp.data.data);
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    }
    fetchMovies();
    fetchSeries();
  }, []);
  async function handleDeleteMovie(id) {
    const token = localStorage.getItem("token");
  
    if (!token) {
      Swal.fire({
        title: "Error",
        text: "Unauthorized! Please log in again.",
        icon: "error"
      });
      return;
    }
  
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
  
    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    });
  
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`${BASE_URL}/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCopyMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
        console.log("Delete response:", response);
  
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your movie has been deleted.",
          icon: "success"
        });
      } catch (error) {
        console.error("Error deleting movie:", error.response);
  
        let errorMessage = "Failed to delete the movie.";
        if (error.response?.status === 403) {
          errorMessage = "You don't have permission to delete this movie.";
        }
  
        swalWithBootstrapButtons.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error"
        });
      }
    } else {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your movie is safe.",
        icon: "error"
      });
    }
  }
  async function handleDeleteSerie(id){
    const token = localStorage.getItem("token");
  
    if (!token) {
      Swal.fire({
        title: "Error",
        text: "Unauthorized! Please log in again.",
        icon: "error"
      });
      return;
    }
  
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
  
    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    });
  
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`${BASE_URL}/series/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCopySeries((prevSeries) => prevSeries.filter((serie) => serie._id !== id));
        console.log("Delete response:", response);
  
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your movie has been deleted.",
          icon: "success"
        });
      } catch (error) {
        console.error("Error deleting movie:", error.response);
  
        let errorMessage = "Failed to delete the movie.";
        if (error.response?.status === 403) {
          errorMessage = "You don't have permission to delete this movie.";
        }
  
        swalWithBootstrapButtons.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error"
        });
      }
    } else {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your movie is safe.",
        icon: "error"
      });
    }
  }  
  
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
        <div className="bg-white p-8 overflow-auto mt-16">
        <h1 className="text-4xl font-semibold mb-2">Movies</h1>
          <div className="relative overflow-auto">
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full bg-white border mb-20">
                <thead>
                  <tr className="bg-black text-center text-xs md:text-sm font-thin text-white">
                    <th className="p-0">
                      <span className="block py-2 px-3 border-r border-gray-300">
                        ID
                      </span>
                    </th>
                    <th className="p-0">
                      <span className="block py-2 px-3 border-r border-gray-300">
                        Movie title
                      </span>
                    </th>
                    <th className="p-0">
                      <span className="block py-2 px-3 border-r border-gray-300">
                        IMDB
                      </span>
                    </th>
                    <th className="p-0">
                      <span className="block py-2 px-3 border-r border-gray-300">
                        Movie cover
                      </span>
                    </th>
                    <th className="p-4 text-xs md:text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {copyMovies &&
                    copyMovies.map((movie) => {
                      return (
                        <tr
                          key={movie._id}
                          className="border-b text-xs md:text-sm text-center text-gray-800"
                        >
                          <td className="p-2 md:p-4">{movie._id.slice(-3)}</td>
                          <td className="p-2 md:p-4">{movie.title}</td>
                          <td className="p-2 md:p-4">{movie.imdbScore}</td>
                          <td className="p-2 md:p-4">
                            <img width={100} src={movie.movieCover} />
                          </td>
                          <td className="relative p-2 md:p-4 flex justify-center space-x-2">
                            <Link to={`/admin/movie-details/${movie._id}`}>
                              <i className="fa-solid fa-info text-black text-2xl"></i>
                            </Link>
                            <button onClick={()=>handleDeleteMovie(movie._id)}>
                              <i className="fa-solid fa-trash text-red-600 text-2xl ml-2"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 overflow-auto ">
        <h1 className="text-4xl font-semibold mb-2">Series</h1>
          <div className="relative overflow-auto">
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full bg-white border mb-20">
                <thead>
                  <tr className="bg-black text-center text-xs md:text-sm font-thin text-white">
                    <th className="p-0">
                      <span className="block py-2 px-3 border-r border-gray-300">
                        ID
                      </span>
                    </th>
                    <th className="p-0">
                      <span className="block py-2 px-3 border-r border-gray-300">
                        Serie title
                      </span>
                    </th>
                    <th className="p-0">
                      <span className="block py-2 px-3 border-r border-gray-300">
                        IMDB
                      </span>
                    </th>
                    <th className="p-0">
                      <span className="block py-2 px-3 border-r border-gray-300">
                        Serie cover
                      </span>
                    </th>
                    <th className="p-4 text-xs md:text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {copySeries &&
                    copySeries.map((serie) => {
                      return (
                        <tr
                          key={serie._id}
                          className="border-b text-xs md:text-sm text-center text-gray-800"
                        >
                          <td className="p-2 md:p-4">{serie._id.slice(-3)}</td>
                          <td className="p-2 md:p-4">{serie.title}</td>
                          <td className="p-2 md:p-4">{serie.imdbScore}</td>
                          <td className="p-2 md:p-4">
                            <img width={100} src={serie.serieCover} />
                          </td>
                          <td className="relative p-2 md:p-4 flex justify-center space-x-2">
                            <Link to={`/admin/serie-details/${serie._id}`}>
                              <i className="fa-solid fa-info text-black text-2xl"></i>
                            </Link>
                            <button onClick={()=>handleDeleteSerie(serie._id)}>
                              <i className="fa-solid fa-trash text-red-600 text-2xl ml-2"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
