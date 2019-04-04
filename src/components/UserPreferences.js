import React from 'react';
import GenreList from './GenreList';
import ToggleSwitch from './ToggleSwitch';

class UserPreferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rottenRating: 0,
      imdbRating: 0,
    };
  }


  handleRatingsChange = event => {
    if (event.target.id === 'rt-slider') {
      this.setState({ rottenRating: event.target.value });
    } else if (event.target.id === 'imdb-slider') {
      this.setState({ imdbRating: event.target.value });
    }
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
              <ToggleSwitch labelName="Hulu" />
            </div>
            <div className="form-control">
              <ToggleSwitch labelName="Netflix" />
            </div>
            <div className="form-control">
              <ToggleSwitch labelName="Disney +" />
            </div>

            <div className="form-control">
              <h3 className="account-sub-title">Filter movis by the genres you like (Leave blank for all genres)</h3>
              <GenreList checkboxesVisible />
            </div>
      
            <section className="ratings">
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
