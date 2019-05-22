/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../../css/account/Watchlist.css';
import { WatchlistItem, MovieInfoDisplay  } from '..';
// import { watch } from 'fs';

const { REACT_APP_SVR_USERS, REACT_APP_SVR_API } = process.env;

class Watchlist extends React.Component {
  static propTypes = {
    user: PropTypes.shape(Object).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isModalVisible: false,
      selectedMovie: {},
    }
    this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
  }

  // Loads the user's watchlist movies
  componentDidMount() {
    const { movies } = this.state;
    if (!movies.length) {
      this.getWatchlistMovies(false);
    }
  }

  // Loads the user's watchlist movies. Takes a boolean as an argument.
  getWatchlistMovies(bool) {
    const { user } = this.props;
    const config =  {
      params: {
        watched: bool,
      }
    }

    axios.get(`${REACT_APP_SVR_USERS}/watchlist/${user._id}`, config)
      .then(res => this.setState({movies: res.data}));
  }

  

  toggleModal = movieId => {
    const { isModalVisible } = this.state;
    if (isModalVisible) {
      this.setState({ isModalVisible: false });
    } else {
      axios.get(`${REACT_APP_SVR_API}/movies/${movieId}`)
        .then(res => this.setState({ isModalVisible: true, selectedMovie: res.data }));
    }
  };

  removeFromWatchlist(e, movieId) {
    const { user } = this.props;
    const { movies } = this.state;
    axios.delete(`${REACT_APP_SVR_USERS}/watchlist/${user._id}`, {data: { movieId } })
      .then(() => {
        this.setState({movies: movies.filter(movie => movie._id !== movieId)});
      })
      .catch(error => {
        console.log(`The server responded with error: ${error.response.status}, ${error.response.statusText} `)
      });
  }



  render() {
    const { movies, isModalVisible, selectedMovie } = this.state;

    return (
      <div className="account-pane">
        <div className="watchlist-togglebar">
          <h1 className='account-title'>Your Watchlist</h1>
          
          <div>
            <a>Favourites</a>
            <span> / </span>
            <a>Watched</a>
          </div>
        </div>
        
        {
          <div className="watchlist-wrapper">
            {isModalVisible && (
              <div className="movie-card-container">
                <MovieInfoDisplay
                  type="movie-card"
                  movie={selectedMovie}
                  toggleModal={this.toggleModal}
                  onWatchlistPage
                />
              </div>
            )}
            {movies.length > 0 ?
              movies.map((movie, i) => (
                <WatchlistItem movie={movie} speed={50} multiplier={i} remove={this.removeFromWatchlist} toggleModal={this.toggleModal} />
              ))
              :
              <p className="watchlist-message">Add movies to your watchlist to display them here</p>
            }
          </div>
        }
      </div>
    );
  }
}

export default Watchlist;
