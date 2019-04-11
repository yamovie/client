/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { slide as Menu } from 'react-burger-menu';
import { faUser, faHome, faSearch, faColumns, faAddressCard, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import '../css/BurgerMenu.css';

// Adding Font Awesome icons to the library
library.add(faUser, faHome, faSearch, faColumns, faAddressCard, faSignInAlt, faUserPlus);

/**
 * JSX used to render the navbar on the page. Uses flexboxes to display information and links.
 * @returns JSX to create HTML navbar
 */
class Navbar extends Component {
  constructor(props){
    super(props);

    this.state = {
      menuOpen: false,
    }
  }

  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})
  }
  
  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu () {
    this.setState({menuOpen: false})
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu () {
    const { menuOpen } = this.state;
    this.setState({menuOpen: !menuOpen})
  }

  render() {
    const { menuOpen } = this.state;
    const { user, handleLogout } = this.props;
    return (
      <div className="topnav">
        <NavLink to="/">
          <img src="/images/logo-v3-white-whitepopcorn.png" alt="YaMovie" id="main-logo" />
        </NavLink>
        <Menu right isOpen={menuOpen}
          onStateChange={(state) => this.handleStateChange(state)}>
          <NavLink onClick={() => this.closeMenu()} to="/" ><FontAwesomeIcon icon={faHome} /> Home</NavLink>
          <NavLink onClick={() => this.closeMenu()} to="/chat"><FontAwesomeIcon icon={faSearch} /> Find YaMovie</NavLink>
          <NavLink onClick={() => this.closeMenu()} to="/browse"><FontAwesomeIcon icon={faColumns} /> Browse</NavLink>
          <NavLink onClick={() => this.closeMenu()} to="/about"><FontAwesomeIcon icon={faAddressCard} /> About</NavLink>
          {!user ? (
            <div className="bm-div">
              <NavLink className="bm-item" onClick={() => this.closeMenu()} to="/login"><FontAwesomeIcon icon={faSignInAlt} /> Login</NavLink>
              <NavLink className="bm-item" onClick={() => this.closeMenu()} to="/signup"><FontAwesomeIcon icon={faUserPlus} /> Signup</NavLink>
            </div>
          ) : (
            <div className="bm-div">
              <NavLink className="bm-item" onClick={() => this.closeMenu()} to="/account"><FontAwesomeIcon icon="user" /> My Account</NavLink>
              <NavLink className="bm-item" onClick={() => { handleLogout(); this.closeMenu();}} to="/"><FontAwesomeIcon icon={faSignInAlt} /> Logout</NavLink>
            </div>
          )}
        </Menu>
      </div>
    );
  }

  // render() {
  //   const { user, handleLogout } = this.props;
  //   return (
  //     <div className="navbar">
  //       <NavLink to="/">
  //         <img src="/images/logo-v3-white-whitepopcorn.png" alt="YaMovie" id="main-logo" />
  //       </NavLink>
  //       <ul id="navbar-links">
  //         <li>
  //           <NavLink to="/chat">Find YaMovie</NavLink>
  //         </li>
  //         <li>
  //           <NavLink to="/browse">Browse</NavLink>
  //         </li>
  //         <li>
  //           <NavLink to="/about">About</NavLink>
  //         </li>
  //         {!user ? (
  //           <div>
  //             <li>
  //               <NavLink to="/login">Login</NavLink>
  //             </li>
  //             <li>
  //               <NavLink to="/signup">Signup</NavLink>
  //             </li>
  //           </div>
  //         ) : (
  //           <div>
  //             <li>
  //               <NavLink to="/account">
  //                 <FontAwesomeIcon icon="user" />
  //               </NavLink>
  //             </li>
  //             <li>
  //               <NavLink onClick={handleLogout} to="/">
  //             Logout
  //               </NavLink>
  //             </li>
  //           </div>
  //         )}
  //       </ul>
  //     </div>
  //   );
  // }
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
