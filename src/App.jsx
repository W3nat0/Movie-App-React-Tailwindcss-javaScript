import React from "react";
import { Routes, Route } from "react-router-dom";
import Genre from "./pages/Genre";
import Home from "./pages/Home";
import MovieInfo from "./pages/MovieInfo";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";
import Favorit from "./pages/Favorit";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/genre/:id" element={<Genre />} />
      <Route path="/movie/:id" element={<MovieInfo />} />
      <Route path="/favorit" element={<Favorit />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
