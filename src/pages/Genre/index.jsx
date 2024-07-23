import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getData } from "../../api/movies";
import { FaStar, FaRegBookmark } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, addCart } from "../../provider/store/cartSlice";
import Loader from "../../components/Loader";
import { items as genreItems } from "../../components/Header"; // Import genre items

const Genre = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genreName, setGenreName] = useState(" ");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationLoading, setPaginationLoading] = useState(false);

  const cartItems = useSelector(getCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getData(
        `${process.env.REACT_APP_MOVIE_HOST}/discover/movie?with_genres=${id}&page=${currentPage}`
      );
      setMovies(response.results);
      setTotalPages(response.total_pages);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
      setPaginationLoading(false);
    }
  }, [id, currentPage]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    const genre = genreItems.find((item) => item.id === id);
    if (genre) setGenreName(genre.name);
  }, [id]);

  const handlePageChange = async (direction) => {
    if (
      (direction === "next" && currentPage < totalPages) ||
      (direction === "prev" && currentPage > 1)
    ) {
      setPaginationLoading(true);
      const newPage = direction === "next" ? currentPage + 1 : currentPage - 1;
      setCurrentPage(newPage);
    }
  };

  const isInCart = (item) =>
    cartItems.find((cartItem) => cartItem.id === item.id);

  const handleToggleCart = (item) => {
    if (isInCart(item)) {
      navigate("/favorit");
    } else {
      dispatch(addCart(item));
    }
  };

  if (loading) return <div>{<Loader />}</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-zinc-900 text-white p-8 min-h-screen">
      <h2 className="text-2xl mb-4 flex items-end">
        {genreName || "Loading..."} <IoIosArrowForward />
      </h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="max-w-[320px] relative rounded-2xl group"
          >
            <img
              src={`${process.env.REACT_APP_MOVIE_IMG_URL}/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto object-cover rounded-xl"
            />
            <div className="absolute rounded-xl inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-between p-4">
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  {movie.vote_average.toFixed(1)}
                </div>
                <button onClick={() => handleToggleCart(movie)}>
                  <FaRegBookmark
                    className={`cursor-pointer text-2xl ${
                      isInCart(movie) ? "text-yellow-500 " : "text-white"
                    }`}
                  />
                </button>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-white text-center text-lg">{movie.title}</p>
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

      <div className="pagination mt-8 flex items-center justify-center text-white mx-8">
        <button
          className={`page py-5 px-8 cursor-pointer ${
            currentPage === 1 ? "text-gray-500 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1 || paginationLoading}
        >
          Back
        </button>

        <span className="page py-3 px-5 rounded-[50%] border-4 border-yellow-500 text-xl font-semibold">
          {currentPage}
        </span>

        <button
          className={`page py-5 px-8 cursor-pointer ${
            currentPage === totalPages ? "text-gray-500 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages || paginationLoading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Genre;
