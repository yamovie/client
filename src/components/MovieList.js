/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import axios from "axios";

import MovieAPI from "../MovieApi.js";
import MovieCard from "./MovieCard";
import GenreList from "./GenreList.js";

import "../css/MovieList.css";

class MovieList extends Component {
  /**
   * Creates a movie list object and connects to the API
   */
  constructor() {
    super();
    this.api = new MovieAPI();
    this.state = {
      movies: [],
      // filteredGenre: null,
      showGenreFilter: true,
      isModalVisible: false,
      selectedMovie: {},
      hover: false,
      searchInputValue: ""
    };
  }
  // =================== Grabs Movie Data on Render =========================
  // Sets the complete movie collection to state.

  componentDidMount = () => {
    const { showGenreFilter } = this.state;
    if (showGenreFilter) {
      axios
        .get("https://yamovie-server.herokuapp.com/api/movies")
        .then(response =>
          this.setState({
            movies: response.data
          })
        );
    }
  };

  // ==================== Handles Filter Click ===============================

  handleSendGenre = genreKey => {
    if (genreKey === "all") {
      axios
        .get("https://yamovie-server.herokuapp.com/api/movies")
        .then(response =>
          this.setState({
            movies: response.data
          })
        );
    } else {
      axios
        .get(
          `https://yamovie-server.herokuapp.com/api/movies/genre/${genreKey}`
        )
        .then(response =>
          this.setState({
            movies: response.data
          })
        );
    }
  };

  toggleModal = id => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.isModalVisible) {
      this.setState({
        isModalVisible: false
      });
    } else {
      axios
        .get(`https://yamovie-server.herokuapp.com/api/movies/${id}`)
        .then(response =>
          this.setState({
            isModalVisible: true,
            selectedMovie: response.data
          })
        )
        // eslint-disable-next-line no-console
        .catch(err => console.log(err));
    }
  };

  toggleHover = () => {
    const { hover } = this.state;
    this.setState({
      hover: !hover
    });
  };

  handleChange = event => {
    this.setState({
      searchInputValue: event.target.value
    });
  };

  handleSubmit = event => {
    const { searchInputValue } = this.state;
    event.preventDefault();
    axios
      .get("https://yamovie-server.herokuapp.com/api/movies/search", {
        params: {
          query: searchInputValue
        }
      })
      .then(response =>
        this.setState({
          movies: response.data,
          searchInputValue: ""
        })
      );
  };

  // Renders the movie list in HTML on the page. Uses flexboxes to display
  // the genre list, and to display a grid of MovieItems based on breakpoints.

  render() {
    const {
      movies,
      showGenreFilter,
      isModalVisible,
      selectedMovie,
      searchInputValue
    } = this.state;
    const postersForAllMovies = movies.map(movie => movie.images.posters);
    const imagesForAllMovies = postersForAllMovies.map(poster =>
      poster.map(p => p.poster_url)
    );

    // On hover function to display genre list through mega menu
    let hoverStyle;
    const { hover } = this.state;
    if (hover) {
      hoverStyle = { display: "flex" };
    } else {
      hoverStyle = { display: "none" };
    }

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
          style={{
            opacity: isModalVisible ? 0.08 : ""
          }}
        >
          <div id="mega-search-genres">
            <form id="browse-search" onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={searchInputValue}
                onChange={this.handleChange}
                placeholder="Search Movies"
              />
            </form>
            <button
              type="button"
              id="display-genre-button"
              onMouseEnter={this.toggleHover}
              onClick={this.toggleHover}
            >
              Display Genres
            </button>
            {showGenreFilter ? (
              <GenreList
                style={hoverStyle}
                toggleHover={this.toggleHover}
                moviesByGenreKey={this.handleSendGenre}
              />
            ) : (
              " "
            )}
          </div>
          <div id="list-all-movies">
            {imagesForAllMovies.map((moviePosters, i) => (
              <div id="yamovie-movie-item" key={movies[i].title}>
                {/* TODO: Wrap this in a button for accessability and to make ESlint happy */}
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                <img
                  src={moviePosters[0]}
                  alt={movies[i].title}
                  className="img-fluid"
                  onClick={() => this.toggleModal(movies[i]._id)}
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
