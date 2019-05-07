/* TODO: remove this later */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserCheckboxList from './UserCheckboxList';
import { moviesAPI, tokenServices, userAPI } from '../utils';
import '../css/UserPreferences.css';

export default class UserPreferences extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      genres: [],
      providers: [],
      user: {},
    };
  }

  componentDidMount() {
    const user = tokenServices.getUserFromToken();
    moviesAPI.getGenres().then(movieResp => {
      // moviesAPI.getProviders('stream').then(provResp => {
      this.setState({
        genres: movieResp.data,
        // providers: provResp.data,
        user,
      });
      // });
    });
  }

  // ===============================================================
  // Handlers

  handlePrefChange = newPrefs => {
    const { user } = this.state;
    userAPI.updatePreferences(user._id, newPrefs);
  };

  // ===============================================================
  // Render

  render() {
    const { genres } = this.state;

    const certOptions = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
    const genreList = genres.map(genre => genre.translation);

    // TODO: Add save button, etc

    return (
      <div className="account-pane">
        <h1>Preferences</h1>
        <UserCheckboxList options={genreList} />
        <UserCheckboxList options={certOptions} />
      </div>
    );
  }
}
