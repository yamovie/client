import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import GenreList from './GenreList';
import ToggleSwitch from './ToggleSwitch';
import { getUserFromToken } from '../utils/tokenServices';

const { REACT_APP_SVR_API, REACT_APP_SVR_PREFS } = process.env;

const YearDropdown = ({
  name,
  selectedMinYear,
  selectedMaxYear,
  handlePreferencesChange,
}) => {
  const currentYear = new Date().getFullYear();
  const oldestYear = 2018;
  const listOfYears = [];

  for (let year = currentYear; year >= oldestYear; year--) {
    listOfYears.push(year);
  }

  return (
    <>
      <select name={name} onChange={handlePreferencesChange}>
        {selectedMinYear
          ? listOfYears.reverse().map(year =>
            selectedMinYear === year ? (
              <option value={year} selected>
                {year}
              </option>
            ) : (
              <option value={year}>{year}</option>
            ),
          )
          : listOfYears.map(year =>
            selectedMaxYear === year ? (
              <option value={year} selected>
                {year}
              </option>
            ) : (
              <option value={year}>{year}</option>
            ),
          )}
      </select>
    </>
  );
};

class UserPreferences extends React.Component {
  static propTypes = {
    user: PropTypes.shape(Object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      pageIsLoading: true,
      prefUpdatesQueued: false,
      preferences: {
        genres: [],
        rottenRating: 'N/A',
        imdbRating: 'N/A',
        certifications: [],
        streamingServices: {
          hulu: false,
          netflix: false,
        },
        ratings: {
          imdb: {
            minRating: '',
          },
          rottenTomatoes: {
            minRating: '',
          },
          metacritic: {
            minRating: '',
          },
        },
        release: {
          minYear: '',
          maxYear: '',
        },
      },
    };

    this.handlePreferencesChange = this.handlePreferencesChange.bind(this);
  }

  // =================== Grabs Genre List from API ==============

  componentDidMount() {
    const user = getUserFromToken();
    const userId = user._id;
    const { preferences, genres, pageIsLoading } = this.state;

    if (!genres.length) {
      axios
        .get(`${REACT_APP_SVR_API}/genres`)
        .then(response => this.setState({ genres: response.data, pageIsLoading: false }));
    }

    if (pageIsLoading) {
      axios
        .get(`${REACT_APP_SVR_PREFS}`, {
          params: { userId },
        })
        .then(response => {
          const updatedPreferences = {
            ...preferences,
            ...response.data.preferences,
          };

          this.setState({
            preferences: updatedPreferences,
            pageIsLoading: false,
          });
        });
    }
  }

  componentDidUpdate() {
    const { preferences, prefUpdatesQueued } = this.state;
    const user = getUserFromToken();
    const userId = user._id;

    if (prefUpdatesQueued) {
      console.log('updated!');
      axios
        .put(
          `${REACT_APP_SVR_PREFS}/update`,
          { preferences, userId },
          { headers: new Headers({ 'Content-Type': 'application/json' }) },
        )
        .then(() => this.setState({ prefUpdatesQueued: false }));
    }
  }

  handlePreferencesChange(e, reset, passedProps) {
    const { preferences } = this.state;
    const updatedPreferences = { ...preferences };
    const formInput = e.target;

    // Handle movie ratings change
    if (formInput.id === 'rt-slider') {
      updatedPreferences.ratings.rottenTomatoes.minRating = formInput.value;
    } else if (formInput.id === 'imdb-slider') {
      updatedPreferences.ratings.imdb.minRating = formInput.value;
    }

    // Handle streaming choices
    else if (formInput.name === 'hulu' || formInput.name === 'netflix') {
      updatedPreferences.streamingServices[formInput.name] = formInput.checked;
    }

    // Handle min and max years for movie title preferences
    else if (formInput.name === 'minYear' || formInput.name === 'maxYear') {
      updatedPreferences.release[formInput.name] = formInput.value;
    }

    // Handle form reset for both genres and certifications
    else if (reset) {
      if (formInput.id === 'genrePreferencesForm') {
        updatedPreferences.genres = [];
      } else if (formInput.id === 'certificationsForm') {
        updatedPreferences.certifications = [];
      }
    }

    // Handle the user's selected certifications
    else if (formInput.name === 'certification') {
      if (formInput.checked) {
        updatedPreferences.certifications.push(formInput.value);
      } else if (!formInput.checked) {
        updatedPreferences.certifications.forEach((certification, i) => {
          if (certification === formInput.value) {
            updatedPreferences.certifications.splice(i, 1);
          }
        });
      }
    }

    // Handle the user's selected genres
    else if (formInput.name === 'genre') {
      if (formInput.checked) {
        updatedPreferences.genres.push(formInput.value);
      } else if (!formInput.checked) {
        updatedPreferences.genres.forEach((genre, i) => {
          if (genre === formInput.value) {
            updatedPreferences.genres.splice(i, 1);
          }
        });
      }
    }

    // Updates preferences based on previous conditionals, and makes sure component did update will update
    this.setState({ preferences: updatedPreferences, prefUpdatesQueued: true });
  }

  render() {
    const {
      preferences: {
        certifications,
        streamingServices: { hulu, netflix },
        ratings: {
          imdb: { minRating: imdbRating },
          rottenTomatoes: { minRating: rottenRating },
        },
        release,
        genres: selectedGenres,
      },
      genres,
      pageIsLoading,
    } = this.state;

    if (pageIsLoading) {
      return <></>;
    }

    return (
      <div className="account-page">
        <form className="preferences-form">
          <div>
            <h1 className="account-title">Preferences</h1>
            <h3 className="account-sub-title">
              Streaming subscriptions (Enable the ones you have)
            </h3>
            <div className="form-control">
              <ToggleSwitch
                labelName="Hulu"
                handleChange={this.handlePreferencesChange}
                selectedValue={hulu}
                name="hulu"
              />
            </div>
            <div className="form-control">
              <ToggleSwitch
                labelName="Netflix"
                handleChange={this.handlePreferencesChange}
                selectedValue={netflix}
                name="netflix"
              />
            </div>
            <div>
              <h3 className="account-sub-title">Release year</h3>
              <span className="white">From </span>
              <YearDropdown
                name="minYear"
                selectedMinYear={release.minYear}
                handlePreferencesChange={this.handlePreferencesChange}
              />
              <span className="white">To </span>
              <YearDropdown
                name="maxYear"
                selectedMaxYear={release.maxYear}
                handlePreferencesChange={this.handlePreferencesChange}
              />
            </div>
            <div className="form-control">
              <h3 className="account-sub-title">
                Filter movies by genres you like (Leave blank for all genres)
              </h3>
              <GenreList
                checkboxesVisible
                genres={genres}
                handleFormChange={this.handlePreferencesChange}
                selectedGenres={selectedGenres}
              />
            </div>
            <div className="form-control">
              <h3 className="account-sub-title">
                Filter movies by age/mpaa ratings (Leave blank for all ratings)
              </h3>
              <GenreList
                checkboxesVisible
                showCertifications
                handleFormChange={this.handlePreferencesChange}
                selectedCertifications={certifications}
              />
            </div>

            <section className="ratings">
              <h3 className="account-sub-title">
                Choose a minimum rating score (Leave for any ratings)
              </h3>
              <div className="form-control">
                <label className="form-label top-label" htmlFor="rt-slider">
                  Rotten Tomatoes
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue={rottenRating}
                  onChange={this.handlePreferencesChange}
                  id="rt-slider"
                />
                <span className="rating-display white">{rottenRating}%</span>
              </div>
              <div className="form-control">
                <label className="form-label top-label" htmlFor="imdb-slider">
                  IMDB
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  defaultValue={imdbRating}
                  onChange={this.handlePreferencesChange}
                  id="imdb-slider"
                />
                <span className="rating-display white">{imdbRating}/10</span>
              </div>
            </section>
          </div>
        </form>
      </div>
    );
  }
}

export default UserPreferences;
