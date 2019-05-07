/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { AccountNav, UserPreferences } from '../components';
import '../css/UserDashboardPage.css';

class userDashboardPage extends Component {
  render() {
    const { match, user } = this.props;
    return (
      <div className="account-wrapper">
        <AccountNav />

        <Route
          exact
          path={`${match.url}`}
          render={({ props }) => <UserPreferences {...props} user={user} />}
        />
        {/* 
          TO DO: implement watchlist
           */}
        {/* <Route path={`${match.url}/:watchlist`} component={Watchlist} /> */}
      </div>
    );
  }
}

export default userDashboardPage;
