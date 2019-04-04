import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Navbar.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faUser);

/**
 * JSX used to render the navbar on the page. Uses flexboxes to display information and links.
 * @returns JSX to create HTML navbar
 */
const Navbar = () => (
  <div className="navbar">
    <NavLink to="/">
      <img
        src="/images/logo-v3-white-whitepopcorn.png"
        alt="YaMovie"
        id="main-logo"
      />
    </NavLink>
    <ul id="navbar-links">
      <li>
        <NavLink to="/browse">Browse</NavLink>
      </li>
      <li>
        <NavLink to="/chat">Find YaMovie</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/account">
          <FontAwesomeIcon icon={faUser} />
        </NavLink>
      </li>
    </ul>
  </div>
);

export default Navbar;
