import React from "react";
import { FaHome, FaStream, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown";
import { MdOutlineDataSaverOn } from "react-icons/md";

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
      <div className="container mx-auto px-4 py-4 flex flex-col lg:flex-row justify-between items-center">
        <div className="flex items-center gap-5 mb-4 lg:mb-0 w-full lg:w-auto">
          <img
            src={`https://asset.brandfetch.io/idjAvp-xz4/idbJNPrPxh.png`}
            alt="Plex"
            className="w-24 md:w-32 lg:w-40"
          />
          <form className="relative flex-grow lg:flex-grow-0">
            <input
              type="text"
              placeholder="Search"
              className="bg-zinc-800 text-white w-full lg:w-80 xl:w-96 rounded-full pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <FaSearch className="absolute right-4 top-3 text-gray-400" />
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
          <li>
            <Dropdown
              title={
                <span className="flex items-center text-xl hover:text-yellow-500">
                  <FaStream className="mr-2" /> Menu
                </span>
              }
              items={items}
            />
          </li>
          <li>
            <Link
              to="/saved"
              className="flex flex-row gap-2 items-center text-xl hover:text-yellow-500"
            >
              <MdOutlineDataSaverOn />
              <span>Save</span>
            </Link>
          </li>
        </ul>
        <div className="flex justify-center items-center gap-3 w-full lg:w-auto">
          <div className="flex gap-3">
            <button className="text-white border-r-2 pr-2.5">Login</button>
            <button className="text-white bg-yellow-500 py-2 px-4 rounded-full">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
