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
      isModalVisible: false,
      selectedMovie: {},
    };
  }

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
  };

  handleSendGenre = genreId => {
    const { movies } = this.state;
    axios
      .get(`https://yamovie-server.herokuapp.com/api/movies/genres/${genreId}`)
      .then(response => this.setState({ movies: response.data }));
    // const updatedMovies = movies.map(movie => (movie.genre_ids.includes(genreId)));
    // this.setState({ movies: updatedMovies });
  };

  toggleModal = id => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.isModalVisible) {
      this.setState({ isModalVisible: false });
    } else {
      axios
        .get(`https://yamovie-server.herokuapp.com/api/movies/${id}`)
        .then(response => this.setState({
          isModalVisible: true,
          selectedMovie: response.data,
        }))
        .catch(err => console.log(err));
    }
  };

  /**
   * Renders the movie list in HTML on the page. Uses flexboxes to display
   * the genre list, and to display a grid of MovieItems based on breakpoints.
   */
  render() {
    const {
      movies, showGenreFilter, isModalVisible, selectedMovie,
    } = this.state;

    return (
      <div id="movie-page">
        {isModalVisible && (
          <MovieCard
            toggleHidden={() => this.toggleModal}
            hiddenState={isModalVisible}
            movie={selectedMovie}
          />
        )}

        <div id="yamovie-movie-list" className="container">
          {showGenreFilter ? <GenreList moviesById={this.handleSendGenre} /> : ''}

          <div id="list-all-movies">
            {movies.map((movie, i) => (
              <div id="yamovie-movie-item" key={i}>
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="img-fluid"
                  onClick={() => this.toggleModal(movie._id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieList;
