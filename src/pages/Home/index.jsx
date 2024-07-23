import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// icons
import { FaStar, FaRegBookmark } from "react-icons/fa";
import {
  IoIosArrowForward,
  IoIosArrowDropleft,
  IoIosArrowDropright,
} from "react-icons/io";
// api
import { getData } from "../../api/movies";
// redux
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, addCart } from "../../provider/store/cartSlice";
// components
import Loader from "../../components/Loader";

const Home = () => {
  const [topRated, setTopRated] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [nowPlayingShows, setNowPlayingShows] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState({
    popular: { start: 0, end: 5 },
    topRated: { start: 0, end: 5 },
    nowPlaying: { start: 0, end: 5 },
    upComing: { start: 0, end: 5 },
  });

  const cartItems = useSelector(getCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
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

      setPopularShows(popularShowsData.results);
      setNowPlayingShows(nowPlayingShowsData.results);
      setTopRated(topRatedData.results);
      setUpComing(upComingData.results);

      setLoading(false);
    } catch (err) {
      setError("Failed to load data.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const isInCart = (item) =>
    cartItems.find((cartItem) => cartItem.id === item.id);

  const handleToggleCart = (item) => {
    if (isInCart(item)) {
      navigate("/favorit");
    } else {
      dispatch(addCart(item));
    }
  };

  const renderShows = (data, type) => {
    const { start, end } = showMore[type];
    const displayData = data.slice(start, end);
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {displayData.map((item) => (
          <div
            key={item.id}
            className="relative rounded-2xl flex-1 max-w-[320px] group"
          >
            <img
              src={`${process.env.REACT_APP_MOVIE_IMG_URL}/${item.poster_path}`}
              alt={item.title}
              className="w-full h-auto object-cover rounded-xl"
            />
            <div className="absolute rounded-xl inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-between p-4">
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  {item.vote_average.toFixed(1)}
                </div>
                <button onClick={() => handleToggleCart(item)}>
                  <FaRegBookmark
                    className={`cursor-pointer text-2xl ${
                      isInCart(item) ? "text-yellow-500 " : "text-white"
                    }`}
                  />
                </button>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-white text-center text-lg">{item.title}</p>
                <p className="text-white text-center text-lg">
                  {item.release_date}
                </p>
                <button
                  onClick={() => navigate(`/movie/${item.id}`)}
                  className="flex items-center rounded-lg bg-red-600 p-2"
                >
                  More
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
      const newState = { ...prevState };
      const data = {
        popular: popularShows,
        topRated: topRated,
        nowPlaying: nowPlayingShows,
        upComing: upComing,
      }[type];

      const currentState = prevState[type];
      const newStart =
        direction === "right" ? currentState.start + 1 : currentState.start - 1;
      const newEnd =
        direction === "right" ? currentState.end + 1 : currentState.end - 1;

      if (newStart >= 0 && newEnd <= data.length) {
        newState[type] = { start: newStart, end: newEnd };
      }

      return newState;
    });
  };

  if (loading) return <div>{<Loader />}</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-zinc-900 text-white p-8 min-h-screen">
      {[
        { title: "Popular Shows", data: popularShows, type: "popular" },
        { title: "Top Rated Shows", data: topRated, type: "topRated" },
        {
          title: "Now Playing Shows",
          data: nowPlayingShows,
          type: "nowPlaying",
        },
        { title: "Upcoming Shows", data: upComing, type: "upComing" },
      ].map(({ title, data, type }) => (
        <div key={type} className="mb-12">
          <h2 className="text-2xl mb-4 flex items-end">
            {title} <IoIosArrowForward />
          </h2>
          {renderShows(data, type)}
          <div className="flex items-center justify-center gap-4 mt-4 text-5xl">
            <button
              className={`arrow-btn ${
                showMore[type].start === 0
                  ? "text-gray-500 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => handleArrowClick(type, "left")}
              disabled={showMore[type].start === 0}
            >
              <IoIosArrowDropleft />
            </button>
            <button
              className={`arrow-btn ${
                showMore[type].end >= data.length
                  ? "text-gray-500 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => handleArrowClick(type, "right")}
              disabled={showMore[type].end >= data.length}
            >
              <IoIosArrowDropright />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
