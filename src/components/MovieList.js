/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import axios from 'axios';

import MovieAPI from '../MovieApi.js';
import MovieCard from './MovieCard';
import GenreList from './GenreList.js';

const serverLink = 'https://yamovie-server.herokuapp.com/api';

class MovieList extends Component {
  /**
   * Creates a movie list object and connects to the API
   */
  constructor() {
    super();
    this.api = new MovieAPI();
    this.state = {
      movies: [],
      // filteredGenre: null,
      showGenreFilter: true,
      isModalVisible: false,
      selectedMovie: {},
      genres: [],
    };
  }

  // ===================== Extracts Get Requests ============================
  // Makes each get request a function so they can be used with axios.all()

  /**
   * Gets all the movies, optionally filtered by genreKey
   * @param {String} [genreKey]
   * @returns An Axios promise with the movie data
   */
  getMovies = (genreKey = 'all') => {
    if (genreKey !== 'all') {
      return axios.get(`${serverLink}/movies/genre/${genreKey}`);
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
    const { showGenreFilter } = this.state;
    if (showGenreFilter) {
      axios.all([this.getGenres(), this.getMovies()]).then(
        axios.spread((genreResp, movieResp) => {
          this.setState({ genres: genreResp.data, movies: movieResp.data });
        }),
      );
    }
  };

  // ==================== Handles Filter Click ===============================

  handleSendGenre = genreKey => {
    this.getMovies(genreKey).then(response => this.setState({ movies: response.data }));
  };

  // handleAllMovies = () => {
  //   axios
  //     .get(`${serverLink}/movies/`)
  //     .then(response => this.setState({ movies: response.data }));
  // }

  toggleModal = id => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.isModalVisible) {
      this.setState({ isModalVisible: false });
    } else {
      this.getSingleMovie(id)
        .then(response =>
          this.setState({ isModalVisible: true, selectedMovie: response.data }),
        )
        .catch(err => console.log(err));
    }
  };

  // Renders the movie list in HTML on the page. Uses flexboxes to display
  // the genre list, and to display a grid of MovieItems based on breakpoints.

  render() {
    const {
      movies,
      // filteredGenre,
      showGenreFilter,
      isModalVisible,
      selectedMovie,
      genres,
    } = this.state;
    const postersForAllMovies = movies.map(movie => movie.images.posters);

    const imagesForAllMovies = postersForAllMovies.map(poster =>
      poster.map(p => p.poster_url),
    );

    // if (image && image[0] && image[0][0]) {
    //   console.log(image[0][0]);
    // }

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
          {showGenreFilter ? (
            <GenreList moviesByGenreKey={this.handleSendGenre} genres={genres} />
          ) : (
            ''
          )}
          <div id="list-all-movies">
            {/* console.log(image);
             if (image && image[0]) { */}
            {imagesForAllMovies.map(
              (moviePosters, i) => (
                <div id="yamovie-movie-item" key={movies[i].title}>
                  {/* TODO: Wrap this in a button for accessability and to make ESlint happy */}
                  {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                  <img
                    src={moviePosters[0]}
                    alt={movies[i].title}
                    className="img-fluid"
                    onClick={() => this.toggleModal(movies[i]._id)}
                  />
                </div>
              ),
              /* }
              return (
                <div id="yamovie-movie-loading">
                  loading...
                </div>
              ); */
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieList;
