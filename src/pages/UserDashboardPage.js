// TODO: Remove this later
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { AccountNav, UserPreferences } from '../components';
import '../css/UserDashboardPage.css';

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

        <Route exact path={`${match.url}`} render={() => <UserPreferences />} />
        {/* 
          TO DO: implement watchlist
           */}
        {/* <Route path={`${match.url}/:watchlist`} component={Watchlist} /> */}
      </div>
    );
  }
}

export default userDashboardPage;
