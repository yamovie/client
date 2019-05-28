import React from 'react';
import PropTypes from 'prop-types';
import { MovieFeed } from '..';

const UserDashboard = ({ movieRecs }) => (
  <div className="user-dashboard account-pane">
    <h3>Some Movie Recommendations:</h3>
    <MovieFeed movies={movieRecs} />
  </div>
);

UserDashboard.propTypes = {
  movieRecs: PropTypes.arrayOf(PropTypes.object),
};

UserDashboard.defaultProps = {
  movieRecs: [],
};

export default UserDashboard;
