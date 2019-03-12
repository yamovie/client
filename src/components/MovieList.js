import React, { Component } from 'react';

import MovieAPI from '../MovieApi.js';


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
    };

    // this.addEventListener('addModal', this.handleAddModal);
    // this.addEventListener('deleteModal', this.handleDeleteModal);
    this.filterMovieList = this.filterMovieList.bind(this);
  }

  /**
   * Sets the state of the movie list. Can pass in only the things that need to be changed.
   * @param {Object} newState An object with keys for the state elements that should be set
   *                          e.g. setState( { movies: updatedMovies } )
   */
  // setState(newState) {
  //   Object.keys(newState).forEach(key => {
  //     // e.g. this.state.movies = updateMovies
  //     this.state[key] = newState[key];
  //   });
  // }

  /**
   * Called when this list object is rendered on the page the first time.
   * Calls the render function to display data.
   */
  componentDidMount() {
    if (this.state.showGenreFilter) {
      this.setState({ movies: this.api.getMovies() });
    }
  }

  /**
   * Filters the visible list of movies based on the event (which genre was clicked)
   * @param {Event} event Filter trigger event
   */
  filterMovieList = event => {
    const genre = event.target.textContent;
    const showAll = genre === 'All';
    const updatedMovies = showAll
      ? this.api.getMovies()
      : this.api.getMoviesByGenre(genre);
    this.setState({ movies: updatedMovies });
    this.render();
  }

  handleAddModal = event => {
    const modal = document.querySelector('#card-modal');
    const moviePage = document.getElementById('movie-page');

    const currentMovie = event.detail.movie;
    const movieModal = document.createElement('yamovie-movie-card');
    movieModal.movie = currentMovie;
    movieModal.open = true;
    movieModal.className = 'modal container';

    modal.innerHTML = '';
    modal.append(movieModal);
    moviePage.style.opacity = '0.1';
  }

  handleDeleteModal = () => {
    const modal = document.querySelector('#card-modal');
    const moviePage = document.getElementById('movie-page');
    modal.innerHTML = '';
    moviePage.style.opacity = '1';
  }

  /**
   * Renders the movie list in HTML on the page. Uses flexboxes to display
   * the genre list, and to display a grid of MovieItems based on breakpoints.
   */
  render() {
    const { movies, showGenreFilter } = this.state;

    const genreList = '
        <div id="list-genres">
        <button>All</button>
        <button>Animation</button>
        <button>Action</button>
        <button>Adventure</button>
        <button>Biography</button>
        <button>Comedy</button>
        <button>Crime</button>
        <button>Drama</button>
        <button>Family</button>
        <button>Fantasy</button>
        <button>Horror</button>
        <button>Musical</button>
        <button>Mystery</button>
        <button>Romance</button>
        <button>Sci-Fi</button>
        <button>Sport</button>
        <button>Thriller</button>
      </div>
      ';

    movies.forEach(movie => {
      const newMovie = document.createElement('yamovie-movie-item');
      newMovie.movie = movie;
      document.getElementById('list-all-movies').append(newMovie);
    });
  
    const btns = document.querySelectorAll('yamovie-movie-list button');
    btns.forEach(btn => btn.addEventListener('click', this.filterMovieList));
    
    return (
      <div>
        <div id="card-modal" />
        <div id="movie-page">
          {showGenreFilter ? genreList : ''}
          <div id="list-all-movies" />
        </div>
      </div>
    );
  }
}

export default MovieList;
