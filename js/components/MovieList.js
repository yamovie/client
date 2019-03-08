import MovieAPI from '../MovieApi.js';

export default class MovieList extends HTMLElement {
  constructor() {
    super();
    this.api = new MovieAPI();
    this.state = {
      movies: [],
      showGenreFilter: true,
    };

    this.filterMovieList = this.filterMovieList.bind(this);
  }

  /**
   * Sets the state of the movie list. Can pass in only the things that need to be changed.
   * @param {Object} newState An object with keys for the state elements that should be set
   *                          e.g. setState( { movies: updatedMovies } )
   */
  setState(newState) {
    Object.keys(newState).forEach(key => {
      // e.g. this.state.movies = updateMovies
      this.state[key] = newState[key];
    });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const genreList = `
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
    `;

    this.innerHTML = `
      ${this.state.showGenreFilter ? genreList : ''}
      <div id="list-all-movies"></div>
    `;

    this.state.movies.forEach(movie => {
      const newMovie = document.createElement('yamovie-movie-item');
      newMovie.movie = movie;
      document.getElementById('list-all-movies').append(newMovie);
    });

    const btns = document.querySelectorAll('yamovie-movie-list button');
    btns.forEach(btn => btn.addEventListener('click', this.filterMovieList));
  }

  filterMovieList(event) {
    const genre = event.target.textContent;
    const showAll = genre === 'All';
    const updatedMovies = showAll
      ? this.api.getMovies()
      : this.api.getMoviesByGenre(genre);
    this.setState({ movies: updatedMovies });
    this.render();
  }
}
