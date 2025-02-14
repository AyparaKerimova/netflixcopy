import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Play, ChevronLeft, VolumeX, Volume2 } from "lucide-react";
import { BASE_URL } from "../../constants/api";

const AdminMovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({ title: "", movieTrailer: "", description: "", cast: [], genre: [] });
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);

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

  useEffect(() => {
    if (videoRef.current && isVideoReady) {
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay failed:", err);
      });
    }
  }, [isVideoReady]);

  const handleVideoLoaded = () => {
    setIsVideoReady(true);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Link 
        to="/admin/dashboard" 
        className="fixed top-6 left-6 z-20 text-white hover:text-gray-300 transition-colors"
      >
        <ChevronLeft className="w-8 h-8" />
      </Link>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-xl">
            {movie.movieTrailer && (
              <>
                <video
                  ref={videoRef}
                  key={movie.movieTrailer}
                  onLoadedData={handleVideoLoaded}
                  autoPlay
                  loop
                  playsInline
                  muted={isMuted}
                  className="w-full h-full object-cover"
                >
                  <source src={movie.movieTrailer} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </>
            )}

            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                {movie.title}
              </h1>
              <div className="flex items-center gap-4">
                <Link
                  to={`/admin/movie-player/${id}`}
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-black px-6 py-3 rounded-md font-medium transition-colors"
                >
                  <Play className="w-5 h-5" />
                  <span>Play</span>
                </Link>
                <button
                  onClick={toggleMute}
                  className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-8 text-white">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="text-gray-300 leading-relaxed">
                {movie.description}
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-400 text-lg mb-2">Cast</h3>
                <p className="text-white">
                  {Array.isArray(movie.cast) && movie.cast.join(", ")}
                </p>
              </div>
              <div>
                <h3 className="text-gray-400 text-lg mb-2">Genres</h3>
                <p className="text-white">
                  {Array.isArray(movie.genre) && movie.genre.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMovieDetails;