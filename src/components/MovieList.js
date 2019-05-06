import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { MovieCard, SearchBar } from '.';
import { moviesAPI } from '../utils';
import '../css/MovieList.css';

class MovieList extends Component {
  /**
   * Creates a movie list object and connects to the API
   */
  constructor() {
    super();
    this.state = {
      movies: [],
      isModalVisible: false,
      selectedMovie: {},
      searchInputValue: '',
      genres: [],
      currentGenreFilter: 'all',
      currentSearchQuery: '',
      page: 1,
      hasNextPage: true,
      loading: false,
    };

    // window.addEventListener('scroll', event => this.scrollHandler(event));
  }

  // =================== Grabs Movie Data on Render =========================
  // Sets the complete movie collection to state.

  componentDidMount = () => {
    const { showGenreFilter, results } = this.props;
    if (showGenreFilter) {
      moviesAPI.getGenres().then(genreResp => {
        moviesAPI.getMovies().then(movieResp => {
          this.setState({
            genres: genreResp.data,
            movies: movieResp.data.results,
            page: movieResp.data.page,
            hasNextPage: movieResp.data.hasNextPage,
          });
        });
      });
    } else {
      moviesAPI.getGenres().then(genreResp =>
        this.setState({
          genres: genreResp.data,
          movies: results,
        }),
      );
    }
  };

  // ==================== Handles Filter Click ===============================
  handleSendGenre = genreKey => {
    moviesAPI.getMovies(genreKey).then(response =>
      this.setState({
        movies: response.data.results,
        currentGenreFilter: genreKey,
        page: 2, // TODO: figure out why this is setting it explicitly to page 2??
        hasNextPage: true,
        loading: false,
      }),
    );
    window.scrollTo(0, 0);
  };

  toggleModal = selectedMovie => {
    const { isModalVisible } = this.state;
    if (isModalVisible) {
      this.setState({ isModalVisible: false });
    } else {
      this.setState({ isModalVisible: true, selectedMovie });
    }
  };

  // ==================== Handles Search Bar Input Change ==================
  handleChange = event => {
    this.setState({ searchInputValue: event.target.value });
  };

  // ==================== Handles Search Bar Input Submit ==================

  handleSubmit = event => {
    const { searchInputValue } = this.state;
    window.scrollTo(0, 0);
    event.preventDefault();
    moviesAPI.getSearchResults(searchInputValue).then(response =>
      this.setState({
        movies: response.data.results,
        page: 1,
        searchInputValue: '',
      }),
    );
  };

  // ================== Function to load more movies on scroll ===============
  loadMoreMovies = () => {
    const { hasNextPage, page, movies, loading, currentGenreFilter } = this.state;
    if (hasNextPage && !loading) {
      moviesAPI.loadNextPage(page, currentGenreFilter).then(res => {
        this.setState({
          movies: movies.concat(res.data.results),
          page: res.data.page + 1,
          hasNextPage: res.data.hasNextPage,
        });
      });
    }
  };

  /**
   * Renders the movie list in HTML on the page. Uses flexboxes to display
   * the genre list, and to display a grid of MovieItems based on breakpoints.
   */
  render() {
    const {
      movies,
      isModalVisible,
      selectedMovie,
      searchInputValue,
      hasNextPage,
      genres,
    } = this.state;
    const { showGenreFilter } = this.props;

    let imagesForAllMovies = [];

    if (movies[0] && movies[0].jw_url) {
      imagesForAllMovies = movies.map(movie => movie.images.poster);
    } else {
      imagesForAllMovies = movies.map(movie => movie.images.posters[0].poster_url);
    }

    return (
      <div id="movie-page">
        {isModalVisible && (
          <MovieCard
            toggleModal={() => this.toggleModal}
            isModalVisible={isModalVisible}
            movie={selectedMovie}
            genres={genres}
            showGenreFilter={showGenreFilter}
          />
        )}
        {showGenreFilter ? (
          <SearchBar
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            genres={genres}
            searchInputValue={searchInputValue}
            handleSendGenre={this.handleSendGenre}
            showGenreFilter={showGenreFilter}
          />
        ) : (
          ''
        )}
        <div id="yamovie-movie-list" className="container">
          {showGenreFilter ? (
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadMoreMovies}
              hasMore={hasNextPage}
              loader={
                <div className="loader" key={0}>
                  <img
                    style={{ height: 200 }}
                    src="./images/popcorn-loading.gif"
                    alt="Loading ..."
                  />
                </div>
              }
            >
              <div id="list-all-movies">
                {imagesForAllMovies.map((moviePosters, i) => (
                  <div id="yamovie-movie-item" key={movies[i].title}>
                    {/* TODO: Wrap this in a button for accessability and to make ESlint happy */}
                    <img
                      src={moviePosters}
                      alt={movies[i].title}
                      className="img-fluid"
                      onClick={() => this.toggleModal(movies[i])}
                    />
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            <div id="list-all-movies">
              {imagesForAllMovies.map((moviePoster, i) => (
                <div id="yamovie-movie-item" key={movies[i].title}>
                  {/* TODO: Wrap this in a button for accessability and to make ESlint happy */}
                  <img
                    src={moviePoster}
                    alt={movies[i].title}
                    className="img-fluid"
                    onClick={() => this.toggleModal(movies[i])}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MovieList;
