import React from './node_modules/react';
import { NavLink } from './node_modules/react-router-dom';

const AccountNav = () => (
  <aside className="account-nav">
    <ul>
      <li>
        <NavLink to="/account/">Preferences</NavLink>
      </li>
      {/* <li>
        <NavLink to="/account/watchlist">Watchlist</NavLink>
      </li> */}
    </ul>
  </aside>
);

export default AccountNav;
