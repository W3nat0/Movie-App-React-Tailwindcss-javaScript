import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// api
import { fetchMovies } from "../../api/searchMovie";
// components
import Loader from "../Loader";
// icons
import { FaStar, FaRegBookmark } from "react-icons/fa";
// redux
import { useDispatch, useSelector } from "react-redux";
import { addCart, getCartItems } from "../../provider/store/cartSlice";

const SearchResults = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const cartItems = useSelector(getCartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isInCart = (item) =>
    cartItems.find((cartItem) => cartItem.id === item.id);

  const handleToggleCart = (item) => {
    if (isInCart(item)) {
      navigate("/favorit");
    } else {
      dispatch(addCart(item));
    }
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const results = await fetchMovies(query);
        setMovies(results);
      } catch (error) {
        console.error("Failed to fetch search results", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="bg-zinc-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">
        The movie name "{query}" is search․
      </h1>
      {loading ? (
        <Loader />
      ) : movies.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-8">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative rounded-2xl flex max-w-[320px] group"
            >
              {movie.poster_path ? (
                <img
                  src={`${process.env.REACT_APP_MOVIE_IMG_URL}/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto object-cover rounded-xl"
                />
              ) : (
                <div className="w-full h-auto bg-gray-700 rounded-xl flex items-center justify-center">
                  <p>No Image</p>
                </div>
              )}
              <div className="absolute rounded-xl inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-between p-4">
                <div className="flex justify-between w-full">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    {movie.vote_average.toFixed(1)}
                  </div>
                  <button onClick={() => handleToggleCart(movie)}>
                    <FaRegBookmark
                      className={`cursor-pointer text-2xl ${
                        isInCart(movie) ? "text-yellow-500" : "text-white"
                      }`}
                    />
                  </button>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-white text-center text-lg">
                    {movie.title}
                  </p>
                  <p className="text-white text-center text-lg">
                    {movie.release_date}
                  </p>
                  <button
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    className="flex items-center rounded-lg bg-red-600 p-2"
                  >
                    More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No movies found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchResults;
