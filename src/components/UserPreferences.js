import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import GenreList from './GenreList';
import ToggleSwitch from './ToggleSwitch';

const YearDropdown = ({ name, ascending }) => {
  const currentYear = new Date().getFullYear();
  const oldestYear = 2018
  const listOfYears = []

  for (let year = currentYear; year >= oldestYear; year--) {
    listOfYears.push(year)
  }
 
  return (
    <>
      <select name={name}>
        {
          ascending ? listOfYears.reverse().map(year =>
            <option value={year}>{year}</option>
          )
            : listOfYears.map(year =>
              <option value={year}>{year}</option>
            )
        }
      </select>
    </>
  );
}

class UserPreferences extends React.Component {
  static propTypes = {
    user: PropTypes.shape(Object).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      preferences: {
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
      }
    };

    this.handleFormChange = this.handleFormChange.bind(this);
  }

  // =================== Grabs Genre List from API ==============

  componentDidMount() {
    const { user } = this.props;
    const { preferences} = this.state;
    console.log(user);
    axios
      .get('https://yamovie-server.herokuapp.com/api/genres')
      .then(response => this.setState({ genres: response.data }));
    
    axios
      .get('http://localhost:5000/preferences', { params: {userId: user._id} })
      .then(response => {
        const updatedPreferences = {...preferences, ...response.data.preferences}

        this.setState({preferences: updatedPreferences })
      });
    // .then(response => console.log(response.data.preferences))


  }

  componentDidUpdate() {
    console.log('did update');
    const { preferences } = this.state;
    const { user } = this.props;
    axios.patch("http://localhost:5000/preferences/update", { preferences, user }, {headers: new Headers({ 'Content-Type': 'application/json' }) })
  }
  
  handleRatingsChange = event => {
    if (event.target.id === 'rt-slider') {
      if (event.target.value === '0') {
        var rottenTomatoeValue = 'N/A';
      } else {
        var rottenTomatoeValue = event.target.value;
      }
      this.setState({ rottenRating: rottenTomatoeValue });
    } else if (event.target.id === 'imdb-slider') {
      if (event.target.value === '0') {
        var IMBDValue = 'N/A';
      } else {
        var IMBDValue = event.target.value;
      }
      this.setState({ imdbRating: IMBDValue });
    }

  }

  async handleFormChange(e) {
    const { preferences, preferences: { streamingServices } } = this.state;
    const { user } = this.props;
    let updatedPreferences;

    if (e.target.name === 'hulu' || e.target.name ===  'netflix' ) {
      updatedPreferences = {...preferences, streamingServices: {...streamingServices, [e.target.name]: e.target.checked}}
    }


    this.setState({ preferences: updatedPreferences });
  }

  render() {
    const {
      preferences: {
        rottenRating,
        imdbRating,
        certifications,
        streamingServices: {
          hulu, netflix
        },
        ratings,
        release
      },
      genres
    } = this.state;

    return (
      <div className="account-page">
        <form className="preferences-form">
          <div>
            <h1 className="account-title">Movie preferences</h1>
            <h3 className="account-sub-title">Streaming Subscriptions (enable the once you have)</h3>
            <div className="form-control">
              <ToggleSwitch labelName="Hulu" handleChange={this.handleFormChange} selectedValue={hulu} name="hulu" />
            </div>
            <div className="form-control">
              <ToggleSwitch labelName="Netflix" handleChange={this.handleFormChange} selectedValue={netflix} name="netflix" />
            </div>
            <div>
              <h3 className="account-sub-title">Release Year</h3>
              <span className="white">From </span>
              <YearDropdown name="start-year" ascending selectedMinYear={release.minYear} />
              <span className="white">To </span>
              <YearDropdown name="end-year" selectedMaxYear={release.maxYear} />
            </div>
            <div className="form-control">
              <h3 className="account-sub-title">Filter movies by the genres you like (Leave blank for all genres)</h3>
              <GenreList checkboxesVisible genres={genres} handleFormChange={this.handleFormChange} selectedGenres={genres}  />
            </div>
            <div className="form-control">
              <h3 className="account-sub-title">Filter movies by age/mpaa ratings (Leave blank for all ratings)</h3>
              <GenreList checkboxesVisible showCertifications handleFormChange={this.handleFormChange} selectedCertifications={certifications}/>
            </div>
      
            <section className="ratings">
              <h3 className="account-sub-title">Choose a minimum rating score (leave for any ratings)</h3>
              <div className="form-control">
                <label className="form-label top-label" htmlFor="rt-slider">Rotten Tomatoes</label>
                <input type="range" min="0" max="100" defaultValue={rottenRating} onChange={this.handleRatingsChange} id="rt-slider" />
                <span className="rating-display white">{rottenRating}%</span>
              </div>
              <div className="form-control">
                <label className="form-label top-label" htmlFor="imdb-slider">IMDB</label>
                <input type="range" min="0" max="10" step="0.1" defaultValue={imdbRating} onChange={this.handleRatingsChange} id="imdb-slider" />
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
