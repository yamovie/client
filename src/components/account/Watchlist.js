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
      favoriteMovies: [],
      watchedMovies: [],
      isModalVisible: false,
      selectedMovie: {},
      favoritesAreVisible: true,
    }
    this.updateWatchlist = this.updateWatchlist.bind(this);
  }

  // Loads the user's watchlist movies
  componentDidMount() {
    const { favoriteMovies } = this.state;
    if (!favoriteMovies.length) {
      this.getWatchlistMovies();
    }
  }

  // Loads the user's watchlist movies. Takes a boolean as an argument.
  // getWatchlistMovies(bool) {
  //   const { user } = this.props;
  //   const config =  {
  //     params: {
  //       watched: bool,
  //     }
  //   }

  //   axios.get(`${REACT_APP_SVR_USERS}/watchlist/${user._id}`, config)
  //     .then(res => this.setState({movies: res.data}));
  // }

  getWatchlistMovies() {
    const { user } = this.props;

    axios.get(`${REACT_APP_SVR_USERS}/${user._id}/watchlist/`)
      .then(res => this.setState({
        favoriteMovies: res.data.filter(movie => movie.favorite === true),
        watchedMovies: res.data.filter(movie => movie.watched === true),
      }));
    // .then(res => console.log(res.data));
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

  // removeFromWatchlist(e, movieId) {
  //   const { user } = this.props;
  //   const { favorites, watched } = this.state;
  //   axios.delete(`${REACT_APP_SVR_USERS}/watchlist/${user._id}`, {data: { movieId } })
  //     .then(() => {
  //       this.setState({favorites: favorites.filter(movie => movie._id !== movieId)});
  //     })
  //     .catch(error => {
  //       console.log(`The server responded with error: ${error.response.status}, ${error.response.statusText} `)
  //     });
  // }

  updateWatchlist(movieId, obj) {
    console.log(movieId, obj);
    const { user } = this.props;
    const { favoriteMovies, watchedMovies } = this.state;
    const { favorite, watched } = obj;

    axios.put(`${REACT_APP_SVR_USERS}/${user._id}/watchlist/${movieId}`, {data: {favorite, watched} })
      .then(() => {
        this.setState({favoriteMovies: favoriteMovies.filter(movie => movie._id !== movieId)});
      })
      .catch(error => {
        console.log(`The server responded with error: ${error.response.status}, ${error.response.statusText} `)
      });
  }

  toggleMovies(toggleTo) {
    let boolean;

    if (toggleTo === 'watched') {
      boolean = true;
    }
    if (toggleTo === 'favorites') {
      boolean = false;
    }


    this.setState({
      favoritesAreVisible: boolean
    });
  }

  render() {
    const { favoriteMovies, watchedMovies, favoritesAreVisible, isModalVisible, selectedMovie } = this.state;

    return (
      <div className="account-pane">
        <div className="watchlist-togglebar">
          <h1 className='account-title'>Your Watchlist</h1>
          
          <div>
            <a onClick={() => this.toggleMovies('watched')} role="link">Favorites</a>
            <span> / </span>
            <a onClick={() => this.toggleMovies('favorites')} role="link">Watched</a>
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
            {favoriteMovies.length &&
              favoritesAreVisible ?
              favoriteMovies.map((movie, i) => (
                <WatchlistItem movie={movie.movieId} speed={50} multiplier={i} update={this.updateWatchlist} toggleModal={this.toggleModal} />
              ))
              :
              watchedMovies.map((movie, i) => (
                <WatchlistItem movie={movie.movieId} speed={50} multiplier={i} update={this.updateWatchlist} toggleModal={this.toggleModal} />
              ))
            }
            {!favoriteMovies.length &&
              <p className="watchlist-message">Add movies to your watchlist to display them here</p>
            }
          </div>
        }
      </div>
    );
  }
}

export default Watchlist;
