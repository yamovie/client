import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { MovieCard, GenreList } from '.';
import '../css/MovieList.css';

const serverLink = 'https://yamovie-server.herokuapp.com/api';

class MovieList extends Component {
  static propTypes = {
    results: PropTypes.arrayOf(PropTypes.object).isRequired,
    showGenreFilter: PropTypes.bool.isRequired,
    history: PropTypes.shape(Object).isRequired,
  };

  /**
   * Creates a movie list object and connects to the API
   */
  constructor() {
    super();
    this.state = {
      movies: [],
      // filteredGenre: null,
      isModalVisible: false,
      selectedMovie: {},
      hover: false,
      searchInputValue: '',
      genres: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.results !== state.movies) {
      return { movies: props.results };
    } else return null;
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.results !== prevProps.results) {
      this.setState({ movies: this.getDerivedStateFromProps });
    }
  };

  // ===================== Extracts Get Requests ============================
  // Makes each get request a function so they can be used with axios.all()

  /**
   * Gets all the movies, optionally filtered by genreId
   * @param {String} [genreId]
   * @returns An Axios promise with the movie data
   */
  getMovies = (genreId = 'all') => {
    if (genreId !== 'all') {
      return axios.get(`${serverLink}/movies/genre/${genreId}`);
    }
    return axios.get(`${serverLink}/movies/`);
  };

  /**
   * Gets the data for a movie
   * @param {String} [id]
   * @returns An Axios promise with the movie data
   */
  getSingleMovie = id => axios.get(`${serverLink}/movies/${id}`);

  /**
   * Gets the list of all genre objects
   * @returns An Axios promise with the genre data
   */
  getGenres = () => axios.get(`${serverLink}/genres/`);

  // =================== Grabs Movie Data on Render =========================
  // Sets the complete movie collection to state.

  componentDidMount = () => {
    const { results, showGenreFilter, history } = this.props;
    if (showGenreFilter === undefined) {
      history.push('/');
    } else if (showGenreFilter === true) {
      axios.all([this.getGenres(), this.getMovies()]).then(
        axios.spread((genreResp, movieResp) => {
          this.setState({
            genres: genreResp.data,
            movies: movieResp.data.results,
          });
        }),
      );
    } else if (showGenreFilter === false) {
      axios.all([this.getGenres()]).then(
        axios.spread(genreResp => {
          this.setState({
            genres: genreResp.data,
            movies: results,
          });
        }),
      );
    }
  };

  // ==================== Handles Filter Click ===============================
  handleSendGenre = genreKey => {
    this.getMovies(genreKey).then(response =>
      this.setState({ movies: response.data.results }),
    );
  };

  toggleModal = id => {
    const { isModalVisible } = this.state;
    if (isModalVisible) {
      this.setState({ isModalVisible: false });
    } else {
      this.getSingleMovie(id)
        .then(response => {
          console.log(response.data);
          this.setState({
            isModalVisible: true,
            selectedMovie: response.data,
          });
        })
        .catch(err => console.log(err));
    }
  };

  toggleHover = () => {
    this.setState(prevState => ({ hover: !prevState.hover }));
  };

  handleChange = event => {
    this.setState({ searchInputValue: event.target.value });
  };

  // TODO: Factor this out into API call utils
  handleSubmit = event => {
    const { searchInputValue } = this.state;
    event.preventDefault();
    axios
      .get('https://yamovie-server.herokuapp.com/api/movies/search', {
        params: {
          query: searchInputValue,
        },
      })
      .then(response =>
        this.setState({
          movies: response.data.results,
          searchInputValue: '',
        }),
      );
  };

  /**
   * Renders the movie list in HTML on the page. Uses flexboxes to display
   * the genre list, and to display a grid of MovieItems based on breakpoints.
   */
  render() {
    const {
      movies,
      isModalVisible,
      selectedMovie,
      searchInputValue,
      genres,
    } = this.state;

    const { showGenreFilter } = this.props;
    const imagesForAllMovies = movies
      .map(movie => movie.images.posters)
      .map(poster => poster.map(p => p.poster_url));

    // On hover function to display genre list through mega menu
    const { hover } = this.state;
    const hoverStyle = hover ? { display: 'flex' } : { display: 'none' };

    return (
      <div id="movie-page">
        {isModalVisible && (
          <MovieCard
            toggleModal={() => this.toggleModal}
            isModalVisible={isModalVisible}
            movie={selectedMovie}
            genres={genres}
          />
        )}
        <div id="yamovie-movie-list" className="container">
          <div id="mega-search-genres">
            <form id="browse-search" onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={searchInputValue}
                onChange={this.handleChange}
                placeholder="Search Movies"
              />
            </form>
            <button
              type="button"
              id="display-genre-button"
              onClick={this.toggleHover}
            >
              Display Genres
            </button>
            {showGenreFilter ? (
              <GenreList
                genres={genres}
                style={hoverStyle}
                toggleHover={this.toggleHover}
                moviesByGenreId={this.handleSendGenre}
              />
            ) : (
              ' '
            )}
          </div>
          <div id="list-all-movies">
            {imagesForAllMovies.map((moviePosters, i) => (
              <div id="yamovie-movie-item" key={movies[i].title}>
                {/* TODO: Wrap this in a button for accessability and to make ESlint happy */}
                <img
                  src={moviePosters[0]}
                  alt={movies[i].title}
                  className="img-fluid"
                  onClick={() => this.toggleModal(movies[i]._id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieList;
