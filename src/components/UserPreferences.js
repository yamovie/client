import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import { UserCheckboxList } from '.';
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
      value: { min: 20, max: 80 },
      userId: '',
      certifications: { G: false, PG: false, 'PG-13': false, R: false, 'NC-17': false },
      genres: { none: false },
      providers: { none: false },
      ratings: {
        imdb: {
          minRating: 4.5,
          maxRating: 10,
        },
        rottenTomatoes: {
          minRating: 50,
          maxRating: 100,
        },
        //   metacritic: {
        //     minRating: 0,
        //     maxRating: 100,
        //   },
      },
      release: {
        minYear: 1940,
        maxYear: 2020,
      },
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

    const { release, ratings } = this.state;
    const relSliderVals = { min: release.minYear, max: release.maxYear };
    const imdbSliderVals = { min: ratings.imdb.minRating, max: ratings.imdb.maxRating };
    const rtSliderVals = {
      min: ratings.rottenTomatoes.minRating,
      max: ratings.rottenTomatoes.maxRating,
    };
    // TODO: make sure values can't be more than the min or max for the sliders

    return (
      <div className="preferences-pane">
        {/* TODO: Add save button, etc */}
        <h1>Preferences</h1>
        {/* <UserCheckboxList
          options={genreList}
          type="genres"
          handleChange={this.handlePrefChange}
          handleReset={this.handlePrefReset}
          handleSelectAll={this.handleSelectAll}
        /> */}
        <UserCheckboxList
          options={certList}
          type="certifications"
          handleChange={this.handlePrefChange}
          handleReset={this.handlePrefReset}
          handleSelectAll={this.handleSelectAll}
        />
        <InputRange
          minValue={1920}
          maxValue={2020}
          value={relSliderVals}
          onChange={value =>
            this.setState({ release: { minYear: value.min, maxYear: value.max } })
          }
        />
        <InputRange
          minValue={0}
          maxValue={10}
          step={0.1}
          value={imdbSliderVals}
          onChange={value =>
            this.setState(prevState => ({
              ratings: {
                ...prevState.ratings,
                imdb: {
                  minRating: Math.round(10 * value.min) / 10,
                  maxRating: Math.round(10 * value.max) / 10,
                },
              },
            }))
          }
        />
        <InputRange
          minValue={0}
          maxValue={100}
          value={rtSliderVals}
          onChange={value =>
            this.setState(prevState => ({
              ratings: {
                ...prevState.ratings,
                rottenTomatoes: { minRating: value.min, maxRating: value.max },
              },
            }))
          }
        />
      </div>
    );
  }
}
