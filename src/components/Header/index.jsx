import React, { useState, useEffect } from "react";
import { FaHome, FaStream, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDataSaverOn } from "react-icons/md";
import { fetchMovies } from "../../api/searchMovie";

export const items = [
  { id: "28", name: "Action", href: "/genre/28" },
  { id: "12", name: "Adventure", href: "/genre/12" },
  { id: "16", name: "Animation", href: "/genre/16" },
  { id: "35", name: "Comedy", href: "/genre/35" },
  { id: "18", name: "Drama", href: "/genre/18" },
  { id: "10751", name: "Family", href: "/genre/10751" },
  { id: "14", name: "Fantasy", href: "/genre/14" },
  { id: "36", name: "History", href: "/genre/36" },
  { id: "27", name: "Horror", href: "/genre/27" },
  { id: "9648", name: "Mystery", href: "/genre/9648" },
  { id: "10749", name: "Romance", href: "/genre/10749" },
  { id: "878", name: "Science Fiction", href: "/genre/878" },
  { id: "53", name: "Thriller", href: "/genre/53" },
  { id: "10752", name: "War", href: "/genre/10752" },
];

const Header = () => {
  const [query, setQuery] = useState("");
  const [matchMovie, setMatchMovie] = useState([]);
  const [showMovie, setShowMovie] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const debounceFetchMovies = setTimeout(() => {
      const getMovies = async () => {
        if (query) {
          const movies = await fetchMovies(query);
          setMatchMovie(movies);
          setShowMovie(true);
        } else {
          setMatchMovie([]);
          setShowMovie(false);
        }
      };
      getMovies();
    }, 200);

    return () => clearTimeout(debounceFetchMovies);
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClick = (movie) => {
    setQuery("");
    setMatchMovie([]);
    setShowMovie(false);
    navigate(`/movie/${movie.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query) {
      navigate(`/search/${query}`);
      setShowMovie(false);
    }
  };

  return (
    <header className="bg-zinc-900 text-white font-lato">
      <div className="container mx-auto px-4 py-4 flex flex-col lg:flex-row justify-between items-center">
        <div className="flex items-center gap-5 mb-4 lg:mb-0 w-full lg:w-auto">
          <img
            src="https://asset.brandfetch.io/idjAvp-xz4/idbJNPrPxh.png"
            alt="Plex"
            className="w-24 md:w-32 lg:w-40"
          />
          <form className="relative flex-grow lg:flex-grow-0">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="bg-zinc-800 text-white w-full lg:w-80 xl:w-96 rounded-full pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <FaSearch className="absolute right-4 top-3 text-gray-400" />
            {showMovie && (
              <ul className="absolute z-10 mt-1 w-full bg-zinc-800 text-white rounded-b-xl rounded-t-md shadow-lg">
                {matchMovie.length > 0 ? (
                  matchMovie.slice(0, 10).map((item) => (
                    <li
                      key={item.id}
                      onClick={() => handleClick(item)}
                      className="hover:bg-zinc-700"
                    >
                      <Link
                        to={`/movie/${item.id}`}
                        className="block px-4 py-2"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">
                    No movies found for "{query}".
                  </li>
                )}
              </ul>
            )}
          </form>
        </div>
        <ul className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-center font-mono mb-4 lg:mb-0 w-full lg:w-auto">
          <li>
            <Link
              to="/"
              className="hover:text-yellow-500 flex text-xl items-center"
            >
              <FaHome className="mr-2" /> Home
            </Link>
          </li>
          <li className="relative group">
            <button className="flex items-center text-xl hover:text-yellow-500">
              <FaStream className="mr-2" /> Films
            </button>
            <ul className="absolute top-6 z-20 mt-2 font-lato bg-zinc-800 text-white rounded-sm shadow-lg hidden group-hover:block">
              {items.map((item) => (
                <li key={item.id} className="hover:bg-zinc-700">
                  <Link to={item.href} className="flex items-start px-8 py-2.5">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link
              to="/favorit"
              className="flex flex-row gap-2 items-center text-xl hover:text-yellow-500"
            >
              <MdOutlineDataSaverOn />
              <span>Favorite Films</span>
            </Link>
          </li>
        </ul>
        <div className="flex justify-center items-center gap-3  w-full lg:w-auto">
          <Link to="/login" className="text-white border-r-2 pr-3">
            Login
          </Link>
          <Link
            to="/sign-in"
            className="text-white bg-yellow-500 py-2 px-4 rounded-full"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
