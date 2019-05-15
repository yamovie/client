// TODO: Remove this later
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { AccountNav, UserPreferences, Watchlist } from '..';
import '../../css/pages/UserDashboardPage.css';

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

        <Route path={`${match.url}/watchlist`} component={Watchlist} />
        <Route exact path={`${match.url}`} component={UserPreferences} />
      </div>
    );
  }
}

export default userDashboardPage;
