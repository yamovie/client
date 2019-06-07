import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MovieFeed } from '..';

const UserDashboard = ({ match, movieRecs }) => (
  <div className="user-dashboard account-pane">
    <h2>Movie recommendations for you:</h2>
    {movieRecs && movieRecs.length > 0 ? (
      <MovieFeed movies={movieRecs} />
    ) : (
      <div>
        <br />
        <br />
        <p>
          No results found for current preferences. Try to tweak your{' '}
          <Link to={`${match.url}/preferences`}>preferences</Link> to add more options and
          then try again.
        </p>
      </div>
    )}
  </div>
);

UserDashboard.propTypes = {
  movieRecs: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape(Object).isRequired,
};

UserDashboard.defaultProps = {
  movieRecs: [],
};

export default UserDashboard;
