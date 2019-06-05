import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { WatchlistItem, MovieInfoDisplay } from '..';
import { FontAwesomeIcon } from '../../utils/fontAwesome';
import '../../css/account/Watchlist.css';

const { REACT_APP_SVR_USERS, REACT_APP_SVR_API } = process.env;

class Watchlist extends React.Component {
  static propTypes = {
    user: PropTypes.shape(Object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      favoriteMovies: [],
      // watchedMovies: [],
      isModalVisible: false,
      selectedMovie: {},
      favoritesAreVisible: true,
      activeLink: 'favorites',
    };
    this.updateWatchlist = this.updateWatchlist.bind(this);
  }

  // Loads the user's watchlist movies
  componentDidMount() {
    const { favoriteMovies } = this.state;
    if (!favoriteMovies.length) {
      this.getWatchlistMovies();
    }
  }

  getWatchlistMovies() {
    const { user } = this.props;

    axios.get(`${REACT_APP_SVR_USERS}/${user._id}/watchlist/`).then(res =>
      this.setState({
        movies: res.data,
      }),
    );
  }

  toggleModal = movieId => {
    const { isModalVisible } = this.state;
    if (isModalVisible) {
      this.setState({ isModalVisible: false });
    } else {
      axios
        .get(`${REACT_APP_SVR_API}/movies/${movieId}`)
        .then(res => this.setState({ isModalVisible: true, selectedMovie: res.data }));
    }
  };

  updateWatchlist(movieId, obj) {
    const { user } = this.props;
    const { /* favoriteMovies, watchedMovies, */ movies } = this.state;
    const { favorite, watched } = obj;
    const updatedMovies = movies;
    updatedMovies.find(movie => movie._id === movieId).watched = watched;
    updatedMovies.find(movie => movie._id === movieId).favorite = favorite;

    axios
      .put(`${REACT_APP_SVR_USERS}/${user._id}/watchlist/${movieId}`, {
        data: { favorite, watched },
      })
      .then(() => {
        this.setState({ movies: updatedMovies });
      })
      .catch(error => {
        console.error(
          `The server responded with error: ${error.response.status}, ${
            error.response.statusText
          } `,
        );
      });
  }

  toggleMovies(toggleTo) {
    let boolean;
    let activeLink;

    if (toggleTo === 'watched') {
      boolean = true;
      activeLink = 'favorites';
    }
    if (toggleTo === 'favorites') {
      boolean = false;
      activeLink = 'watched';
    }

    this.setState({
      favoritesAreVisible: boolean,
      activeLink,
    });
  }

  render() {
    const {
      movies,
      activeLink,
      favoritesAreVisible,
      isModalVisible,
      selectedMovie,
    } = this.state;

    return (
      <div className="account-pane">
        <div className="watchlist-togglebar">
          <h1 className="account-title">Your Watchlist</h1>

          <div>
            <button
              type="button"
              onClick={() => this.toggleMovies('watched')}
              className="watchlist-toggle"
            >
              <FontAwesomeIcon icon="star" className="watchlist-toggle-icon" />{' '}
              <span
                className={`${activeLink === 'favorites' && 'watchlist-active-toggle'}`}
              >
                Favorites
              </span>
            </button>
            <span> | </span>
            <button
              type="button"
              onClick={() => this.toggleMovies('favorites')}
              className="watchlist-toggle"
            >
              <FontAwesomeIcon icon="eye" className="watchlist-toggle-icon" />{' '}
              <span
                className={`${activeLink === 'watched' && 'watchlist-active-toggle'}`}
              >
                Watched
              </span>
            </button>
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
            {favoritesAreVisible &&
              movies.map(
                (movie, i) =>
                  movie.favorite && (
                    <WatchlistItem
                      movie={movie}
                      speed={30}
                      multiplier={i}
                      update={this.updateWatchlist}
                      toggleModal={this.toggleModal}
                    />
                  ),
              )}
            {!favoritesAreVisible &&
              movies.map(
                (movie, i) =>
                  movie.watched && (
                    <WatchlistItem
                      movie={movie}
                      speed={30}
                      multiplier={i}
                      update={this.updateWatchlist}
                      toggleModal={this.toggleModal}
                    />
                  ),
              )}
          </div>
        }
      </div>
    );
  }
}

export default Watchlist;
