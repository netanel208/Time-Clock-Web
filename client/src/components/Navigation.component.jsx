import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Navigation = () => {
  return (
    <div className="wrapper-navigation">
      <Link to="/home" className="navigation-link">
        Home
      </Link>

      <Link to="/profile" className="navigation-link">
        Profile
      </Link>

      <Link to="/netanel" className="navigation-link">
        About us
      </Link>
    </div>
  );
};

export default Navigation;
