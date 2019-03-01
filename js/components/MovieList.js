import MovieAPI from '../MovieApi.js';
import MovieCard from './MovieCard.js';

export default class MovieList extends HTMLElement {
  constructor() {
    super();
    this.api = new MovieAPI();
    this.state = {
      movies: [],
    };

    this.addEventListener('addModal', this.handleAddModal);
    this.addEventListener('deleteModal', this.handleDeleteModal);
    this.filterMovieList = this.filterMovieList.bind(this);
  }

  connectedCallback() {
    this.state.movies = this.api.getMovies();
    this.render();
  }

  render() {
    this.innerHTML = `
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
        <div id="card-modal"></div>
    `;

    this.state.movies.forEach((movie) => {
      const newMovie = document.createElement('yamovie-movie-item');
      newMovie.movie = movie;
      this.append(newMovie);
    });

    const btns = document.querySelectorAll('yamovie-movie-list button');
    btns.forEach(btn => btn.addEventListener('click', this.filterMovieList));
  }

  filterMovieList(event) {
    const genre = event.target.textContent;
    this.state.movies = genre === 'All' ? this.api.getMovies() : this.api.getMoviesByGenre(genre);

    this.render();
  }

  handleAddModal(event) {
    const modal = document.querySelector('#card-modal');

    const currentMovie = event.detail;
    const movieModal = document.createElement('yamovie-movie-card');
    movieModal.movie = currentMovie;
<<<<<<< HEAD
    movieModal.open = true;
    movieModal.className = 'modal';
    console.log(movieModal);
    this.append(movieModal);
=======

    modal.innerHTML = '';
    modal.append(movieModal);
  }

  handleDeleteModal() {
    const modal = document.querySelector('#card-modal');
    modal.innerHTML = '';
>>>>>>> 7d6c1d7b22079a6d20e3a24970ffd3c07f80f454
  }
}
