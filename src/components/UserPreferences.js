import React from 'react';
import axios from 'axios';
import GenreList from './GenreList';
import ToggleSwitch from './ToggleSwitch';

class UserPreferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rottenRating: 'N/A',
      imdbRating: 'N/A',
    };
  }

  componentDidMount() {
    // Inital settings here
  }

  componentDidUpdate() {
    // updates here
  }

  savePreferences() {
    axios;
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
        console.log('imdb is zero');
        var IMBDValue = 'N/A';
      } else {
        var IMBDValue = event.target.value;
      }
      this.setState({ imdbRating: IMBDValue });
    }
  }

  handleChange(e) {
    // If you are using babel, you can use ES 6 dictionary syntax
    // let change = { [e.target.name] = e.target.value }
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  render() {
    const { rottenRating, imdbRating } = this.state;

    return (
      <div className="account-page">
        <form className="preferences-form">
          <div>
            <h1 className="account-title">Movie preferences</h1>
            <h3 className="account-sub-title">Streaming Subscriptions (enable the once you have)</h3>
            <div className="form-control">
              <ToggleSwitch labelName="Hulu" handleChange={() => this.handleChange()} />
            </div>
            <div className="form-control">
              <ToggleSwitch labelName="Netflix" handleChange={this.handleChange} />
            </div>
            <div className="form-control">
              <ToggleSwitch labelName="Disney +" handleChange={this.handleChange} />
            </div>

            <div className="form-control">
              <h3 className="account-sub-title">Filter movies by the genres you like (Leave blank for all genres)</h3>
              <GenreList checkboxesVisible />
            </div>
      
            <section className="ratings">
              <h3 className="account-sub-title">Choose your lowest prefered movie rating score</h3>
              <div className="form-control">
                <label className="form-label top-label" htmlFor="rt-slider">Rotten Tomatoes</label>
                <input type="range" min="0" max="100" defaultValue="0" onChange={this.handleRatingsChange} id="rt-slider" />
                <span className="rating-display white">{rottenRating}</span>
              </div>
              <div className="form-control">
                <label className="form-label top-label" htmlFor="imdb-slider">IMDB</label>
                <input type="range" min="0" max="10" defaultValue="0" onChange={this.handleRatingsChange} id="imdb-slider" />
                <span className="rating-display white">{imdbRating}</span>
              </div>
            </section>
          </div>
        </form>
      </div>
    );
  }

  
}

export default UserPreferences;
