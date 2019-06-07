import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { FontAwesomeIcon } from '../utils/fontAwesome';
import '../css/navbar-toast/BurgerMenu.css';
import '../css/navbar-toast/Navbar.css';
// import { link } from 'fs';

/**
 * JSX used to render the navbar on the page. Uses flexboxes to display information and links.
 * @returns JSX to create HTML navbar
 */
class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
    };
  }

  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu() {
    this.setState({ menuOpen: false });
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu() {
    const { menuOpen } = this.state;
    this.setState({ menuOpen: !menuOpen });
  }

  componentWillMount() {
    this.now = new Date();
  }

  render() {
    const { menuOpen } = this.state;
    const { user, handleLogout } = this.props;

    const prideItemStyle = {
      '--item-color': 'var(--darkgrey)',
      background: 'var(--pride-gradient)',
      fontWeight: '500',
    };

    const links = {
      home: '/',
      recs: '/recommendations',
      browse: '/browse',
      about: '/about',
      login: '/login',
      signup: '/signup',
      account: '/account/dashboard',
    };
    return (
      <div className="topnav" style={this.now.getMonth() === 5 ? prideItemStyle : {}}>
        <div className="logo-container">
          <NavLink to="/">
            <img
              src="/images/yamovie/logo-v3-white-whitepopcorn.png"
              alt="YaMovie"
              id="main-logo"
            />
          </NavLink>
        </div>
        {this.now.getMonth() === 5 && (
          <p
            className="pride-message"
            style={{
              color: 'var(--popcornyellow)',
              fontSize: '0.8em',
              textShadow: '0px 0px 2px var(--darkgrey)',
            }}
          >
            Happy Pride Month!
          </p>
        )}
        <div className="mobile-nav">
          <Menu
            right
            isOpen={menuOpen}
            onStateChange={state => this.handleStateChange(state)}
          >
            <NavLink onClick={() => this.closeMenu()} to={links.home}>
              <FontAwesomeIcon icon="home" /> Home
            </NavLink>
            <NavLink onClick={() => this.closeMenu()} to={links.recs}>
              <FontAwesomeIcon icon="search" /> Find YaMovie
            </NavLink>
            <NavLink onClick={() => this.closeMenu()} to={links.browse}>
              <FontAwesomeIcon icon="columns" /> Browse
            </NavLink>
            <NavLink onClick={() => this.closeMenu()} to={links.about}>
              <FontAwesomeIcon icon="address-card" /> About
            </NavLink>
            {!user ? (
              <div className="bm-div">
                <NavLink
                  className="bm-item"
                  onClick={() => this.closeMenu()}
                  to={links.login}
                >
                  <FontAwesomeIcon icon="sign-in-alt" /> Log In
                </NavLink>
                <NavLink
                  className="bm-item"
                  onClick={() => this.closeMenu()}
                  to={links.signup}
                >
                  <FontAwesomeIcon icon="user-plus" /> Sign Up
                </NavLink>
              </div>
            ) : (
              <div className="bm-div">
                <NavLink
                  className="bm-item"
                  onClick={() => this.closeMenu()}
                  to={links.account}
                >
                  <FontAwesomeIcon icon="user" /> Account
                </NavLink>
                <NavLink
                  className="bm-item"
                  onClick={() => {
                    handleLogout();
                    this.closeMenu();
                  }}
                  to={links.home}
                >
                  <FontAwesomeIcon icon="sign-in-alt" /> Log Out
                </NavLink>
              </div>
            )}
            <a
              onClick={() => this.closeMenu()}
              target="_blank"
              rel="noopener noreferrer"
              href="https://forms.gle/xJoQ54DaX4omm74Z7"
            >
              <FontAwesomeIcon icon="comments" /> Feedback
            </a>
            <a
              href="mailto:yamovie.tp@gmail.com?Subject=YaMovie%20Contact"
              onClick={() => this.closeMenu()}
              target="_top"
            >
              <FontAwesomeIcon icon="envelope" /> Send Mail
            </a>
          </Menu>
        </div>
        <div className="desktop-nav">
          <NavLink to="/recommendations" className="nav-item">
            Find YaMovie
          </NavLink>
          <NavLink to={links.browse} className="nav-item">
            Browse
          </NavLink>
          <NavLink to={links.about} className="nav-item">
            About
          </NavLink>
          {!user ? (
            <>
              <NavLink to={links.signup} className="nav-item">
                Sign Up
              </NavLink>
              <NavLink to={links.login} className="nav-item">
                Log In
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={links.account} className="nav-item">
                Account
              </NavLink>
              <NavLink
                to={links.home}
                onClick={() => handleLogout()}
                className="nav-item"
              >
                Log Out
              </NavLink>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Navbar;

Navbar.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    fullName: PropTypes.string,
  }),
  handleLogout: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  user: null,
};
