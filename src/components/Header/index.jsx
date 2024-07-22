import React from "react";
import {
  FaHome,
  FaTv,
  FaStream,
  FaSearch,
  FaRegBookmark,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown";

export const items = [
  { id: 28, name: "Action", href: "/genre/28" },
  { id: 12, name: "Adventure", href: "/genre/12" },
  { id: 16, name: "Animation", href: "/genre/16" },
  { id: 35, name: "Comedy", href: "/genre/35" },
  { id: 18, name: "Drama", href: "/genre/18" },
  { id: 10751, name: "Family", href: "/genre/10751" },
  { id: 14, name: "Fantasy", href: "/genre/14" },
  { id: 36, name: "History", href: "/genre/36" },
  { id: 27, name: "Horror", href: "/genre/27" },
  { id: 9648, name: "Mystery", href: "/genre/9648" },
  { id: 10749, name: "Romance", href: "/genre/10749" },
  { id: 878, name: "Science Fiction", href: "/genre/878" },
  { id: 53, name: "Thriller", href: "/genre/53" },
  { id: 10752, name: "War", href: "/genre/10752" },
];

const Header = () => {
  return (
    <header className="bg-zinc-900 text-white">
      <div className="w-full mx-auto px-4 py-4 flex justify-between items-center">
        <div className="w-full flex items-center flex-row gap-5">
          <img
            src={`https://asset.brandfetch.io/idjAvp-xz4/idbJNPrPxh.png`}
            alt="Plex"
            className="w-[10%]"
          />
          <form className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-zinc-800 text-white min-w-full w-[500px] rounded-full pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <FaSearch className="absolute right-4 top-3 text-gray-400" />
          </form>
          <ul className="flex flex-row gap-6 items-center font-mono">
            <li>
              <Link to="/" className="hover:text-yellow-500 flex items-center">
                <FaHome className="mr-2" /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/live-tv"
                className="hover:text-yellow-500 flex items-center"
              >
                {" "}
                <FaTv className="mr-2" /> Live TV
              </Link>
            </li>
            <li>
              <Dropdown
                title={
                  <span className="flex items-center hover:text-yellow-500 ">
                    <FaStream className="mr-2" /> Menu
                  </span>
                }
                items={items}
              />
            </li>
            <li>
              <Link
                to="/discover"
                className="hover:text-yellow-500 flex items-center"
              >
                Discover
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-1/6 flex flex-row items-center gap-3">
          <Link to="/saved">
            <FaRegBookmark className="text-2xl hover:text-yellow-500" />
          </Link>
          <div className="flex gap-3">
            <button className="text-white border-r-2 p-2.5">Login</button>
            <button className="text-white bg-yellow-500  py-2 px-4 rounded-[15px]">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
