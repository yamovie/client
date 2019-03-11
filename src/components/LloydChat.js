import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/navbar.css';

export default class LloydChat extends Component {
  /**
   * Renders the Lloyd chatbot button on the bottom right corner of the page.
   */
  render() {
    return (
      <div id="lloyd-outline">
        <NavLink to="/questionform">
          <img src="./images/Lloyd.png" alt="Talk to Lloyd!" id="chatbot-btn" />
        </NavLink>
      </div>
    );
  }
}
