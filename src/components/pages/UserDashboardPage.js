import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { AccountNav, UserDashboard, UserPreferences, Watchlist } from '..';
import { moviesAPI, tokenServices, userAPI } from '../../utils';
import '../../css/pages/UserDashboardPage.css';

class userDashboardPage extends Component {
  static propTypes = {
    match: PropTypes.shape(Object).isRequired,
    user: PropTypes.shape(Object),
  };

  static defaultProps = {
    user: tokenServices.getUserFromToken(),
  };

  constructor(props) {
    super(props);

    this.state = {
      genres: [],
      providers: [],
      preferences: {},
      movieRecs: [],
    };

    this.waitingForAPI = true;
  }

  componentDidMount() {
    const { user } = this.props;

    axios
      .all([
        moviesAPI.getGenres(),
        moviesAPI.getProviders('flatrate'),
        userAPI.getPreferences(user._id),
      ])
      // TODO: add error handling
      .then(
        axios.spread((genreResp, provResp, prefResp) => {
          this.getAndSetRecs(prefResp.data.preferences);
          this.setState({
            genres: genreResp.data,
            providers: provResp.data,
            preferences: prefResp.data.preferences,
          });
          this.waitingForAPI = false;
        }),
      );
  }

  // ===============================================================
  // Handlers

  getAndSetRecs = prefs => {
    // TODO: add error handling
    moviesAPI.getRecs(prefs).then(recResp => {
      // TODO: add filtering based on available streams
      this.setState({ movieRecs: recResp.data.results });
    });
  };

  /**
   * Makes an API request to send the current state and set it as the preferences object
   * in the database corresponding to the current user.
   */
  handleSavePrefs = newPrefs => {
    if (this.waitingForAPI) return;
    SweetAlert.fire({
      position: 'top',
      type: 'info',
      text: 'Sending preferences to be saved!',
      showConfirmButton: false,
      timer: 900,
    });
    const { user } = this.props;
    this.waitingForAPI = true;
    // TODO: add error handling
    userAPI.updatePreferences(user._id, newPrefs).then(() => {
      this.getAndSetRecs(newPrefs);
      this.setState({ preferences: newPrefs });
      SweetAlert.fire({
        position: 'top',
        type: 'success',
        text: 'Preferences Successfully Saved!',
        showConfirmButton: false,
        timer: 900,
      });
      this.waitingForAPI = false;
    });
  };

  // ===============================================================

  render() {
    const { match, user } = this.props;
    const { genres, providers, preferences, movieRecs } = this.state;
    const sections = [
      `${match.url}/dashboard`,
      `${match.url}/watchlist`,
      `${match.url}/preferences`,
      // `${match.url}/settings`,
    ];

    return (
      <div className="dashboard-page">
        <AccountNav user={user} sections={sections} />
        <Switch>
          <Route
            exact
            path={sections[0]}
            render={() => (
              <UserDashboard match={match} user={user} movieRecs={movieRecs} />
            )}
          />
          <Route exact path={sections[1]} render={() => <Watchlist user={user} />} />
          <Route
            exact
            path={sections[2]}
            render={() => (
              <UserPreferences
                user={user}
                genres={genres}
                providers={providers}
                preferences={preferences}
                handleSavePrefs={this.handleSavePrefs}
              />
            )}
          />
          {/* <Route  exact path={sections[3]} render={() =>  <AccountSettings user={user} />} /> */}
        </Switch>
      </div>
    );
  }
}

export default userDashboardPage;
