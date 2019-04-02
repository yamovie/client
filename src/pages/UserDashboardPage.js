import React, { Component } from 'react';
import '../css/main.css';
import '../css/UserDashboardPage.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Navbar from '../components/Navbar';
import GenreList from '../components/GenreList';

library.add(faIgloo);

// ==================== Handles Filter Click ===============================



class userDashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rottenRating: 0,
      imdbRating: 0,

    };
  }
  
  handleSendGenre = genreKey => {
    if (genreKey === 'all') {
      axios
        .get('https://yamovie-server.herokuapp.com/api/movies')
        .then(response => this.setState({ movies: response.data }));
    } else {
      axios
        .get(`https://yamovie-server.herokuapp.com/api/movies/genre/${genreKey}`)
        .then(response => this.setState({ movies: response.data }));
    }
  };

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
      <div>
        <Navbar />
        <div className="account-wrapper">
      
          <aside className="account-nav">
            <ul>
              <li>
                <a href="https://youtube.com">Account settings</a>
              </li>
              <li>
                <a href="https://youtube.com">Movie preferences</a>
              </li>
              <li>
                <a href="https://youtube.com">Watchlist</a>
              </li>
              <li>
                <a href="https://youtube.com">Log out</a>
              </li>
            </ul>
          </aside>
  
          <div className="account-page">
            <form>
              <div>
                <h1 className="account-title">Movie preferences</h1>
                <h3 className="account-sub-title">Streaming Subscriptions (enable the once you have)</h3>
                <div>
                  <span className="white">Hulu</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider" />
                  </label>
                </div>
                <div>
                  <span className="white">Netflix</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider" />
                  </label>
                </div>
                <div>
                  <span className="white">Disney +</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider" />
                  </label>
                </div>
  
                <div>
                  <h3 className="account-sub-title">Filter movis by the genres you like (Leave blank for all genres)</h3>
                  <GenreList checkboxesVisible />
                </div>
                
                <section className="ratings">
                  <div>
                    <span>Rotten</span>
                    <input type="range" min="0" max="100" defaultValue="0" onChange={this.handleRatingsChange} id="rt-slider" />
                    <span className="rating-display">{rottenRating}</span>
                  </div>
                  <div>
                    <span>IMDB</span>
                    <input type="range" min="0" max="10" defaultValue="0" onChange={this.handleRatingsChange} id="imdb-slider" />
                    <span className="rating-display">{imdbRating}</span>
                  </div>
                  
                </section>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default userDashboardPage;
