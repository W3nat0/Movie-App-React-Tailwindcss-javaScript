import React from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import {
  getFavoriteItems,
  removeFavorite,
  clearFavorite,
} from "../../provider/store/favoriteSlice";
// icons
import { FaStar, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Favorit = () => {
  const favoriteItems = useSelector(getFavoriteItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (item) => {
    dispatch(removeFavorite(item));
  };

  const handleClearAll = () => {
    dispatch(clearFavorite());
  };

  return (
    <div className="bg-zinc-900 text-white p-8 min-h-screen">
      {favoriteItems.length === 0 ? (
        <div className="text-center text-4xl text-white">
          There are no favorite films yet.
        </div>
      ) : (
        <div>
          <div className="text-right mb-4">
            <button
              onClick={handleClearAll}
              className="bg-red-600 px-4 py-2 rounded-lg text-white"
            >
              Delete All Favorites
            </button>
          </div>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {favoriteItems.map((item) => (
              <div
                key={item.id}
                className="max-w-[320px] relative rounded-2xl group"
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
                    <button onClick={() => handleRemove(item)}>
                      <FaRegBookmark className="text-2xl text-red-500 cursor-pointer" />
                    </button>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-white text-center text-lg">
                      {item.title}
                    </p>
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
        </div>
      )}
    </div>
  );
};

export default Favorit;
