import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { MovieCard, SearchBar } from '.';
import '../css/MovieList.css';

// const serverLink = 'https://yamovie-server.herokuapp.com/api';
const serverLink = 'https://yamovie-server-staging.herokuapp.com/api';
// const serverLink = 'http://localhost:5000/api';

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

  // ===================== Extracts Get Requests ============================
  // Makes each get request a function so they can be used with axios.all()

  /**
   * Gets all the movies, optionally filtered by genreId
   * @param {String} [genreId]
   * @returns An Axios promise with the movie data
   */
  getMovies = (genreId = 'all') => {
    if (genreId !== 'all') {
      return axios.get(`${serverLink}/movies/genre/${genreId}`);
    }
    return axios.get(`${serverLink}/movies/`);
  };

  /**
   * Gets the data for a movie
   * @param {String} [id]
   * @returns An Axios promise with the movie data
   */
  getSingleMovie = id => axios.get(`${serverLink}/movies/${id}`);

  /**
   * Gets the list of all genre objects
   * @returns An Axios promise with the genre data
   */
  getGenres = () => axios.get(`${serverLink}/genres/`);

  // =================== Grabs Movie Data on Render =========================
  // Sets the complete movie collection to state.

  componentDidMount = () => {
    const { showGenreFilter, results } = this.props;
    if (showGenreFilter) {
      axios.all([this.getGenres(), this.getMovies()]).then(
        axios.spread((genreResp, movieResp) => {
          this.setState({
            genres: genreResp.data,
            movies: movieResp.data.results,
            page: movieResp.data.page,
            hasNextPage: movieResp.data.hasNextPage,
          });
        }),
      );
    } else {
      this.getGenres().then(genreResp =>
        this.setState({
          genres: genreResp.data,
          movies: results,
        }),
      );
    }
  };

  // ==================== Handles Filter Click ===============================
  handleSendGenre = genreKey => {
    this.getMovies(genreKey).then(response =>
    // this.setState({ movies: response.data.results }),
    // this.setState({ page: 1 }),
    // this.setState({ currentGenreFilter: genreKey }),

      this.setState({
        movies: response.data.results,
        currentGenreFilter: genreKey,
        page: 2,
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
  // TODO: Factor this out into API call utils
  handleSubmit = event => {
    const { searchInputValue } = this.state;
    window.scrollTo(0, 0);
    event.preventDefault();
    axios
      .get(`${serverLink}/movies/search`, {
        params: {
          title: searchInputValue,
        },
      })
      .then(response =>
        this.setState({
          movies: response.data.results,
          page: 1,
          searchInputValue: '',
        }),
      );
  };

  // ================== Function to load more movies on scroll ===============
  loadMoreMovies = async () => {
    const { hasNextPage, page, movies, loading, currentGenreFilter } = this.state;
    if (hasNextPage && !loading) {
      if (currentGenreFilter === 'all') {
        const res = await axios.get(`${serverLink}/movies/?page=${page}`);
        this.setState({
          movies: movies.concat(res.data.results),
          page: res.data.page + 1,
          hasNextPage: res.data.hasNextPage,
        });
      } else {
        const res = await axios.get(
          `${serverLink}/movies/genre/${currentGenreFilter}/?page=${page}`,
        );
        this.setState({
          movies: movies.concat(res.data.results),
          page: res.data.page + 1,
          hasNextPage: res.data.hasNextPage,
        });
      }
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
