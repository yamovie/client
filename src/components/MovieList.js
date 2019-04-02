import React, { Component } from 'react';
import axios from 'axios';

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
      filteredGenre: null,
      showGenreFilter: true,
      isModalVisible: false,
      selectedMovie: {},
    };
  }
  // =================== Grabs Movie Data on Render =========================
  // Sets the complete movie collection to state.

  componentDidMount = () => {
    const { showGenreFilter } = this.state;
    if (showGenreFilter) {
      axios
        .get('https://yamovie-server.herokuapp.com/api/movies')
        .then(response => this.setState({ movies: response.data }));
    }
  };

  // ==================== Handles Filter Click ===============================

  handleSendGenre = genreKey => {
    if (genreKey === 'all') {
      axios
        .get('https://yamovie-server.herokuapp.com/api/movies')
        .then(response => this.setState({ movies: response.data }));
    } else {
      axios
        .get(`https://yamovie-server.herokuapp.com/api/movies/genre/${genreKey}`)
        .then(response => this.setState({ movies: response.data }));
    }
  };

  // handleAllMovies = () => {
  //   axios
  //     .get('https://yamovie-server.herokuapp.com/api/movies')
  //     .then(response => this.setState({ movies: response.data }));
  // }

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

  // Renders the movie list in HTML on the page. Uses flexboxes to display
  // the genre list, and to display a grid of MovieItems based on breakpoints.

  render() {
    const {
      movies,
      showGenreFilter,
      isModalVisible,
      selectedMovie,
      filteredGenre,
    } = this.state;
    const postersForAllMovies = movies.map(movie => movie.images.posters);

    const imagesForAllMovies = postersForAllMovies.map(poster => poster.map(p => p.poster_url));
    // if (image && image[0] && image[0][0]) {
    //   console.log(image[0][0]);
    // }
   

    return (
      <div id="movie-page">
        {isModalVisible && (
          <MovieCard
            toggleModal={() => this.toggleModal}
            isModalVisible={isModalVisible}
            movie={selectedMovie}
          />
        )}

        <div
          id="yamovie-movie-list"
          className="container"
          style={{ opacity: isModalVisible ? 0.08 : '' }}
        >
          {showGenreFilter ? <GenreList moviesByGenreKey={this.handleSendGenre} /> : ''}
          <div id="list-all-movies">
            {// console.log(image);
            // if (image && image[0]) {
              imagesForAllMovies.map(
                (moviePosters, i) => (
                  <div id="yamovie-movie-item" key={movies[i].title}>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                    {/* TODO: Wrap this in a button since it's an interactive element, for accessability and to make ESlint happy */}
                    <img
                      src={moviePosters[0]}
                      alt={movies[i].title}
                      className="img-fluid"
                      onClick={() => this.toggleModal(movies[i]._id)}
                    />
                  </div>
                ),
              // }
              // return (
              //   <div id="yamovie-movie-loading">
              //   loading...
              //   </div>
              // );
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieList;
