import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

export default class Navbar extends Component {
  /**
   * Renders the navbar on the page. Uses flexboxes to display information and links.
   */
  render() {
    return (
      <div>
        <Link to="/">
          <img src="./images/logo-v3-white-whitepopcorn.png" alt="YaMovie" id="main-logo" />
        </Link>
        <ul id="nav-bar-links">
          <li>
            <Link to="/browsepage">Browse</Link>
          </li>
          <li>
            <Link to="/questionform">Find YaMovie</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    );
  }
}
