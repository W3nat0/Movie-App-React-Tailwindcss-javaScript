import React from "react";
import { Routes, Route } from "react-router-dom";
import Genre from "./components/Genre";
import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/genre/:id" element={<Genre />} />
    </Routes>
  );
};

export default App;
