import React from "react";
import { FaHome, FaTv, FaStream, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-black text-white">
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
          <ul className="flex flex-row gap-6">
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
              <Link
                to="/on-demand"
                className="hover:text-yellow-500 flex items-center"
              >
                <FaStream className="mr-2" /> On Demand
              </Link>
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

        <div className="w-1/6">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-[15px]">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
