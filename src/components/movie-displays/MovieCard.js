import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../css/movie-displays/MovieCard.css';
import { FontAwesomeIcon, userServices, tokenServices } from '../../utils';
import { RatingsView, StreamsView, TrailerModal, MovieInfoDisplay } from '..';

class MovieCard extends Component {
  static propTypes = {
    movie: PropTypes.shape({
      genres: PropTypes.arrayOf(PropTypes.object),
      overview: PropTypes.string,
      ratings: PropTypes.shape({
        internet_movie_database: PropTypes.object,
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
    }).isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

  /**
   * Creates a new movie card element using a movie data object
   * @param {object} [movie] the movie data to use to fill this card
   */
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      trailerVisible: false,
      backdropNum: 0,
    };
    this.randBD = true;
  }

  componentDidMount() {
    this.randomizeBackdrop();
    this.setState({ loading: false });
  }

  // ============================================================
  // Handlers

  handleAddToWatchlist = movieId => {
    // TODO: remove if already on watchlist and styling
    userServices.addToUserWatchlist(movieId);
  };

  randomizeBackdrop = () => {
    if (this.randBD) {
      const { movie } = this.props;
      const { images } = movie;
      const backdropNum = Math.floor(Math.random() * images.backdrops.length);
      this.setState({ backdropNum });
    }
  };

  /**
   * Sets the trailer visible or not
   * @param {Array<Object>} selectedTrailerList list of video info objects
   */
  toggleTrailer = selectedTrailerList => {
    const { trailerVisible } = this.state;
    if (trailerVisible) {
      this.setState({ trailerVisible: false, selectedTrailerList: [] });
    } else {
      this.setState({ trailerVisible: true, selectedTrailerList });
    }
  };

  // ============================================================
  // Render

  /**
   * Renders the movie card in HTML on the page. Uses CSS grid to display information
   * in three segments: trailer, descriptive info, and stream links.
   */
  render() {
    const { movie, toggleModal } = this.props;
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
    const { loading, backdropNum } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    //  Grabs the token thats assigned to the user
    const user = tokenServices.getUserFromToken();

    const genresArray = genres.map(genre => genre.translation);

    const directorList = credits.crew
      .filter(member => member.role === 'Director')
      .map(member => member.name);
    const backdropLink =
      images.backdrops && images.backdrops.length > 0
        ? images.backdrops[backdropNum]
        : '';

    // Play trailer button
    const videoPlayIcon =
      videos && videos.length > 0 ? (
        <span
          className="trailer-icon"
          role="button"
          tabIndex={0}
          onClick={() => this.toggleTrailer(videos)}
        >
          <FontAwesomeIcon icon="play-circle" />
          <p className="trailer-icon-text">Play Trailer</p>
        </span>
      ) : (
        ''
      );

    return (
      <div className="movie-card-container">
        <MovieInfoDisplay type="movie-card" movie={movie} toggleModal={toggleModal} />
      </div>
      // <div className="movie-card movie-info">
      //   <div
      //     className="backdrop"
      //     style={{
      //       backgroundImage: `url(${backdropLink})`,
      //     }}
      //   />
      //   <div className="info">
      //     <button type="button" className="close-modal" onClick={toggleModal}>
      //       <FontAwesomeIcon icon="plus" />
      //     </button>
      //     <div className="heading">
      //       {videoPlayIcon}
      //       {posterLink ? <img className="poster" alt={title} src={posterLink} /> : ''}
      //       <div id="line1">
      //         <h1>{title}</h1>
      //         <p>({release})</p>
      // {/* TODO: make sure the style reflects if this is already on watchlist */}
      // {user && (
      //   <div
      //     className="watchlist"
      //     role="button"
      //     tabIndex={0}
      //     onClick={() => this.handleAddToWatchlist(movie._id)}
      //   >
      //     <FontAwesomeIcon className="watchlist-star" icon="star" />
      //   </div>
      // )}
      //       </div>
      //       <div id="line2">
      //         <span className="certification">{certification}</span>
      //         {runtime ? <span className="runtime">{runtime} min</span> : ''}
      //         <RatingsView ratings={ratings} />
      //       </div>
      //       <p className="genres">{genres.join(', ')}</p>
      //       <StreamsView offers={offers} jw_image_url={jw_image_url} />
      //     </div>
      //     <div className="description">
      //       <h4 className="directors">
      //         Director(s):{' '}
      //         {directorList.length > 0 ? directorList.join(', ') : 'No Director Data'}
      //       </h4>
      //       <p>{overview || 'No plot summary available'}</p>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default MovieCard;
