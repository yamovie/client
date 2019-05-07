/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import '../css/main.css';
import '../css/cssPages/UserDashboardPage.css';
import { Route } from 'react-router-dom';
import AccountNav from '../components/Account/AccountNav';
import UserPreferences from '../components/Account/UserPreferences';

class userDashboardPage extends Component {
  render() {
    const { match, user } = this.props;
    return (
      <div>
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
      </div>
    );
  }
}

export default userDashboardPage;
