import React, { Component } from 'react';
import { BrowseMovieList, SearchBar, MovieCard } from '../components';
import { moviesAPI } from '../utils';
import '../css/BrowsePage.css';

export default class BrowsePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      selectedMovie: {},
      loading: false,
      movies: [],
      nextPageNum: 1,
      hasNextPage: true,
      currentGenreFilter: 'all',
    };
  }

  componentDidMount() {
    moviesAPI.getMovies().then(movieResp => {
      this.setState({
        movies: movieResp.data.results,
        nextPageNum: movieResp.data.page,
        hasNextPage: movieResp.data.hasNextPage,
      });
    });
  }

  // ===============================================================
  // Handlers

  handleSubmit = searchInputValue => {
    window.scrollTo(0, 0);
    this.setState({ movies: [], loading: true });
    moviesAPI.getSearchResults(searchInputValue).then(response =>
      this.setState({
        movies: response.data.results,
        nextPageNum: 1,
        loading: false,
      }),
    );
  };

  handleSendGenre = genreKey => {
    window.scrollTo(0, 0);
    this.setState({ movies: [], loading: true });
    moviesAPI.getMovies(genreKey).then(response =>
      this.setState({
        movies: response.data.results,
        currentGenreFilter: genreKey,
        nextPageNum: 2,
        hasNextPage: true,
        loading: false,
      }),
    );
  };

  handleLoadMoreMovies = () => {
    const { hasNextPage, nextPageNum, movies, loading, currentGenreFilter } = this.state;
    if (hasNextPage && !loading) {
      moviesAPI.loadNextPage(nextPageNum, currentGenreFilter).then(res => {
        this.setState({
          movies: movies.concat(res.data.results),
          nextPageNum: res.data.page + 1,
          hasNextPage: res.data.hasNextPage,
          loading: false,
        });
      });
    }
  };

  toggleModal = selectedMovie => {
    const { isModalVisible } = this.state;
    if (isModalVisible) {
      this.setState({ isModalVisible: false });
    } else {
      this.setState({ isModalVisible: true, selectedMovie });
    }
  };

  // ===============================================================
  // Render

  render() {
    const { movies, isModalVisible, selectedMovie, hasNextPage } = this.state;

    return (
      <div className="browse-page">
        <SearchBar
          handleSubmit={this.handleSubmit}
          handleSendGenre={this.handleSendGenre}
        />
        {isModalVisible && (
          <MovieCard movie={selectedMovie} toggleModal={this.toggleModal} />
        )}
        <BrowseMovieList
          movies={movies}
          toggleModal={this.toggleModal}
          loadMoreMovies={this.handleLoadMoreMovies}
          hasNextPage={hasNextPage}
        />
      </div>
    );
  }
}
