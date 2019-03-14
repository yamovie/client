import React, { Component } from 'react';
import '../css/browse-page.css';

import MovieAPI from '../MovieApi.js';
import MovieCard from './MovieCard';


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

  handleAddModal = movie => {
    this.setState({ isHidden: !this.state.isHidden, selectedMovie: movie });
  }
  
  
  // handleAddModal = event => {
  //   const modal = document.querySelector('#card-modal');
  //   const moviePage = document.getElementById('movie-page');

  //   const currentMovie = event.detail.movie;
  //   const movieModal = document.createElement('yamovie-movie-card');
  //   movieModal.movie = currentMovie;
  //   movieModal.open = true;
  //   movieModal.className = 'modal container';

  //   modal.innerHTML = '';
  //   modal.append(movieModal);
  //   moviePage.style.opacity = '0.1';
  // }

  // handleDeleteModal = () => {
  //   const modal = document.querySelector('#card-modal');
  //   const moviePage = document.getElementById('movie-page');
  //   modal.innerHTML = '';
  //   moviePage.style.opacity = '1';
  // }

  /**
   * Renders the movie list in HTML on the page. Uses flexboxes to display
   * the genre list, and to display a grid of MovieItems based on breakpoints.
   */
  render() {
    const {
      movies, showGenreFilter, isHidden, selectedMovie,
    } = this.state;

    const genreList = (
      <div id="list-genres">
        <button type="submit">All</button>
        <button type="submit">Animation</button>
        <button type="submit">Action</button>
        <button type="submit">Adventure</button>
        <button type="submit">Biography</button>
        <button type="submit">Comedy</button>
        <button type="submit">Crime</button>
        <button type="submit">Drama</button>
        <button type="submit">Family</button>
        <button type="submit">Fantasy</button>
        <button type="submit">Horror</button>
        <button type="submit">Musical</button>
        <button type="submit">Mystery</button>
        <button type="submit">Romance</button>
        <button type="submit">Sci-Fi</button>
        <button type="submit">Sport</button>
        <button type="submit">Thriller</button>
      </div>
    );
  
    // const btns = document.querySelectorAll('yamovie-movie-list button');
    // btns.forEach(btn => btn.addEventListener('click', this.filterMovieList));

    // console.log(movies);
    
    return (
      <div id="yamovie-movie-list">
        {isHidden && <MovieCard isHidden={() => this.handleAddModal} hiddenState={isHidden} movie={selectedMovie} />}
        {movies.map(movie => (
          <img
            src={movie.media.posterUrl}
            alt={movie.title}
            className="img-fluid"
            onClick={() => this.handleAddModal(movie)}
          />
        ))}

        {/* <div id="card-modal" />
        <div id="movie-page">
          {showGenreFilter ? genreList : ''}
          <div id="list-all-movies" />
        </div> */}
      </div>
    );
  }
}

export default MovieList;
