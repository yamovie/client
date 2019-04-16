import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { MovieCard, SearchBar } from '.';
import '../css/MovieList.css';

const serverLink = 'https://yamovie-server.herokuapp.com/api';

class MovieList extends Component {
  /**
   * Creates a movie list object and connects to the API
   */
  constructor() {
    super();
    this.state = {
      movies: [],
      showGenreFilter: true,
      isModalVisible: false,
      selectedMovie: {},
      searchInputValue: '',
      genres: [],
      page: 1,
      hasNextPage: true,
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
    const { showGenreFilter } = this.state;
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
    }
  };

  // ==================== Handles Filter Click ===============================
  handleSendGenre = genreKey => {
    this.getMovies(genreKey).then(response =>
      this.setState({ movies: response.data.results }),
    );
  };

  // ==================== Toggle Modal Click ===============================
  toggleModal = id => {
    const { isModalVisible } = this.state;
    if (isModalVisible) {
      this.setState({ isModalVisible: false });
    } else {
      this.getSingleMovie(id)
        .then(response =>
          this.setState({ isModalVisible: true, selectedMovie: response.data }),
        )
        .catch(err => console.error(err));
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
    console.log({searchInputValue});
    event.preventDefault();
    axios
      .get('https://yamovie-server.herokuapp.com/api/movies/search', {
        params: {
          title: searchInputValue,
        },
      })
      .then(response =>
        this.setState({
          movies: response.data.results,
          searchInputValue: '',
        }),
      );
  };

  // =================== Handles Scroll activiation for more movies =========
  // scrollHandler = () => {
  //   window.onscroll = () => {
  //     const list = document.documentElement;
  //     const pageHeight = window.innerHeight + list.scrollTop;
  //     const listHeight = list.offsetHeight;
  //     const scrollOffsetHeight = 300;

  //     if (pageHeight >= listHeight - scrollOffsetHeight) {
  //       this.loadMoreMovies();
  //     }
  //   }
  // }

  // ================== Function to load more movies on scroll ===============
  loadMoreMovies = async () => {
    const { hasNextPage, page, movies, loading } = this.state;
    if (hasNextPage && !loading) {
      const res = await axios.get(`${serverLink}/movies/?page=${page + 1}`);
      this.setState({
        // movies: [...movies, ...res.data.results],
        movies: movies.concat(res.data.results),
        page: res.data.page + 1,
        hasNextPage: res.data.hasNextPage,
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
      showGenreFilter,
      isModalVisible,
      selectedMovie,
      searchInputValue,
      genres,
    } = this.state;

    const imagesForAllMovies = movies
      .map(movie => movie.images.posters)
      .map(poster => poster.map(p => p.poster_url));


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
        <SearchBar
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          genres={genres}
          searchInputValue={searchInputValue}
          handleSendGenre={this.handleSendGenre}
          showGenreFilter={showGenreFilter}
        />
        <div
          id="yamovie-movie-list"
          className="container"
          style={{
            opacity: isModalVisible ? 0.08 : '',
          }}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMoreMovies}
            hasMore={true || false}
            loader={<div className="loader" key={0}><img style={{ height: 200 }} src="./images/popcorn-loading.gif" alt="Loading ..."/></div>}
          >
            <div id="list-all-movies">
              {imagesForAllMovies.map((moviePosters, i) => (
                <div id="yamovie-movie-item" key={movies[i].title}>
                  {/* TODO: Wrap this in a button for accessability and to make ESlint happy */}
                  <img
                    src={moviePosters[0]}
                    alt={movies[i].title}
                    className="img-fluid"
                    onClick={() => this.toggleModal(movies[i]._id)}
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default MovieList;
