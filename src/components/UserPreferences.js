import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import UserCheckboxList from './UserCheckboxList';
import { moviesAPI, tokenServices, userAPI } from '../utils';
import '../css/UserPreferences.css';

export default class UserPreferences extends Component {
  // static propTypes = {};

  constructor(props) {
    super(props);

    this.user = tokenServices.getUserFromToken();

    this.nameMaps = {
      certifications: { G: 'G', PG: 'PG', 'PG-13': 'PG-13', R: 'R', 'NC-17': 'NC-17' },
      genres: { none: 'No Genres' },
      providers: { none: 'No Providers' },
    };

    this.defaults = {
      off: {
        certifications: { G: false, PG: false, 'PG-13': false, R: false, 'NC-17': false },
        genres: {},
        providers: {},
      },
      on: {
        certifications: { G: true, PG: true, 'PG-13': true, R: true, 'NC-17': true },
        genres: {},
        providers: {},
      },
    };

    this.state = {
      userId: '',
      certifications: { G: false, PG: false, 'PG-13': false, R: false, 'NC-17': false },
      genres: { none: false },
      providers: { none: false },
      // ratings: {
      //   imdb: {
      //     minRating: 0,
      //     maxRating: 100,
      //   },
      //   rottenTomatoes: {
      //     minRating: 0,
      //     maxRating: 100,
      //   },
      //   metacritic: {
      //     minRating: 0,
      //     maxRating: 100,
      //   },
      // },
      // release: {
      //   minYear: 1900,
      //   maxYear: 2020,
      // },
    };
  }

  componentDidMount() {
    moviesAPI.getGenres().then(genreResp => {
      // moviesAPI.getProviders('stream').then(provResp => {
      genreResp.data.forEach(genre => {
        this.defaults.off.genres[genre._id] = false;
        this.defaults.on.genres[genre._id] = true;
        this.nameMaps.genres[genre._id] = genre.translation;
      });
      // provResp.data.forEach(provider => {
      //   this.defaults.off.providers[provider._id] = false;
      //   this.defaults.on.providers[provider._id] = true;
      //   this.nameMaps.providers[provider._id] = provider.clear_name;
      // })
      this.setState({
        userId: this.user._id,
        genres: this.defaults.off.genres,
        // providers: this.defaults.off.providers,
      });
      // });
    });
  }

  // ===============================================================
  // Handlers

  handleSavePrefs = () => {
    const { user, preferences } = this.state;
    userAPI.updatePreferences(user._id, preferences);
  };

  handlePrefChange = (prefSection, key) => {
    this.setState(prevState => ({
      [prefSection]: {
        ...prevState[prefSection],
        [key]: !prevState[prefSection][key],
      },
    }));
  };

  handlePrefReset = prefSection => {
    this.setState({ [prefSection]: this.defaults.off[prefSection] });
  };

  handleSelectAll = prefSection => {
    this.setState({ [prefSection]: this.defaults.on[prefSection] });
  };

  // ===============================================================
  // Display Helper

  convertStateToDisplay = prefSection => {
    const displayList = [];
    const { [prefSection]: stateSection } = this.state;
    Object.keys(stateSection).forEach(iDkey => {
      displayList.push({
        id: iDkey,
        name: this.nameMaps[prefSection][iDkey],
        checked: stateSection[iDkey],
      });
    });
    return displayList;
  };

  // ===============================================================
  // Render

  render() {
    const genreList = this.convertStateToDisplay('genres');
    const certList = this.convertStateToDisplay('certifications');

    return (
      <div className="account-pane">
        {/* TODO: Add save button, etc */}
        <h1>Preferences</h1>
        <UserCheckboxList
          options={genreList}
          type="genres"
          handleChange={this.handlePrefChange}
          handleReset={this.handlePrefReset}
          handleSelectAll={this.handleSelectAll}
        />
        <UserCheckboxList
          options={certList}
          type="certifications"
          handleChange={this.handlePrefChange}
          handleReset={this.handlePrefReset}
          handleSelectAll={this.handleSelectAll}
        />
      </div>
    );
  }
}
