import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const AccountNav = ({ user }) => (
  <aside className="account-nav">
    <div className="user-name">{user.fullName}</div>
    <NavLink className="nav-link" to="/account" exact>
      Preferences
    </NavLink>
    <NavLink className="nav-link" to="/account/watchlist">
      Watchlist
    </NavLink>
    <NavLink className="nav-link" to="/account/settings">
      Settings
    </NavLink>
  </aside>
);

AccountNav.propTypes = {
  user: PropTypes.shape(Object).isRequired,
};

export default AccountNav;
