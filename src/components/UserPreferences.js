import React from 'react';
import axios from 'axios';
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
  constructor(props) {
    super(props);
    this.state = {
      rottenRating: 'N/A',
      imdbRating: 'N/A',
      genres: [],
      streamingServices: {}
    };

    this.handleFormChange = this.handleFormChange.bind(this);
  }

  // =================== Grabs Genre List from API ==============

  componentDidMount() {
    axios
      .get('https://yamovie-server.herokuapp.com/api/genres')
      .then(response => this.setState({ genres: response.data }));
  }

  componentDidUpdate() {
    // updates here
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

  // savePreferences(e) {
  //   console.log(e.target.value);
  // }

  handleFormChange(e) {
    console.log('Form changed baby!');
    // If you are using babel, you can use ES 6 dictionary syntax
    // let change = { [e.target.name] = e.target.value }
    const { streamingServices } = this.state;
    const updatedStreamingServices = streamingServices;
    updatedStreamingServices[e.target.name] = e.target.checked;

    
    
    this.setState({streamingServices: updatedStreamingServices});
  }

  render() {
    const { rottenRating, imdbRating, genres } = this.state;

    return (
      <div className="account-page">
        <form className="preferences-form">
          <div>
            <h1 className="account-title">Movie preferences</h1>
            <h3 className="account-sub-title">Streaming Subscriptions (enable the once you have)</h3>
            <div className="form-control">
              <ToggleSwitch labelName="Hulu" handleChange={this.handleFormChange} name="Hulu" />
            </div>
            <div className="form-control">
              <ToggleSwitch labelName="Netflix" name="Netflix" handleChange={this.handleFormChange} />
            </div>
            <div>
              <h3 className="account-sub-title">Release Year</h3>
              <span className="white">From </span>
              <YearDropdown name="start-year" ascending />
              <span className="white">To </span>
              <YearDropdown name="end-year" />
            </div>
            <div className="form-control">
              <h3 className="account-sub-title">Filter movies by the genres you like (Leave blank for all genres)</h3>
              <GenreList checkboxesVisible genres={genres} handleFormChange={this.handleFormChange} />
            </div>
            <div className="form-control">
              <h3 className="account-sub-title">Filter movies by age/mpaa ratings (Leave blank for all ratings)</h3>
              <GenreList checkboxesVisible showCertifications handleFormChange={this.handleFormChange} />
            </div>
      
            <section className="ratings">
              <h3 className="account-sub-title">Choose a minimum rating score (leave for any ratings)</h3>
              <div className="form-control">
                <label className="form-label top-label" htmlFor="rt-slider">Rotten Tomatoes</label>
                <input type="range" min="0" max="100" defaultValue="0" onChange={this.handleRatingsChange} id="rt-slider" />
                <span className="rating-display white">{rottenRating}%</span>
              </div>
              <div className="form-control">
                <label className="form-label top-label" htmlFor="imdb-slider">IMDB</label>
                <input type="range" min="0" max="10" step="0.1" defaultValue="0" onChange={this.handleRatingsChange} id="imdb-slider" />
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
