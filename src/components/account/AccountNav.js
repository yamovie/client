import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const AccountNav = ({ user, sections }) => (
  <aside className="account-nav">
    <div className="user-name">{user.fullName}</div>
    {sections.map(section => {
      const name = section.split('/')[2];
      const capsName = name[0].toUpperCase() + name.slice(1);
      return (
        <NavLink className="nav-link" key={section} to={section}>
          {capsName}
        </NavLink>
      );
    })}
  </aside>
);

AccountNav.propTypes = {
  user: PropTypes.shape(Object).isRequired,
  sections: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AccountNav;
