import React, { Component } from 'react';
import axios from 'axios';
// import '../css/b-list.css';

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
  componentDidMount = () => {
    if (this.state.showGenreFilter) {
      axios
        .get('https://yamovie-server.herokuapp.com/api/movies')
        .then(response => this.setState({ movies: response.data }));
    }
  }

  handleSendGenre = genreId => {
    console.log(genreId);
    // axios
    //   .get(`https://yamovie-server.herokuapp.com/api/movies/genres/${genreId}`)
    //   .then(response => this.setState({ movies: response.data }));
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

  /**
   * Renders the movie list in HTML on the page. Uses flexboxes to display
   * the genre list, and to display a grid of MovieItems based on breakpoints.
   */
  render() {
    const {
      movies, showGenreFilter, isHidden, selectedMovie,
    } = this.state;
  
    // const btns = document.querySelectorAll('yamovie-movie-list button');
    // btns.forEach(btn => btn.addEventListener('click', this.filterMovieList));
    
    return (
      <div id="yamovie-movie-list" className="container">
        <div id="movie-page">
          {showGenreFilter ? <GenreList moviesById={() => this.handleSendGenre} /> : ''}
        </div>
        {isHidden && <MovieCard toggleHidden={() => this.handleAddModal} hiddenState={isHidden} movie={selectedMovie} />}
        <div id="list-all-movies">
          {movies.map(movie => (
            <div id="yamovie-movie-item">
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="img-fluid"
                onClick={() => this.handleAddModal(movies[0])}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MovieList;
