import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Player, ControlBar, BigPlayButton } from "video-react";
import { BASE_URL } from "../../constants/api";

const ClientMoviePlayer = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const playerRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);

  const handleForward = () => {
    if (playerRef.current) {
      playerRef.current.seek(
        playerRef.current.getState().player.currentTime + 10
      );
    }
  };

  const handleRewind = () => {
    if (playerRef.current) {
      playerRef.current.seek(
        playerRef.current.getState().player.currentTime - 10
      );
    }
  };

  const handleFullScreen = () => {
    if (playerRef.current) {
      playerRef.current.toggleFullscreen();
    }
  };
  const changeSpeed = (e) => {
    const speed = parseFloat(e.target.value);
    if (playerRef.current) {
      playerRef.current.playbackRate = speed;
      setPlaybackRate(speed);
    }
  };
  useEffect(() => {
    async function fetchMovie() {
      try {
        const resp = await axios.get(`${BASE_URL}/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMovie(resp.data.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }
    fetchMovie();
  }, [id]);

  return (
    <>
      <div className="flex flex-col items-center w-full h-screen bg-black relative">
      <Link className="absolute top-4 left-6" to={`/client/movie-details/${id}`}><i className="fa-solid fa-chevron-left text-2xl text-white"></i></Link>
        <div className="w-[80%] h-[80%] relative">
          <Player ref={playerRef} autoPlay fluid={true} src={movie.movieVideo}>
            <BigPlayButton position="center" />
            <ControlBar autoHide={false} className="custom-class" />
          </Player>

          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={handleRewind}
              className="px-4 py-2 bg-gray-700 text-white rounded"
            >
              <i className="fa-solid fa-backward"></i> 10s
            </button>
            <button
              onClick={handleFullScreen}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Fullscreen
            </button>
            <button
              onClick={handleForward}
              className="px-4 py-2 bg-gray-700 text-white rounded"
            >
              10s <i className="fa-solid fa-forward"></i>
            </button>
            <div className="mt-4">
          <label className="text-white mr-2">Speed:</label>
          <select
            value={playbackRate}
            onChange={changeSpeed}
            className="px-4 py-2 bg-gray-800 text-white rounded"
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x (Normal)</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientMoviePlayer;
