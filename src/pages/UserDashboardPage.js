// TODO: Remove this later
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import '../css/main.css';
import '../css/css-pages/UserDashboardPage.css';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { AccountNav, UserPreferences, Watchlist } from '../components';

class userDashboardPage extends Component {
  static propTypes = {
    match: PropTypes.shape(Object).isRequired,
    user: PropTypes.shape(Object).isRequired,
  };

  render() {
    const { match, user } = this.props;
    return (
      <div className="dashboard-page">
        <AccountNav user={user} />

        <Route exact path={`${match.url}`} component={UserPreferences} />
        <Route path={`${match.url}/watchlist`} component={Watchlist} />
      </div>
    );
  }
}

export default userDashboardPage;
