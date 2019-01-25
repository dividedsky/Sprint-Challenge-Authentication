import React from 'react';
import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/jokes">Jokes</NavLink>
    </nav>
  )
}

export default NavBar;
