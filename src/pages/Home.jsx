import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold mb-4 animate-bounce">
          Welcome to Our App
        </h1>
        <Link
          to="/input"
          className="px-8 py-3 bg-yellow-500 text-black rounded-full hover:bg-yellow-600 transition duration-200 shadow-lg transform hover:scale-105"
        >
          Analyze your assets!
        </Link>
      </header>
    </div>
  );
};

export default Home;
