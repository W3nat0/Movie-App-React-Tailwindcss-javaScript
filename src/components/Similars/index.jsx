import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// api
import { getSimilar } from "../../api/similar";
// icons
import { FaStar, FaRegBookmark } from "react-icons/fa";
// redux
import { addCart, getCartItems } from "../../provider/store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
// components
import Loader from "../Loader";

export default function Similars() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [similars, setSimilars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartItems = useSelector(getCartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        const similarData = await getSimilar(
          `${process.env.REACT_APP_MOVIE_HOST}/movie/${id}/similar`
        );
        setSimilars(similarData.slice(0, 4));
        setLoading(false);
      } catch (err) {
        setError("Failed to load similar movies data.");
        setLoading(false);
      }
    };
    fetchSimilar();
  }, [id]);

  const isInCart = (item) =>
    cartItems.find((cartItem) => cartItem.id === item.id);

  const handleToggleCart = (item) => {
    if (isInCart(item)) {
      navigate("/favorit");
    } else {
      dispatch(addCart(item));
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="mt-12 flex flex-wrap gap-[13.5px]">
      {similars.length > 0 ? (
        similars.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center w-[220px] group"
          >
            {item.poster_path ? (
              <img
                src={`${process.env.REACT_APP_MOVIE_IMG_URL}/${item.poster_path}`}
                alt={item.title}
                className="w-full h-auto object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-[100%] bg-gray-700 rounded-xl flex items-center justify-center">
                <p>No Image</p>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-between p-4 rounded-xl">
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  {item.vote_average.toFixed(1)}
                </div>
                <button onClick={() => handleToggleCart(item)}>
                  <FaRegBookmark
                    className={`text-2xl cursor-pointer ${
                      isInCart(item) ? "text-yellow-500" : "text-white"
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
        ))
      ) : (
        <div>
          <p>No similar movies found.</p>
        </div>
      )}
    </div>
  );
}
