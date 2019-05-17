// TODO: Remove this later
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { AccountNav, UserPreferences, Watchlist } from '../index';
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
        <Switch>
          <Route  exact path={`${match.url}/watchlist`} render={({ props }) =>  <Watchlist {...props} user={user} />} />
          <Route  exact path={`${match.url}/preferences`} render={({ props }) =>  <UserPreferences {...props} user={user} />} />
          {/* <Route  exact path={`${match.url}/settings`} render={({ props }) =>  <AccountSettings {...props} user={user} />} /> */}
        </Switch>
      </div>
    );
  }
}

export default userDashboardPage;
