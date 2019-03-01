import MovieAPI from "../MovieApi.js";

export default class MovieList extends HTMLElement {
  constructor() {
    super();
    this.api = new MovieAPI();
    this.state = {
      movies: []
    };

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
        <div id="list-all-movies">
        </div>
    `;

    this.state.movies.forEach(movie => {
      const newMovie = document.createElement("yamovie-movie-item");
      newMovie.movie = movie;
      document.getElementById("list-all-movies").append(newMovie);
    });

    const btns = document.querySelectorAll("yamovie-movie-list button");
    btns.forEach(btn => btn.addEventListener("click", this.filterMovieList));
  }

  filterMovieList(event) {
    const genre = event.target.textContent;
    this.state.movies =
      genre === "All" ? this.api.getMovies() : this.api.getMoviesByGenre(genre);

    this.render();
  }
}
