import React, { useEffect, useState } from "react";
import {
  IoIosArrowForward,
  IoIosArrowDropleft,
  IoIosArrowDropright,
} from "react-icons/io";
import { RxTriangleRight } from "react-icons/rx";
import { FaStar, FaRegBookmark } from "react-icons/fa";
import { getData } from "../../api/movies";

const Home = () => {
  const [topRated, setTopRated] = useState(null);
  const [popularShows, setPopularShows] = useState(null);
  const [nowPlayingShows, setNowPlayingShows] = useState(null);
  const [upComing, setUpComing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState({
    popular: { start: 0, end: 5 },
    topRated: { start: 0, end: 5 },
    nowPlaying: { start: 0, end: 5 },
    upComing: { start: 0, end: 5 },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularShowsData = await getData(
          `${process.env.REACT_APP_MOVIE_HOST}/movie/popular`
        );
        const nowPlayingShowsData = await getData(
          `${process.env.REACT_APP_MOVIE_HOST}/movie/now_playing`
        );
        const topRatedData = await getData(
          `${process.env.REACT_APP_MOVIE_HOST}/movie/top_rated`
        );
        const upComingData = await getData(
          `${process.env.REACT_APP_MOVIE_HOST}/movie/upcoming`
        );
        setPopularShows(popularShowsData);
        setNowPlayingShows(nowPlayingShowsData);
        setTopRated(topRatedData);
        setUpComing(upComingData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const renderShows = (data, type) => {
    const { start, end } = showMore[type];
    const displayData = data.results.slice(start, end);
    return (
      <div className="flex flex-wrap gap-10">
        {displayData.map((items) => (
          <div
            key={items.id}
            className="relative rounded-lg flex-1 min-w-[300px] group"
          >
            <img
              src={`${process.env.REACT_APP_MOVIE_IMG_URL}/${items.poster_path}`}
              alt={items.title}
              className="w-[80%] h-auto object-cover rounded-md"
            />
            <div className="absolute inset-0 w-[80%] bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-between p-4">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center justify-center absolute top-2 left-5 gap-2">
                  <FaStar className="text-yellow-500" />
                  {items.vote_average}
                </div>
                <FaRegBookmark className="absolute right-3 cursor-pointer text-2xl" />
              </div>
              <div className="flex flex-col items-center absolute bottom-4 gap-2">
                <p className="text-white text-center text-lg">{items.title}</p>
                <p className="text-white text-center text-lg">
                  {items.release_date}
                </p>
                <button className="w-[100px] flex flex-row items-center rounded-[10px] bg-red-600 p-2">
                  <RxTriangleRight className="text-2xl" /> Trailer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleArrowClick = (type, direction) => {
    setShowMore((prevState) => {
      const { start, end } = prevState[type];
      const maxItems =
        type === "popular"
          ? popularShows.results.length
          : type === "topRated"
          ? topRated.results.length
          : type === "nowPlaying"
          ? nowPlayingShows.results.length
          : upComing.results.length;
      if (direction === "right" && end < maxItems) {
        return {
          ...prevState,
          [type]: {
            start: start + 1,
            end: end + 1,
          },
        };
      } else if (direction === "left" && start > 0) {
        return {
          ...prevState,
          [type]: {
            start: start - 1,
            end: end - 1,
          },
        };
      }
      return prevState;
    });
  };

  return (
    <div className="bg-zinc-900 flex flex-row flex-wrap gap-2  text-white p-8 min-h-screen">
      <section className="mb-12 relative flex flex-col justify-center gap-0">
        <button
          className="absolute top-1/2 left-0 z-10 text-5xl"
          onClick={() => handleArrowClick("popular", "left")}
        >
          <IoIosArrowDropleft />
        </button>
        <h2 className="text-2xl mb-4 flex flex-row items-center">
          Popular Shows <IoIosArrowForward />
        </h2>
        {popularShows && renderShows(popularShows, "popular")}
        <button
          className="absolute top-1/2 z-10 text-5xl right-0"
          onClick={() => handleArrowClick("popular", "right")}
        >
          <IoIosArrowDropright />
        </button>
      </section>

      <section className="mb-12 relative">
        <button
          className="absolute top-1/2 left-0 z-10 text-5xl"
          onClick={() => handleArrowClick("topRated", "left")}
        >
          <IoIosArrowDropleft />
        </button>
        <h2 className="text-2xl mb-4 flex flex-row items-center">
          Top Rated <IoIosArrowForward />
        </h2>
        {topRated && renderShows(topRated, "topRated")}
        <button
          className="absolute top-1/2 z-10 text-5xl right-0"
          onClick={() => handleArrowClick("topRated", "right")}
        >
          <IoIosArrowDropright />
        </button>
      </section>

      <section className="mb-12 relative">
        <button
          className="absolute top-1/2 left-0 z-10 text-5xl"
          onClick={() => handleArrowClick("nowPlaying", "left")}
        >
          <IoIosArrowDropleft />
        </button>
        <h2 className="text-2xl mb-4 flex flex-row items-center">
          Now Playing <IoIosArrowForward />
        </h2>
        {nowPlayingShows && renderShows(nowPlayingShows, "nowPlaying")}
        <button
          className="absolute top-1/2 z-10 text-5xl right-0"
          onClick={() => handleArrowClick("nowPlaying", "right")}
        >
          <IoIosArrowDropright />
        </button>
      </section>

      <section className="mb-12 relative">
        <button
          className="absolute top-1/2 left-0 z-10 text-5xl"
          onClick={() => handleArrowClick("upComing", "left")}
        >
          <IoIosArrowDropleft />
        </button>
        <h2 className="text-2xl mb-4 flex flex-row items-center">
          Up Coming <IoIosArrowForward />
        </h2>
        {upComing && renderShows(upComing, "upComing")}
        <button
          className="absolute top-1/2 z-10 text-5xl right-0"
          onClick={() => handleArrowClick("upComing", "right")}
        >
          <IoIosArrowDropright />
        </button>
      </section>
    </div>
  );
};

export default Home;
