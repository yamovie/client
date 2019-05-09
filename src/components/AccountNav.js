import React from 'react';
import { NavLink } from 'react-router-dom';

const AccountNav = () => (
  <aside className="account-nav">
    <ul>
      <li>
        <NavLink to="/account/">Watchlist</NavLink>
      </li>
      <li>
        <NavLink to="/account/preferences">Preferences</NavLink>
      </li>
      {/* 
      TO DO: Implement account settings page, where user can change password etc. 
      */}
      {/* <li>
        <NavLink to="/account/settings">Account settings</NavLink>
      </li> */}
    </ul>
  </aside>
);

export default AccountNav;
