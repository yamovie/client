import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/navbar.css';

export default class Navbar extends Component {
  /**
   * Renders the navbar on the page. Uses flexboxes to display information and links.
   */
  render() {
    return (
      <div>
        <NavLink to="/">
          <img
            src="./images/logo-v3-white-whitepopcorn.png"
            alt="YaMovie"
            id="main-logo"
          />
        </NavLink>
        <ul id="nav-bar-links">
          <li>
            <NavLink to="/browsepage">Browse</NavLink>
          </li>
          <li>
            <NavLink to="/questionform">Find YaMovie</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
