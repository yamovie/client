import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RatingsView, StreamsView, PosterWTrailer } from '..';
import { FontAwesomeIcon, userServices, tokenServices } from '../../utils';
import '../../css/movie-displays/MovieInfoDisplay.css';

export default class MovieInfoDisplay extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    randBD: PropTypes.bool,
    movie: PropTypes.shape({
      genres: PropTypes.arrayOf(PropTypes.object),
      overview: PropTypes.string,
      ratings: PropTypes.shape({
        imdb: PropTypes.object,
        metacritic: PropTypes.object,
        rotten_tomatoes: PropTypes.object,
      }),
      release_year: PropTypes.number,
      runtime: PropTypes.number,
      title: PropTypes.string,
      credits: PropTypes.shape({
        cast: PropTypes.arrayOf(PropTypes.object),
        crew: PropTypes.arrayOf(PropTypes.object),
      }),
      images: PropTypes.shape({
        backdrops: PropTypes.arrayOf(PropTypes.string),
        poster: PropTypes.string,
      }),
      videos: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    toggleModal: PropTypes.func,
    onWatchlistPage: PropTypes.bool,
  };

  static defaultProps = {
    randBD: true,
    toggleModal: () => {},
    onWatchlistPage: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      backdropNum: 0,
    };
  }

  componentWillMount() {
    this.randomizeBackdrop();
  }

  // =========================================================
  // Handlers

  /**
   * Adds a particular movie to the current user's watchlist
   * @param {String} movieId the ObjectId of the specific movie
   */
  handleAddToWatchlist = movieId => {
    // TODO: remove if already on watchlist and styling
    userServices.addToUserWatchlist(movieId);
  };

  /**
   * Toggles whether the display is expanded or not. Only is called/affects the display
   * if it's a 'movie-feed-item' type. Randomizes backdrop and sets state.
   */
  toggleExpanded = () => {
    this.randomizeBackdrop();
    this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
  };

  // =========================================================
  // Render Helpers

  /**
   * Randomizes the backdrop number based on the length of the current movie's backdrop
   * list. Always makes sure the backdrop number is different from the previous value
   * so the backdrop always changes every time this is called. Sets state.
   */
  randomizeBackdrop = () => {
    const { randBD } = this.props;
    if (randBD) {
      const { movie } = this.props;
      const { images } = movie;
      if (images.backdrops.length < 2) return;

      const { backdropNum } = this.state;
      let newBackdropNum = backdropNum;
      while (newBackdropNum === backdropNum) {
        newBackdropNum = Math.floor(Math.random() * images.backdrops.length);
      }
      this.setState({ backdropNum: newBackdropNum });
    }
  };

  /**
   * Helper function to return the JSX for a different button depending on the
   * display type.
   * @returns {HTMLElement} a JSX button element
   */
  getButton = () => {
    const { type, toggleModal } = this.props;
    if (type === 'movie-card') {
      return (
        <button type="button" className="close-modal" onClick={toggleModal}>
          <FontAwesomeIcon icon="plus" />
        </button>
      );
    }
    if (type === 'movie-feed-item') {
      const { isExpanded } = this.state;
      return (
        <button
          type="button"
          className={`expand-indicator ${isExpanded ? 'close' : ''}`}
          onClick={this.toggleExpanded}
        >
          <FontAwesomeIcon icon="angle-down" />
        </button>
      );
    }
    return <div />;
  };

  /**
   * Helper function to set the styling for the display backdrop based on the type.
   * Sets the background image based on the backdropNum, and if it's a 'movie-feed-item'
   * sets the background position shift for different views when expanded or not.
   * @returns {Object} the in-line style object for the top level display component
   */
  getBackgroundStyle = () => {
    const { type, movie } = this.props;
    const { images } = movie;
    const { backdropNum, isExpanded } = this.state;

    const backdropLink =
      images.backdrops && images.backdrops.length > 0
        ? images.backdrops[backdropNum]
        : '';

    const backgroundStyle = { backgroundImage: `url(${backdropLink})` };
    if (type === 'movie-feed-item') {
      backgroundStyle.backgroundPositionX = isExpanded
        ? 'var(--bg-shift-expanded)'
        : 'var(--bg-shift)';
    }
    return backgroundStyle;
  };

  // =========================================================
  // Render

  render() {
    const { type, movie, onWatchlistPage } = this.props;
    const {
      certification,
      genres,
      release_year,
      title,
      runtime,
      credits,
      images,
      overview,
      ratings,
      offers,
      videos,
    } = movie;
    const { isExpanded } = this.state;

    const user = tokenServices.getUserFromToken();

    const genresList = genres.map(genre => genre.translation);
    const directorList = credits.crew
      .filter(member => member.role === 'Director')
      .map(member => member.name);

    return (
      <div className={`movie-info ${type}`} style={this.getBackgroundStyle()}>
        {this.getButton()}
        {images.backdrops.length > 1 && (
          <button type="button" onClick={this.randomizeBackdrop} className="randomize">
            <FontAwesomeIcon icon="random" />
          </button>
        )}
        <div className="gradient" />
        <div className="top-container">
          <PosterWTrailer images={images} videos={videos} />
          <div className="line1">
            <h1 className="title">{title}</h1>
            <p className="year"> ({release_year || 'No Year'})</p>
            {/* TODO: make sure the style reflects if this is already on watchlist */}
            {(!onWatchlistPage && user) && (
              <div
                className="watchlist"
                role="button"
                tabIndex={0}
                onClick={() => this.handleAddToWatchlist(movie._id)}
              >
                <FontAwesomeIcon className="watchlist-star" icon="star" />
              </div>
            )}
          </div>
          <div className="line2">
            <span className="certification">{certification || 'No Data'}</span>
            <span className="runtime">{runtime ? `${runtime} min` : 'No Data'}</span>
            <RatingsView ratings={ratings} />
          </div>
          <p className="genres">
            {genresList.length > 0 ? genresList.join(', ') : 'No Genre Data'}
          </p>
          <StreamsView offers={offers} />
        </div>
        <div
          className="bottom-container"
          style={
            type === 'movie-feed-item' && !isExpanded
              ? { height: '0', padding: '0px 10px' }
              : {}
          }
        >
          <h4 className="directors">
            Director(s):{' '}
            {directorList.length > 0 ? directorList.join(', ') : 'No Director Data'}
          </h4>
          <p className="plot">{overview || 'No plot summary available'}</p>
        </div>
      </div>
    );
  }
}
