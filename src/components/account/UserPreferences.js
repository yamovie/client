import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import SweetAlert from 'sweetalert2';
import { UserCheckboxList } from '..';
import { tokenServices } from '../../utils';
import '../../css/account/UserPreferences.css';

export default class UserPreferences extends Component {
  static propTypes = {
    user: PropTypes.shape(Object),
    genres: PropTypes.arrayOf(PropTypes.object).isRequired,
    providers: PropTypes.arrayOf(PropTypes.object).isRequired,
    preferences: PropTypes.shape({
      userId: PropTypes.string,
      certifications: PropTypes.object,
      genres: PropTypes.object,
      providers: PropTypes.object,
      ratings: PropTypes.shape({
        imdb: PropTypes.object,
        rottenTomatoes: PropTypes.object,
        metacritic: PropTypes.object,
      }),
      release: PropTypes.object,
      maxRecs: PropTypes.number,
    }).isRequired,
    handleSavePrefs: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: tokenServices.getUserFromToken(),
  };

  constructor(props) {
    super(props);

    this.nameMaps = {
      certifications: {
        G: 'G',
        PG: 'PG',
        'PG-13': 'PG-13',
        R: 'R',
        'NC-17': 'NC-17',
      },
      genres: { none: 'No Genres' },
      providers: { none: 'No Providers' },
    };

    this.displayIcons = {
      certifications: {},
      providers: {},
      genres: {
        'Action & Adventure': '🏃‍💥', // Action Adventure
        Animation: '🐭🐲', // Animation
        Comedy: '😂😝', // Comedy
        Crime: '🔫💰', // Crime
        Documentary: '🤓📑', // Documentary
        Drama: '🎭😮', // Drama
        Fantasy: '🧝‍🧙‍', // Fantasy
        History: '📚🕖', // History
        Horror: '😱🔪', // Horror
        'Kids & Family': '👨‍👨‍👧👩‍👩‍👦', // Kids & Family
        'Music & Musical': '🎤🎶', // Music & Musical
        'Mystery & Thriller': '🤔😲', // Mystery & Thriller
        Romance: '🌹😍', // Romance
        'Science-Fiction': '👽🤖', // Science-Fiction
        'Sport & Fitness': '🤾‍🏅', // Sport & Fitness
        'War & Military': '🏹💣', // War & Military
        Western: '🤠🐴', // Western
      },
    };

    this.defaults = {
      off: {
        certifications: {
          G: false,
          PG: false,
          'PG-13': false,
          R: false,
          'NC-17': false,
        },
        genres: {},
        providers: {},
      },
      on: {
        certifications: {
          G: true,
          PG: true,
          'PG-13': true,
          R: true,
          'NC-17': true,
        },
        genres: {},
        providers: {},
      },
    };

    this.waitingForAPI = true;

    this.state = {
      userId: '',
      certifications: {
        G: false,
        PG: false,
        'PG-13': false,
        R: false,
        'NC-17': false,
      },
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
      maxRecs: 0,
    };
  }

  componentDidMount() {
    const { user, genres, providers, preferences } = this.props;
    const minProvPriority = 20;

    genres.forEach(genre => {
      this.defaults.off.genres[genre._id] = false;
      this.defaults.on.genres[genre._id] = true;
      this.nameMaps.genres[genre._id] = genre.translation;
    });

    providers.forEach(provider => {
      const sizedIcon = provider.icon_url.replace('{profile}', 's50');
      const imgLink = `https://images.justwatch.com${sizedIcon}`;
      if (provider.display_priority <= minProvPriority) {
        this.defaults.off.providers[provider._id] = false;
        this.defaults.on.providers[provider._id] = true;
        this.nameMaps.providers[provider._id] = provider.clear_name;
        this.displayIcons.providers[provider.clear_name] = imgLink;
      }
    });

    this.setState({
      genres: this.defaults.off.genres,
      providers: this.defaults.off.providers,
      ...preferences,
      userId: user._id,
    });
    this.waitingForAPI = false;
  }

  // ===============================================================
  // Handlers

  /**
   * Sets the preferences to the initial state when loaded from the server
   */
  handleResetPrefs = async () => {
    if (this.waitingForAPI) return;
    const { preferences } = this.props;
    await this.setState({ ...preferences });
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
        // the key within displayIcons is the name, so Genres work and can be hard coded
        icon: this.displayIcons[prefSection][this.nameMaps[prefSection][iDkey]],
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

    const { release, ratings, maxRecs } = this.state;
    const { handleSavePrefs } = this.props;

    const relSliderVals = { min: release.minYear, max: release.maxYear };
    const imdbSliderVals = {
      min: ratings.imdb.minRating,
      max: ratings.imdb.maxRating,
    };
    const rtSliderVals = {
      min: ratings.rottenTomatoes.minRating,
      max: ratings.rottenTomatoes.maxRating,
    };
    const metaSliderVals = {
      min: ratings.metacritic.minRating,
      max: ratings.metacritic.maxRating,
    };
    // TODO: programmatically set the min and max year range values
    const yearRange = { min: 1920, max: 2020 };
    const imdbRange = { min: 0, max: 10 };
    const rtMetaRange = { min: 0, max: 100 };

    return (
      <div className="account-pane preferences-pane">
        <h1>
          Preferences
          <div className="pref-controls">
            <button
              type="button"
              className="save"
              onClick={() => handleSavePrefs(this.state)}
            >
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
        <h4>Select how many recommendations you would like (0 for no limit):</h4>
        <InputRange
          minValue={0}
          maxValue={20}
          value={maxRecs}
          onChange={value => this.setState({ maxRecs: value })}
        />
        <h4>Select what range of movie release years you like:</h4>
        <InputRange
          minValue={yearRange.min}
          maxValue={yearRange.max}
          value={relSliderVals}
          onChange={value =>
            this.setState({
              release: {
                minYear: value.min < yearRange.min ? yearRange.min : value.min,
                maxYear: value.max > yearRange.max ? yearRange.max : value.max,
              },
            })
          }
        />
        <h4>Select what range of IMDB ratings you care about:</h4>
        <InputRange
          minValue={imdbRange.min}
          maxValue={imdbRange.max}
          step={0.1}
          value={imdbSliderVals}
          onChange={value =>
            this.setState(prevState => ({
              ratings: {
                ...prevState.ratings,
                imdb: {
                  minRating:
                    value.min < imdbRange.min
                      ? imdbRange.min
                      : Math.round(10 * value.min) / 10,
                  maxRating:
                    value.max > imdbRange.max
                      ? imdbRange.max
                      : Math.round(10 * value.max) / 10,
                },
              },
            }))
          }
        />
        <h4>Select what range of Rotten Tomatoes ratings you care about:</h4>
        <InputRange
          minValue={rtMetaRange.min}
          maxValue={rtMetaRange.max}
          formatLabel={value => `${value}%`}
          value={rtSliderVals}
          onChange={value =>
            this.setState(prevState => ({
              ratings: {
                ...prevState.ratings,
                rottenTomatoes: {
                  minRating: value.min < rtMetaRange.min ? rtMetaRange.min : value.min,
                  maxRating: value.max > rtMetaRange.max ? rtMetaRange.max : value.max,
                },
              },
            }))
          }
        />
        <h4>Select what range of Metacritic ratings you care about:</h4>
        <InputRange
          minValue={rtMetaRange.min}
          maxValue={rtMetaRange.max}
          value={metaSliderVals}
          onChange={value =>
            this.setState(prevState => ({
              ratings: {
                ...prevState.ratings,
                metacritic: {
                  minRating: value.min < rtMetaRange.min ? rtMetaRange.min : value.min,
                  maxRating: value.max > rtMetaRange.max ? rtMetaRange.max : value.max,
                },
              },
            }))
          }
        />
      </div>
    );
  }
}
