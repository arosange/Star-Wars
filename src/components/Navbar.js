import React from "react";
import SearchBar from "./SearchBar";
import "./Navbar.css";
import logo from "../assets/images/homeBanner/logo.png";
import { Link } from "react-router-dom";


const NavBar = ({ setSearchResults }) => {
  return (
    <nav className="navbar">
       <Link to= "/"><img src={logo} alt="logo" /></Link>
      <SearchBar setSearchResults={setSearchResults} />
    </nav>
  );
};

export default NavBar;
