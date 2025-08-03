import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/deals">Deals</Link> {/* ← Same here */}
          </li>
          <li>
            <Link to="/contact">Contact</Link>{" "}
          </li>
          <li>
            <Link to="/cart">Cart ({cartCount})</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
