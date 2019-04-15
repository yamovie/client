import React, { Component } from 'react';
import axios from 'axios';
import { MovieCard, SearchBar } from '.';
import '../css/MovieList.css';

const serverLink = 'https://yamovie-server-staging.herokuapp.com/api';

class MovieList extends Component {
  /**
   * Creates a movie list object and connects to the API
   */
  constructor() {
    super();
    this.state = {
      movies: [],
      isModalVisible: false,
      selectedMovie: {},
      searchInputValue: '',
      genres: [],
    };
  }

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
    const { showGenreFilter, results } = this.props;
    if (showGenreFilter) {
      axios.all([this.getGenres(), this.getMovies()]).then(
        axios.spread((genreResp, movieResp) => {
          this.setState({
            genres: genreResp.data,
            movies: movieResp.data.results,
          });
        }),
      );
    } else {
      this.getGenres().then(genreResp =>
        this.setState({
          genres: genreResp.data,
          movies: results,
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
          this.setState({ isModalVisible: true, selectedMovie: response.data });
        })
        .catch(err => console.error(err));
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
    console.log({ searchInputValue });
    event.preventDefault();
    axios
      .get('https://yamovie-server.herokuapp.com/api/movies/search', {
        params: {
          title: searchInputValue,
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
      // showGenreFilter,
      isModalVisible,
      selectedMovie,
      searchInputValue,
      genres,
    } = this.state;
    const { showGenreFilter } = this.props;

    const imagesForAllMovies = movies
      .map(movie => movie.images.posters)
      .map(poster => poster.map(p => p.poster_url));

    return (
      <div id="movie-page">
        {isModalVisible && (
          <MovieCard
            toggleModal={() => this.toggleModal}
            isModalVisible={isModalVisible}
            movie={selectedMovie}
            genres={genres}
            showGenreFilter={showGenreFilter}
          />
        )}
        {showGenreFilter ? (
          <SearchBar
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            genres={genres}
            searchInputValue={searchInputValue}
            handleSendGenre={this.handleSendGenre}
            showGenreFilter={showGenreFilter}
          />
        ) : (
          ''
        )}
        <div
          id="yamovie-movie-list"
          className="container"
          style={{
            opacity: isModalVisible ? 0.08 : '',
          }}
        >
          <div id="list-all-movies">
            {imagesForAllMovies.map((moviePosters, i) => (
              <div id="yamovie-movie-item" key={movies[i].title}>
                {/* TODO: Wrap this in a button for accessability and to make ESlint happy */}
                <img
                  src={moviePosters[0]}
                  alt={movies[i].title}
                  className="img-fluid"
                  onClick={() => this.toggleModal(movies[i].id)}
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
