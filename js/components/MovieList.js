import MovieAPI from '../api.js';

export default class MovieList extends HTMLElement {
  constructor() {
    super();
    this.api = new MovieAPI();
    this.state = {
      movies: [],
    };
  }

  connectedCallback() {
    this.state.movies = this.api.getMovies();
    this.render();
  }

  render() {
    this.state.movies.forEach((movie) => {
      const newMovie = document.createElement('yamovie-movie-item');
      newMovie.movie = movie;
      this.append(newMovie);
    });
  }
}
