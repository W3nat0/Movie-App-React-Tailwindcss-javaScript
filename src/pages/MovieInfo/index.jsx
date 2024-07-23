import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../api/movies";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import VideoShow from "../../components/VideoShow";
import Loader from "../../components/Loader";
import Similars from "../../components/Similars";
import { IoClose } from "react-icons/io5";

const MovieInfo = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const itemsPerPage = 4;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await getData(
          `${process.env.REACT_APP_MOVIE_HOST}/movie/${id}`
        );
        setMovie(movieData);

        const castData = await getData(
          `${process.env.REACT_APP_MOVIE_HOST}/movie/${id}/credits`
        );
        setActors(castData.cast);

        const videosData = await getData(
          `${process.env.REACT_APP_MOVIE_HOST}/movie/${id}/videos`
        );
        const youtubeVideos = videosData.results.filter(
          (video) => video.site === "YouTube"
        );
        setVideos(youtubeVideos);
        setSelectedVideo(youtubeVideos.length > 0 ? youtubeVideos[1].key : "");

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (isVideoVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVideoVisible]);

  const handleNavigation = (direction) => {
    if (direction === "next") {
      setStartIndex((prevIndex) =>
        Math.min(prevIndex + itemsPerPage, actors.length - itemsPerPage)
      );
    } else if (direction === "prev") {
      setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
    }
  };

  const toggleVideoVisibility = () => {
    setIsVideoVisible(!isVideoVisible);
  };

  if (loading) return <div>{<Loader />}</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const displayedActors = actors.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-zinc-900 text-white p-8 min-h-screen">
      <div className="container mx-auto">
        {/* Movie Details */}
        <div className="flex flex-col lg:flex-row gap-14">
          <img
            src={`${process.env.REACT_APP_MOVIE_IMG_URL}/${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-[50%] lg:w-1/3 rounded-lg"
          />
          <div className="flex flex-col gap-10 lg:w-3/5">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="text-lg">{movie.overview}</p>
            <p className="text-lg">
              <span className="font-bold">Release Date:</span>{" "}
              {movie.release_date}
            </p>
            <p className="text-lg">
              <span className="font-bold">Rating:</span>{" "}
              {movie.vote_average.toFixed(1)}
            </p>

            {/* Video Player Toggle Button */}
            <button
              onClick={toggleVideoVisibility}
              className="bg-red-600 py-3 px-6 rounded-md"
              disabled={videos.length === 0} // Disable if no videos
            >
              {videos.length > 0
                ? isVideoVisible
                  ? "Hide Trailer"
                  : "Watch Trailer"
                : "No Trailer Available"}
            </button>

            {/* Video Player */}
            <div className="z-[999] relative">
              {isVideoVisible && videos.length > 0 && (
                <div className="fixed inset-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
                  <div className="w-[80%] h-[80%]">
                    <button
                      onClick={toggleVideoVisibility}
                      className="absolute top-0 right-0 z-20 text-white text-5xl p-4"
                    >
                      <IoClose />
                    </button>
                    <VideoShow selectedVideo={selectedVideo} />
                  </div>
                </div>
              )}
              {isVideoVisible && videos.length === 0 && (
                <div className="fixed inset-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center text-white text-xl">
                  No Trailer Available
                </div>
              )}
            </div>

            {/* Actor Information */}
            <div className="mt-12">
              <div className="flex items-center relative justify-between">
                <button
                  onClick={() => handleNavigation("prev")}
                  className="text-2xl p-2 cursor-pointer absolute top-10 left-0 rounded-full bg-gray-700 text-white hover:bg-gray-600"
                  disabled={startIndex === 0}
                >
                  <IoIosArrowDropleft />
                </button>
                <button
                  onClick={() => handleNavigation("next")}
                  className="text-2xl p-2 cursor-pointer absolute top-10 right-0 rounded-full bg-gray-700 text-white hover:bg-gray-600"
                  disabled={startIndex + itemsPerPage >= actors.length}
                >
                  <IoIosArrowDropright />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {displayedActors.map((actor) => (
                  <div key={actor.id} className="flex flex-col items-center">
                    <img
                      src={`${process.env.REACT_APP_MOVIE_IMG_URL}/${actor.profile_path}`}
                      alt={actor.name}
                      className="w-24 h-24 rounded-full object-cover mb-2"
                    />
                    <p className="text-center text-lg font-semibold">
                      {actor.name}
                    </p>
                    <p className="text-center">{actor.character}</p>
                  </div>
                ))}
              </div>
              {/* Similar Movies Section */}
              <div>
                <Similars />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
