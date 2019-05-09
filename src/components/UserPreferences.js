import React, { Component } from 'react';
import axios from 'axios';
import InputRange from 'react-input-range';
import SweetAlert from 'sweetalert2';
import { UserCheckboxList } from '.';
import { moviesAPI, tokenServices, userAPI } from '../utils';
import '../css/UserPreferences.css';

export default class UserPreferences extends Component {
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
      ratings: {
        imdb: {
          minRating: 4.5,
          maxRating: 10,
        },
        rottenTomatoes: {
          minRating: 50,
          maxRating: 100,
        },
        metacritic: {
          minRating: 0,
          maxRating: 100,
        },
      },
      release: {
        minYear: 1940,
        maxYear: 2020,
      },
    };
  }

  componentDidMount() {
    axios
      .all([
        moviesAPI.getGenres(),
        moviesAPI.getProviders('stream'),
        userAPI.getPreferences(this.user._id),
      ])
      .then(
        axios.spread((genreResp, provResp, prefResp) => {
          genreResp.data.forEach(genre => {
            this.defaults.off.genres[genre._id] = false;
            this.defaults.on.genres[genre._id] = true;
            this.nameMaps.genres[genre._id] = genre.translation;
          });
          provResp.data.forEach(provider => {
            if (provider.display_priority <= 20) {
              this.defaults.off.providers[provider._id] = false;
              this.defaults.on.providers[provider._id] = true;
              this.nameMaps.providers[provider._id] = provider.clear_name;
            }
          });
          this.setState({
            genres: this.defaults.off.genres,
            providers: this.defaults.off.providers,
            ...prefResp.data.preferences,
            userId: this.user._id,
          });
        }),
      );
  }

  // ===============================================================
  // Handlers

  handleSavePrefs = () => {
    userAPI.updatePreferences(this.user._id, this.state).then(() => {
      SweetAlert.fire({
        type: 'success',
        text: 'Preferences Successfully Saved!',
        showConfirmButton: false,
        timer: 900,
      });
    });
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
    const provList = this.convertStateToDisplay('providers');

    const { release, ratings } = this.state;
    const relSliderVals = { min: release.minYear, max: release.maxYear };
    const imdbSliderVals = { min: ratings.imdb.minRating, max: ratings.imdb.maxRating };
    const rtSliderVals = {
      min: ratings.rottenTomatoes.minRating,
      max: ratings.rottenTomatoes.maxRating,
    };
    const metaSliderVals = {
      min: ratings.metacritic.minRating,
      max: ratings.metacritic.maxRating,
    };
    // TODO: make sure values can't be more than the min or max for the sliders

    return (
      <div className="preferences-pane">
        <h1>
          Preferences
          <button type="button" className="save" onClick={this.handleSavePrefs}>
            Save
          </button>
        </h1>
        <h4>Select what streaming services you have:</h4>
        <UserCheckboxList
          options={provList}
          type="providers"
          handleChange={this.handlePrefChange}
          handleReset={this.handlePrefReset}
          handleSelectAll={this.handleSelectAll}
        />
        <h4>Select what genres you like:</h4>
        <UserCheckboxList
          options={genreList}
          type="genres"
          handleChange={this.handlePrefChange}
          handleReset={this.handlePrefReset}
          handleSelectAll={this.handleSelectAll}
        />
        <h4>Select what MPAA ratings you want:</h4>
        <UserCheckboxList
          options={certList}
          type="certifications"
          handleChange={this.handlePrefChange}
          handleReset={this.handlePrefReset}
          handleSelectAll={this.handleSelectAll}
        />
        <h4>Select what range of movie release years you like:</h4>
        <InputRange
          minValue={1920}
          maxValue={2020}
          value={relSliderVals}
          onChange={value =>
            this.setState({ release: { minYear: value.min, maxYear: value.max } })
          }
        />
        <h4>Select what range of IMDB ratings you care about:</h4>
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
        <h4>Select what range of Rotten Tomatoes ratings you care about:</h4>
        <InputRange
          minValue={0}
          maxValue={100}
          formatLabel={value => `${value}%`}
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
        <h4>Select what range of Metacritic ratings you care about:</h4>
        <InputRange
          minValue={0}
          maxValue={100}
          value={metaSliderVals}
          onChange={value =>
            this.setState(prevState => ({
              ratings: {
                ...prevState.ratings,
                metacritic: { minRating: value.min, maxRating: value.max },
              },
            }))
          }
        />
      </div>
    );
  }
}
