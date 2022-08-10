import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentToken } from "../../features/auth/authSlice";

import Logout from "../Logout/Logout";
import logo from "../../assets/images/logo.jpg";
import "./Navbar.css";

const Navbar = () => {
  const currentToken = useSelector(selectCurrentToken);

  const content = (
    <nav>
      <img src={logo} alt="logo" />
      <ul>
        <li>Inicio</li>
        <li>Parafernalia</li>
        <li>Cultivo</li>
        <li>Accesorios</li>
        {!currentToken && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {currentToken && <Logout />}
      </ul>
    </nav>
  );
  return <div>{content}</div>;
};

export default Navbar;
