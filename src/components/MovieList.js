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
      isHidden: false,
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
  }

  // ==================== Handles Filter Click ===============================

  handleSendGenre = genreId => {
    // const { movies } = this.state;
    axios
      .get(`https://yamovie-server.herokuapp.com/api/movies/genres/${genreId}`)
      .then(response => this.setState({ movies: response.data }));
    // const updatedMovies = movies.map(movie => (movie.genre_ids.includes(genreId)));
    // this.setState({ movies: updatedMovies });
  }

  // ==================== Handles Show Movie Card Modal ======================
 
  handleAddModal = movie => {
    const { isHidden } = this.state;
    this.setState({ isHidden: !isHidden, selectedMovie: movie });
  }

  
  // Renders the movie list in HTML on the page. Uses flexboxes to display
  // the genre list, and to display a grid of MovieItems based on breakpoints.
  
  render() {

    // State Destructoring =====================
    const {
      movies, showGenreFilter, isHidden, selectedMovie,
    } = this.state;
  
    
    return (
      <div id="yamovie-movie-list" className="container">
        <div id="movie-page">
          {showGenreFilter ? <GenreList moviesById={this.handleSendGenre} /> : ''}
        </div>
        {isHidden && (
          <MovieCard
            toggleHidden={() => this.handleAddModal}
            hiddenState={isHidden}
            movie={selectedMovie}
          />
        )}
        <div id="list-all-movies">
          {movies.map(movie => (
            <div id="yamovie-movie-item">
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="img-fluid"
                onClick={() => this.handleAddModal(movie)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MovieList;
