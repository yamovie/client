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
        movies: res.data,
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
    const { favoriteMovies, watchedMovies, movies } = this.state;
    const { favorite, watched } = obj;
    const updatedMovies = movies;
    updatedMovies.find(movie => movie._id === movieId).watched = watched;
    updatedMovies.find(movie => movie._id === movieId).favorite = favorite;



    axios.put(`${REACT_APP_SVR_USERS}/${user._id}/watchlist/${movieId}`, {data: {favorite, watched} })
      .then(() => {
        this.setState({movies: updatedMovies });
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
    const { movies, watchedMovies, favoritesAreVisible, isModalVisible, selectedMovie } = this.state;

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
            {
              favoritesAreVisible &&
              movies.map((movie, i) => (
                movie.favorite && <WatchlistItem movie={movie} speed={50} multiplier={i} update={this.updateWatchlist} toggleModal={this.toggleModal} />
              ))
            }
            {!favoritesAreVisible &&
              movies.map((movie, i) => (
                movie.watched && <WatchlistItem movie={movie} speed={50} multiplier={i} update={this.updateWatchlist} toggleModal={this.toggleModal} />
              ))
            }
          </div>
        }
      </div>
    );
  }
}

export default Watchlist;
