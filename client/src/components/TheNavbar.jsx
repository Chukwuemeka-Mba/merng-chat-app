import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

function TheNavbar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  // const path = pathname === "/" ? "home" : pathname.substr(1);
  // const [activeItem, setActiveItem] = useState(path);
  return (
    <div>
      {user ? (
        <NavContainer>
          <Link to="/">{user.username}</Link>
          <div className="links">
            <Link onClick={logout}>Logout</Link>
          </div>
        </NavContainer>
      ) : (
        <NavContainer>
          <Link to="/">Home</Link>
          <div className="links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
          {console.log(user)}
        </NavContainer>
      )}
    </div>
  );
}

export default TheNavbar;
const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
  .links {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
  a {
    cursor: pointer;
    text-decoration: none;
    color: black;
  }
`;
