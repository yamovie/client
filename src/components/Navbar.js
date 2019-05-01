import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { FontAwesomeIcon } from '../utils/fontAwesome';
import '../css/BurgerMenu.css';
import '../css/Navbar.css';

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

  render() {
    const { menuOpen } = this.state;
    const { user, handleLogout } = this.props;
    return (
      <div className="topnav">
        <div className="logo-container">
          <NavLink to="/">
            <img
              src="/images/logo-v3-white-whitepopcorn.png"
              alt="YaMovie"
              id="main-logo"
            />
          </NavLink>
        </div>
        <div className="mobile-nav">
          <Menu
            right
            isOpen={menuOpen}
            onStateChange={state => this.handleStateChange(state)}
          >
            <NavLink onClick={() => this.closeMenu()} to="/">
              <FontAwesomeIcon icon="home" /> Home
            </NavLink>
            <NavLink onClick={() => this.closeMenu()} to="/recommendations">
              <FontAwesomeIcon icon="search" /> Find YaMovie
            </NavLink>
            <NavLink onClick={() => this.closeMenu()} to="/browse">
              <FontAwesomeIcon icon="columns" /> Browse
            </NavLink>
            <NavLink onClick={() => this.closeMenu()} to="/about">
              <FontAwesomeIcon icon="address-card" /> About
            </NavLink>
            {!user ? (
              <div className="bm-div">
                <NavLink
                  className="bm-item"
                  onClick={() => this.closeMenu()}
                  to="/login"
                >
                  <FontAwesomeIcon icon="sign-in-alt" /> Login
                </NavLink>
                <NavLink
                  className="bm-item"
                  onClick={() => this.closeMenu()}
                  to="/signup"
                >
                  <FontAwesomeIcon icon="user-plus" /> Signup
                </NavLink>
              </div>
            ) : (
              <div className="bm-div">
                <NavLink
                  className="bm-item"
                  onClick={() => this.closeMenu()}
                  to="/account"
                >
                  <FontAwesomeIcon icon="user" /> My Account
                </NavLink>
                <NavLink
                  className="bm-item"
                  onClick={() => {
                    handleLogout();
                    this.closeMenu();
                  }}
                  to="/"
                >
                  <FontAwesomeIcon icon="sign-in-alt" /> Logout
                </NavLink>
              </div>
            )}
            <a onClick={() => this.closeMenu()} target="_blank" rel="noopener noreferrer" href="https://forms.gle/xJoQ54DaX4omm74Z7" ><FontAwesomeIcon icon="comments" /> Feedback</a>
            <a href="mailto:yamovie.tp@gmail.com?Subject=YaMovie%20Contact" onClick={() => this.closeMenu()} target="_top"><FontAwesomeIcon icon="envelope" /> Send Mail</a>
          </Menu>
        </div>
        <div className="desktop-nav">
          <NavLink to="/recommendations" className='nav-item'>Find YaMovie</NavLink>
          <NavLink to="/browse" className='nav-item'>Browse</NavLink>
          <NavLink to="/about" className='nav-item'>About</NavLink>
          {!user ?
            <>
              <NavLink to="/signup" className='nav-item'>Sign up</NavLink>
              <NavLink to="/login" className='nav-item'>Log in</NavLink>
            </>
            :
            <>
              <NavLink to="/account" className='nav-item'>My account</NavLink>
              <NavLink to="/" onClick={() => handleLogout()} className='nav-item'>Log out</NavLink>
            </>
          }
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
