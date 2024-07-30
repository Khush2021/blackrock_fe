import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <span>
        Go to input
        <Link to="/input">Input Page</Link>
      </span>
    </div>
  );
};

export default Home;
