/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import '../css/main.css';
import '../css/UserDashboardPage.css';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import GenreList from '../components/GenreList';
import AccountNav from '../components/AccountNav';
import UserPreferences from '../components/UserPreferences';
import Watchlist from '../components/Watchlist';

class userDashboardPage extends Component {
  render() {
    const { match, user } = this.props;
    return (
      <div>
        <div className="account-wrapper">
          <AccountNav />

          <Route exact path={`${match.url}`} render={({ props }) => <UserPreferences {...props} user={user} />} />
          <Route path={`${match.url}/:watchlist`} component={Watchlist} />
        </div>
      </div>

    );
  }
}

export default userDashboardPage;
