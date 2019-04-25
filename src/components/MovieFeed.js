import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import MovieItem from "./MovieItem";
import '../css/MovieFeed.css'

const serverLink = 'https://yamovie-server-staging.herokuapp.com/api';

export default class MovieFeed extends Component {
  /**
   * Creates a movie list object and connects to the API
   */
  constructor() {
    super();
    this.state = {
      movies: [],
      genres: [],
      loading: false,
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
      this.setState({
        movies: response.data.results,
        currentGenreFilter: genreKey,
        page: 2,
        hasNextPage: true,
        loading: false,
      }),
    );
    window.scrollTo(0, 0);
  };

  /**
   * Renders the movie list in HTML on the page. Uses flexboxes to display
   * the genre list, and to display a grid of MovieItems based on breakpoints.
   */
  render() {
    const {
      movies,
      genres,
      loading,
    } = this.state;

    let imagesForAllMovies = [];

    if (movies[0] && movies[0].jw_url) {
      imagesForAllMovies = movies.map(movie => movie.images.poster);
    } else {
      imagesForAllMovies = movies.map(movie => movie.images.posters[0].poster_url);
    }


    return (
      <div id="movie-page">
        <div id="all-movies">
          {loading &&
          <div className="loader" key={0}>
            <img
              style={{ height: 200 }}
              src="./images/popcorn-loading.gif"
              alt="Loading ..."
            />
          </div>}
          {imagesForAllMovies.map((moviePoster, i) => (
            <div id="movie-item" key={movies[i].title}>
              <MovieItem
                loading={loading}
                movie={movies[i]}
                poster={moviePoster}
                genres={genres}
                onClick={() => this.toggleModal(movies[i])}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

}
