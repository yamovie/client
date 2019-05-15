import React from 'react';
import PropTypes from 'prop-types';
import { div } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { FontAwesomeIcon } from '../utils/fontAwesome';
import '../css/navbar-toast/BurgerMenu.css';
import '../css/navbar-toast/Navbar.css';

/**
 * JSX used to render the navbar on the page. Uses flexboxes to display information and links.
 * @returns JSX to create HTML navbar
 */
class FakeNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false
    };
  }

  render() {
    const { menuOpen } = this.state;
    const { user } = this.props;
    return (
      <div className="topnav">
        <div className="logo-container">
          <div>
            <img
              src="/images/yamovie/logo-v3-white-whitepopcorn.png"
              alt="YaMovie"
              id="main-logo"
            />
          </div>
        </div>
        <div className="mobile-nav">
          <Menu right isOpen={menuOpen}>
            <div>
              <FontAwesomeIcon icon="home" /> Home
            </div>
            <div>
              <FontAwesomeIcon icon="search" /> Find YaMovie
            </div>
            <div>
              <FontAwesomeIcon icon="columns" /> Browse
            </div>
            <div>
              <FontAwesomeIcon icon="address-card" /> About
            </div>
            {!user ? (
              <div className="bm-div">
                <div className="bm-item">
                  <FontAwesomeIcon icon="sign-in-alt" /> Log In
                </div>
                <div className="bm-item">
                  <FontAwesomeIcon icon="user-plus" /> Sign Up
                </div>
              </div>
            ) : (
              <div className="bm-div">
                <div className="bm-item">
                  <FontAwesomeIcon icon="user" /> Account
                </div>
                <div className="bm-item">
                  <FontAwesomeIcon icon="sign-in-alt" /> Log Out
                </div>
              </div>
            )}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://forms.gle/xJoQ54DaX4omm74Z7"
            >
              <FontAwesomeIcon icon="comments" /> Feedback
            </a>
            <a
              href="mailto:yamovie.tp@gmail.com?Subject=YaMovie%20Contact"
              target="_top"
            >
              <FontAwesomeIcon icon="envelope" /> Send Mail
            </a>
          </Menu>
        </div>
        <div className="desktop-nav">
          <div className="nav-item">Find YaMovie</div>
          <div className="nav-item">Browse</div>
          <div className="nav-item">About</div>
          {!user ? (
            <>
              <div className="nav-item">Sign Up</div>
              <div className="nav-item">Log In</div>
            </>
          ) : (
            <>
              <div className="nav-item">Account</div>
              <div to="/" className="nav-item">
                Log Out
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default FakeNavbar;

FakeNavbar.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    fullName: PropTypes.string
  })
};

FakeNavbar.defaultProps = {
  user: null
};
