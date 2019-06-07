import React, { Component } from 'react';
import { Spring, config } from 'react-spring/renderprops';
import { BrowseMovieList, BrowseFilters, MovieInfoDisplay } from '..';
import { moviesAPI } from '../../utils';
import '../../css/pages/BrowsePage.css';

const SEARCH_OPTIONS = ['Title', 'Cast', 'Crew'];

export default class BrowsePage extends Component {
  constructor(props) {
    super(props);

    this.modalContainer = React.createRef();

    this.state = {
      isModalVisible: false,
      selectedMovie: {},
      loading: false,
      movies: [],
      nextPageNum: 1,
      hasNextPage: true,
      currentGenreFilter: 'all',
      currentSearchQuery: '',
      advancedSearchOptions: SEARCH_OPTIONS.reduce(
        (options, option) => ({
          ...options,
          [option]: false,
        }),
        {},
      ),
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

  handleSearchOptions = options => this.setState({ advancedSearchOptions: options });

  /**
   * Handles SearchBar submission, making an API call and changing the displayed movies
   * @param {string} searchInputValue the value searched for
   */
  handleSearchSubmit = searchInputValue => {
    const { advancedSearchOptions } = this.state;
    const { Title, Crew, Cast } = advancedSearchOptions;

    window.scrollTo(0, 0);
    this.setState({
      movies: [],
      loading: true,
      currentSearchQuery: searchInputValue,
      currentGenreFilter: 'all',
    });

    const onlyTitle = Title && !Crew && !Cast;
    const onlyCrew = !Title && Crew && !Cast;
    const onlyCast = !Title && !Crew && Cast;

    let queryFunc = moviesAPI.getAllSearchResults;
    if (onlyTitle) {
      queryFunc = moviesAPI.getTitleSearchResults;
    } else if (onlyCrew) {
      queryFunc = moviesAPI.getCrewSearchResults;
    } else if (onlyCast) {
      queryFunc = moviesAPI.getCastSearchResults;
    }

    queryFunc(searchInputValue).then(response =>
      this.setState({
        movies: response.data.results,
        nextPageNum: 2,
        hasNextPage: response.data.hasNextPage,
        loading: false,
      }),
    );
  };

  /**
   * Handles Genre filter submission, making an API call and changing the displayed movies
   * @param {string} genreKey the ObjectId of the genre to be filtered by
   */
  handleSendGenre = genreKey => {
    window.scrollTo(0, 0);
    this.setState({ movies: [], loading: true, currentGenreFilter: genreKey });
    moviesAPI.getMovies(genreKey).then(response =>
      this.setState({
        movies: response.data.results,
        nextPageNum: 2,
        hasNextPage: true,
        loading: false,
      }),
    );
  };

  /**
   * Loads the next page of results. Takes into account whether the current displayed
   * movies are filtered by genre or a search query.
   */
  handleLoadMoreMovies = () => {
    const {
      hasNextPage,
      nextPageNum,
      movies,
      loading,
      currentGenreFilter,
      currentSearchQuery,
    } = this.state;
    if (hasNextPage && !loading) {
      moviesAPI
        .loadNextPage(nextPageNum, currentGenreFilter, currentSearchQuery)
        .then(res => {
          this.setState({
            movies: movies.concat(res.data.results),
            nextPageNum: res.data.page + 1,
            hasNextPage: res.data.hasNextPage,
            loading: false,
          });
        });
    }
  };

  /**
   * Toggles the MovieCard modal on or off.
   * @param {Object} selectedMovie the object containing the data for the movie to be displayed
   */
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
    const {
      movies,
      isModalVisible,
      selectedMovie,
      hasNextPage,
      currentGenreFilter,
    } = this.state;

    const containerClass = 'movie-card-container';

    return (
      <div className="browse-page">
        <BrowseFilters
          handleSearchSubmit={this.handleSearchSubmit}
          handleSendGenre={this.handleSendGenre}
          currentGenreFilter={currentGenreFilter}
          handleSearchOptions={this.handleSearchOptions}
          searchOptions={SEARCH_OPTIONS}
        />
        {isModalVisible && (
          <Spring config={config.gentle} from={{ opacity: 0 }} to={{ opacity: 1 }}>
            {props => (
              <div
                className={containerClass}
                style={props}
                role="button"
                tabIndex={0}
                ref={this.modalContainer}
                onLoad={() => this.modalContainer.current.focus()}
                onKeyDown={e => {
                  if (e.key === 'Escape' || e.key === 'Esc') {
                    this.toggleModal();
                  }
                }}
                onClick={e => {
                  if (e.target && e.target.className === containerClass) {
                    this.toggleModal();
                  }
                }}
              >
                <MovieInfoDisplay
                  type="movie-card"
                  movie={selectedMovie}
                  toggleModal={this.toggleModal}
                />
              </div>
            )}
          </Spring>
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
