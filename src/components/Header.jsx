import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-black text-white top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold">BlackRock</h1>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link
              to="/"
              className="px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-gray-800 rounded-md"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-gray-800 rounded-md"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-gray-800 rounded-md"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
