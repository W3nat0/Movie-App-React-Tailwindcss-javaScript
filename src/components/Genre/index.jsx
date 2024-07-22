import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../api/movies";
import { FaStar, FaRegBookmark } from "react-icons/fa";
import { RxTriangleRight } from "react-icons/rx";
import { items } from "../Header";
import { IoIosArrowForward } from "react-icons/io";

const Genre = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genreName, setGenreName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getData(
          `${process.env.REACT_APP_MOVIE_HOST}/discover/movie?with_genres=${id}&page=${currentPage}`
        );
        setMovies(response.results);
        setTotalPages(response.total_pages);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchMovies();
  }, [id, currentPage]);

  useEffect(() => {
    const genre = items.find((item) => item.id === parseInt(id));
    if (genre) {
      setGenreName(genre.name);
    }
  }, [id]);

  const handlePageChange = async (direction) => {
    if (
      (direction === "next" && currentPage < totalPages) ||
      (direction === "prev" && currentPage > 1)
    ) {
      setLoading(true);
      if (direction === "next") {
        setCurrentPage((prevPage) => prevPage + 1);
      } else if (direction === "prev") {
        setCurrentPage((prevPage) => prevPage - 1);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });

      try {
        const response = await getData(
          `${process.env.REACT_APP_MOVIE_HOST}/discover/movie?with_genres=${id}&page=${currentPage}`
        );
        setMovies(response.results);
        setTotalPages(response.total_pages);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-zinc-900 text-white p-8 min-h-screen">
      <h2 className="text-2xl mb-4 flex items-end">
        {genreName} <IoIosArrowForward />
      </h2>
      <div className="flex flex-wrap gap-5">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative rounded-lg flex-1 min-w-[300px] group"
          >
            <img
              src={`${process.env.REACT_APP_MOVIE_IMG_URL}/${movie.poster_path}`}
              alt={movie.title}
              className="w-[80%] h-auto object-cover rounded-md"
            />
            <div className="absolute inset-0 w-[80%] bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-between p-4">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center justify-center absolute top-2 left-5 gap-2">
                  <FaStar className="text-yellow-500" />
                  {movie.vote_average}
                </div>
                <FaRegBookmark className="absolute right-3 cursor-pointer text-2xl" />
              </div>
              <div className="flex flex-col items-center absolute bottom-4 gap-2">
                <p className="text-white text-center text-lg">{movie.title}</p>
                <p className="text-white text-center text-lg">
                  {movie.release_date}
                </p>
                <button className="w-[100px] flex flex-row items-center rounded-[10px] bg-red-600 p-2">
                  <RxTriangleRight className="text-2xl" /> Trailer
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
          disabled={currentPage === 1}
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
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Genre;
