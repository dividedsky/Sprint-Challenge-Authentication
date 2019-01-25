import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;

  h4 {
    color: red;
    font-size: 2rem;
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: white;
  }

  .active {
    color: orange;
    font-weight: bold;
  }
`

const NavBar = () => {
  return (
    <StyledNav>
              <NavLink exact to="/">Home</NavLink>
              <NavLink to="/login">Login</NavLink>
                    <h4> Dad Jokes </h4>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/jokes">Jokes</NavLink>
    </StyledNav>
  )
}

export default NavBar;
