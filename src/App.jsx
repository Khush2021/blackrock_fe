import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Input from "./pages/Input.jsx";
import Header from "./components/Header.jsx";
import Analyse from "./pages/Analyse.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyse" element={<Analyse />} />
        <Route path="/input" element={<Input />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
