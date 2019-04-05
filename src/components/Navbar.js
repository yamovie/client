import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/Navbar.css';

/**
 * JSX used to render the navbar on the page. Uses flexboxes to display information and links.
 * @returns JSX to create HTML navbar
 */
const Navbar = props => (
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
        <NavLink to="/chat">Find YaMovie</NavLink>
      </li>
      <li>
        <NavLink to="/browse">Browse</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      { !props.user ?
        (
          <div>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          </div>
        ) : (
          <div>
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li>
            <NavLink onClick={props.handleLogout} to="/">Logout</NavLink>
          </li>
          </div>
        )
      }
    </ul>

  </div>
);

export default Navbar;

Navbar.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    fullName: PropTypes.string,
  }),
};

Navbar.defaultProps = {
  user: null,
};
