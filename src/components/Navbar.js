import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/navbar.css';

/**
 * JSX used to render the navbar on the page. Uses flexboxes to display information and links.
 * @returns JSX to create HTML navbar
 */
const Navbar = () => (
  <div>
    <NavLink to="/">
      <img
        src={`${process.env.PUBLIC_URL}/images/logo-v3-white-whitepopcorn.png`}
        alt="YaMovie"
        id="main-logo"
      />
    </NavLink>
    <ul id="nav-bar-links">
      <li>
        <NavLink to="/browse">Browse</NavLink>
      </li>
      <li>
        <NavLink to="/movieform">Find YaMovie</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
    </ul>
  </div>
);

export default Navbar;
