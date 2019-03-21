import React, { Component } from 'react';
import axios from 'axios';

import MovieAPI from '../MovieApi.js';
import MovieCard from './MovieCard';
import GenreList from './GenreList.js';

class MovieList extends Component {
  /**
   * Creates a movie list object and connects to the API
   */
  constructor() {
    super();
    this.api = new MovieAPI();
    this.state = {
      movies: [],
      showGenreFilter: true,
      isModalVisible: false,
      selectedMovie: {},
    };
  }
  // =================== Grabs Movie Data on Render =========================
  // Sets the complete movie collection to state.

  componentDidMount = () => {
    const { showGenreFilter } = this.state;
    if (showGenreFilter) {
      axios
        .get('https://yamovie-server.herokuapp.com/api/movies')
        .then(response => this.setState({ movies: response.data }));
    }
  };

  // ==================== Handles Filter Click ===============================

  handleSendGenre = genreKey => {
    const { movies } = this.state;
    const updatedMovies = movies.filter(movie => movie.genre_ids.includes(Number(genreKey)));
    this.setState({ movies: updatedMovies });
  };

  toggleModal = id => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.isModalVisible) {
      this.setState({ isModalVisible: false });
    } else {
      axios
        .get(`https://yamovie-server.herokuapp.com/api/movies/${id}`)
        .then(response => this.setState({
          isModalVisible: true,
          selectedMovie: response.data,
        }))
        .catch(err => console.log(err));
    }
  };

  
  // Renders the movie list in HTML on the page. Uses flexboxes to display
  // the genre list, and to display a grid of MovieItems based on breakpoints.
  
  render() {
    const {
      movies, showGenreFilter, isModalVisible, selectedMovie,
    } = this.state;

    return (
      <div id="movie-page">
        {isModalVisible && (
          <MovieCard
            toggleModal={() => this.toggleModal}
            isModalVisible={isModalVisible}
            movie={selectedMovie}
          />
        )}

        <div id="yamovie-movie-list" className="container">
          {showGenreFilter ? <GenreList moviesById={this.handleSendGenre} /> : ''}

          <div id="list-all-movies">
            {movies.map((movie, i) => (
              <div id="yamovie-movie-item" key={i}>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="img-fluid"
                  onClick={() => this.toggleModal(movie._id)}
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
