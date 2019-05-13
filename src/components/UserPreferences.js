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

    this.displayIcons = {
      certifications: {},
      providers: {},
      genres: {
        '5cd5ab80e1555e05969c5717': '🏃‍💥', // Action Adventure
        '5cd5ab80e1555e05969c5718': '🐭🐲', // Animation
        '5cd5ab80e1555e05969c5719': '😂😝', // Comedy
        '5cd5ab80e1555e05969c571a': '🔫💰', // Crime
        '5cd5ab80e1555e05969c571b': '🤓📑', // Documentary
        '5cd5ab80e1555e05969c571c': '🎭😮', // Drama
        '5cd5ab80e1555e05969c571d': '🧝‍🧙‍', // Fantasy
        '5cd5ab80e1555e05969c571e': '📚🕖', // History
        '5cd5ab80e1555e05969c571f': '😱🔪', // Horror
        '5cd5ab80e1555e05969c5720': '👨‍👨‍👧👩‍👩‍👦', // Kids & Family
        '5cd5ab80e1555e05969c5721': '🎤🎶', // Music & Musical
        '5cd5ab80e1555e05969c5722': '🤔😲', // Mystery & Thriller
        '5cd5ab80e1555e05969c5723': '🌹😍', // Romance
        '5cd5ab80e1555e05969c5724': '👽🤖', // Science-Fiction
        '5cd5ab80e1555e05969c5725': '🤾‍🏅', // Sport & Fitness
        '5cd5ab80e1555e05969c5726': '🏹💣', // War & Military
        '5cd5ab80e1555e05969c5727': '🤠🐴', // Western
      },
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

    this.initialPrefs = {};

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
        moviesAPI.getProviders('flatrate'),
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
            const sizedIcon = provider.icon_url.replace('{profile}', 's50');
            const imgLink = `https://images.justwatch.com${sizedIcon}`;
            if (provider.display_priority <= 20) {
              this.defaults.off.providers[provider._id] = false;
              this.defaults.on.providers[provider._id] = true;
              this.nameMaps.providers[provider._id] = provider.clear_name;
              this.displayIcons.providers[provider._id] = imgLink;
            }
          });
          this.initialPrefs = prefResp.data.preferences;
          this.setState({
            genres: this.defaults.off.genres,
            providers: this.defaults.off.providers,
            ...this.initialPrefs,
            userId: this.user._id,
          });
        }),
      );
  }

  // ===============================================================
  // Handlers

  /**
   * Makes an API request to send the current state and set it as the preferences object
   * in the database corresponding to the current user.
   */
  handleSavePrefs = () => {
    userAPI.updatePreferences(this.user._id, this.state).then(() => {
      SweetAlert.fire({
        position: 'top',
        type: 'success',
        text: 'Preferences Successfully Saved!',
        showConfirmButton: false,
        timer: 900,
      });
    });
  };

  /**
   * Sets the preferences to the initial state when loaded from the server
   */
  handleResetPrefs = async () => {
    await this.setState({ ...this.initialPrefs });
    SweetAlert.fire({
      position: 'top',
      type: 'success',
      text: 'Preferences Successfully Reset!',
      showConfirmButton: false,
      timer: 900,
    });
  };

  /**
   * Targets the specified key in the specified section and toggles its value
   * @param {String} prefSection the name of the key/section in state that is being targeted
   * @param {String} key the name of the particular element being toggled on/off
   */
  handlePrefChange = (prefSection, key) => {
    this.setState(prevState => ({
      [prefSection]: {
        ...prevState[prefSection],
        [key]: !prevState[prefSection][key],
      },
    }));
  };

  /**
   * Drops the data in state for the targeted section and sets it to be the default off
   * values (mapping each id to false)
   * @param {String} prefSection the name of the key in state that is being targeted
   */
  handlePrefReset = prefSection => {
    this.setState({ [prefSection]: this.defaults.off[prefSection] });
  };

  /**
   * Drops the data in state for the targeted section and sets it to be the default on
   * values (mapping each id to true)
   * @param {String} prefSection the name of the key in state that is being targeted
   */
  handleSelectAll = prefSection => {
    this.setState({ [prefSection]: this.defaults.on[prefSection] });
  };

  /**
   * Converts the ObjectId: Bool mapping format as it is in state to the object format
   * with a name, id, and checked value needed for the checkbox display.
   * @param {String} prefSection the name of the key in state that is being targeted
   * @returns {Array<Object>} the list of objects to be displayed
   */
  convertStateToDisplay = prefSection => {
    const displayList = [];
    const { [prefSection]: stateSection } = this.state;
    Object.keys(stateSection).forEach(iDkey => {
      displayList.push({
        id: iDkey,
        name: this.nameMaps[prefSection][iDkey],
        checked: stateSection[iDkey],
        icon: this.displayIcons[prefSection][iDkey],
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
    // TODO: programmatically set the min and max year range values

    return (
      <div className="account-pane preferences-pane">
        <h1>
          Preferences
          <div className="pref-controls">
            <button type="button" className="save" onClick={this.handleSavePrefs}>
              Save
            </button>
            <button type="button" className="reset" onClick={this.handleResetPrefs}>
              Reset
            </button>
          </div>
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
