import React from "react";
import { Routes, Route } from "react-router-dom";
import Genre from "./components/Genre";
import Home from "./pages/Home";
import MovieInfo from "./pages/MovieInfo";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/genre/:id" element={<Genre />} />
      <Route path="/movie/:id" element={<MovieInfo />} />
    </Routes>
  );
};

export default App;
