import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const AccountNav = ({ user }) => (
  <aside className="account-nav">
    <ul>
      <li className="user-name">{user.fullName}</li>
      <li>
        <NavLink to="/account/">Preferences</NavLink>
      </li>
      <li>
        <NavLink to="/account/watchlist">Watchlist</NavLink>
      </li>
    </ul>
  </aside>
);

AccountNav.propTypes = {
  user: PropTypes.shape(Object).isRequired,
};

export default AccountNav;
