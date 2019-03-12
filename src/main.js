// Imports
import MovieCard from './components/MovieCard.js';
import MovieList from './components/MovieList.js';
import MovieItem from './components/MovieItem.js';
import Navbar from './components/Navbar.js';
import MovieForm from './components/MovieForm.js';
import LloydChat from './components/LloydChat.js';

// Custom Element definitions
customElements.define('yamovie-movie-card', MovieCard);
customElements.define('yamovie-movie-list', MovieList);
customElements.define('yamovie-movie-item', MovieItem);
customElements.define('nav-bar', Navbar);
customElements.define('yamovie-movie-form', MovieForm);
customElements.define('lloyd-chat', LloydChat);