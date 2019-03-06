import MovieAPI from '../MovieApi.js';

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
    <div id="card-modal"></div>
    <div id="movie-page">
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
    
    <div id="list-all-movies"></div>
    </div>
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
    this.state.movies = showAll
      ? this.api.getMovies()
      : this.api.getMoviesByGenre(genre);
    this.render();
  }

  handleAddModal(event) {
    const modal = document.querySelector('#card-modal');
    const moviePage = document.getElementById('movie-page');

    const currentMovie = event.detail;
    const movieModal = document.createElement('yamovie-movie-card');
    movieModal.movie = currentMovie;
    movieModal.open = true;
    movieModal.className = 'modal container';

    modal.innerHTML = '';
    modal.append(movieModal);
    moviePage.style.opacity = '0.1';
  }

  handleDeleteModal() {
    const modal = document.querySelector('#card-modal');
    const moviePage = document.getElementById('movie-page');
    modal.innerHTML = '';
    moviePage.style.opacity = '1';
  }
}
