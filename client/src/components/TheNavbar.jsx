import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
function TheNavbar() {
  return (
    <NavContainer>
      <Link to="/">Home</Link>
      <div className="links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </NavContainer>
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
