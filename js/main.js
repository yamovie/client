import MovieList from './components/MovieList.js';
import MovieItem from './components/MovieItem.js';
import MovieCard from './components/MovieCard.js';
import Navbar from './components/Navbar.js';

customElements.define('yamovie-movie-card', MovieCard);
customElements.define('yamovie-movie-list', MovieList);
customElements.define('yamovie-movie-item', MovieItem);
customElements.define('nav-bar', Navbar);