/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import '../css/main.css';
import '../css/UserDashboardPage.css';
import { Route, Switch } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import UserPreferences from '../components/UserPreferences';
import Watchlist from '../components/Watchlist';
// import AccountSettings from '../components/AccountSettings';

class userDashboardPage extends Component {
  render() {
    const { match, user } = this.props;
    return (
      <div>
        <div className="account-wrapper">
          <AccountNav />
          <Switch>
            <Route  exact path={`${match.url}/preferences`} render={({ props }) =>  <UserPreferences {...props} user={user} />} />
            <Route  exact path={`${match.url}`} render={({ props }) =>  <Watchlist {...props} user={user} />} />
            {/* <Route  exact path={`${match.url}/settings`} render={({ props }) =>  <AccountSettings {...props} user={user} />} /> */}
          </Switch>
  
        </div>
      </div>

    );
  }
}

export default userDashboardPage;
