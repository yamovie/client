import React from 'react';
import { NavLink } from 'react-router-dom';

const AccountNav = () => (
  <aside className="account-nav">
    <ul>
      <li>
        <NavLink to="/account/">Movie Preferences</NavLink>
      </li>
      {/* <li>
        <NavLink to="/account/watchlist">Watchlist</NavLink>
      </li> */}
    </ul>
  </aside>
);

export default AccountNav;
