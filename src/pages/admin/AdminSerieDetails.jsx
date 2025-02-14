import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Play, ChevronLeft, VolumeX, Volume2, ChevronDown, Star } from "lucide-react";
import { BASE_URL } from "../../constants/api";


const AdminSeriesDetails = () => {
  const { id } = useParams();
  const [series, setSeries] = useState({
    title: "",
    description: "",
    year: "",
    genre: [],
    cast: [],
    imdbScore: 0,
    serieCover: "",
    seriesTrailer: "",
    seasons: [],
    totalSeasons: 0,
    totalEpisodes: 0,
    status: "ongoing",
    maturityRating: ""
  });
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [expandedEpisode, setExpandedEpisode] = useState(null);

  useEffect(() => {
    async function fetchSeries() {
      try {
        const resp = await axios.get(`${BASE_URL}/series/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSeries(resp.data.data);
      } catch (error) {
        console.error("Error fetching series details:", error);
      }
    }
    fetchSeries();
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

  const toggleEpisode = (episodeId) => {
    setExpandedEpisode(expandedEpisode === episodeId ? null : episodeId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing':
        return 'bg-green-500';
      case 'completed':
        return 'bg-blue-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
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
            {series.serieTrailer && (
              <>
                <video
                  ref={videoRef}
                  key={series.serieTrailer}
                  onLoadedData={handleVideoLoaded}
                  autoPlay
                  loop
                  playsInline
                  muted={isMuted}
                  className="w-full h-full object-cover"
                >
                  <source src={series.serieTrailer} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              </>
            )}

            <div className="absolute bottom-0 left-0 p-8 w-full">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                  {series.title}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  to={`/admin/serie-player/${id}/1`}
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
              <h2 className="text-2xl font-semibold mb-4">Descriptions</h2>
              <p className="text-gray-300 leading-relaxed">
                {series.description}
              </p>
              <div className="flex items-center gap-2 mt-4">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-yellow-500 font-semibold">{series.imdbScore.toFixed(1)}</span>
                <span className="text-gray-400">IMDb rating</span>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-400 text-lg mb-2">Cast</h3>
                <p className="text-white">
                  {series.cast.join(", ")}
                </p>
              </div>
              <div>
                <h3 className="text-gray-400 text-lg mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {series.genre.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-gray-400 text-lg mb-2">Details</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold">{series.seasonCount}</span>
                    <span className="text-gray-400 text-sm">Seasons</span>
                  </div>
                  <div className="w-px h-8 bg-gray-700" />
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold">{series.serieCount}</span>
                    <span className="text-gray-400 text-sm">Episodes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Episodes</h2>
            </div>
            <div className="space-y-4">
  {Array.isArray(series.serieVideos) && series.serieVideos.map((episode, index) => (
    <Link key={index} to={`/admin/serie-player/${id}/${index}`}>
    <div
      className="bg-zinc-900 rounded-lg overflow-hidden transition-all duration-300"
    >
      <button
        className="w-full text-left p-4 flex items-center justify-between text-white hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="relative group">
            <img
              src={series.serieCover}
              alt={series.title}
              className="w-40 h-24 object-cover rounded"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Play className="w-8 h-8" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">
                {index + 1}.
              </span>
              <h4 className="font-medium">{series.title}</h4>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {series.description}
            </p>
          </div>
        </div>    
      </button>
    </div>
    </Link>
  ))}
</div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSeriesDetails;