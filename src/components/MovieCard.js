import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieAPI from '../MovieApi.js';
import '../css/MovieCard.css';

class MovieCard extends Component {
  static propTypes = {
    movie: PropTypes.shape({
      genre_ids: PropTypes.array,
      overview: PropTypes.string,
      ratings: PropTypes.arrayOf(PropTypes.object),
      release_date: PropTypes.string,
      runtime: PropTypes.number,
      title: PropTypes.string,
      credits: PropTypes.shape({
        cast: PropTypes.arrayOf(PropTypes.object),
        crew: PropTypes.arrayOf(PropTypes.object),
      }),
      images: PropTypes.shape({
        backdrops: PropTypes.arrayOf(PropTypes.object),
        posters: PropTypes.arrayOf(PropTypes.object),
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
      movie: {},
      loading: true,
    };
    this.movieApi = new MovieAPI();
  }

  componentDidMount() {
    const { movie } = this.props;
    this.setState({
      movie,
      loading: false,
    });
  }

  /**
   * Renders the movie card in HTML on the page. Uses CSS grid to display information
   * in three segments: trailer, descriptive info, and stream links.
   */
  render() {
    const { movie, loading } = this.state;
    const { toggleModal } = this.props;

    if (loading === true) {
      return <div>Loading...</div>;
    }

    const release = movie.release_date ? movie.release_date.substring(0, 4) : 'No Date';

    const directorList = movie.credits.crew.filter(member => member.job === 'Director');
    const directors =
      directorList.length <= 0
        ? ', No Director'
        : directorList.reduce((dirs, member) => `${dirs}, ${member.name}`, '');
    // const directorObj = movie.credits.crew.find(member => member.job === 'Director');
    // const director = directorObj ? directorObj.name : 'No Director';

    const backdropNum = Math.floor(Math.random() * movie.images.backdrops.length);
    const backdrop = movie.images.backdrops[backdropNum];

    const posterNum = Math.floor(Math.random() * movie.images.posters.length);
    const poster = movie.images.posters[posterNum];

    return (
      <div className="movie-card">
        <div className="backdrop">
          {/* <div className="overlay" /> */}
          {backdrop ? <img src={backdrop.backdrop_url} alt="" /> : ''}
        </div>
        <div className="info">
          <button type="button" className="close-modal" onClick={toggleModal()}>
            &times;
          </button>
          <div className="heading">
            {poster ? (
              <img className="poster" alt={movie.title} src={poster.poster_url} />
            ) : (
              ''
            )}
            <h1>{movie.title}</h1>
            <div id="line2">
              <h4>{`${release}${directors}`}</h4>
              <RatingsView movie={movie} />
            </div>
            {movie.runtime ? <span className="runtime">{movie.runtime} min</span> : ''}
            <p className="genres">Some Genres</p>
          </div>
          <div className="description">
            <p>{movie.overview ? movie.overview : 'No plot summary available'}</p>
          </div>
          <StreamsView movie={movie} />
        </div>
      </div>
    );
  }
}

export default MovieCard;

// ============================================================
// ============================================================
// Sub-components

// ============================================================
// Stream Links
// eslint-disable-next-line arrow-body-style
const StreamsView = ({ movie }) => {
  // const streamOptions = movie.streams;
  // const streamKeys = Object.keys(streamOptions);
  return (
    <div id="streams">
      <h3>{`Watch Links for '${movie.title}' Coming Soon!`}</h3>
      {/* <ul>
        {streamKeys.map(streamName => (
          <li>
            <a href={streamOptions[streamName]} target="_blank" rel="noopener noreferrer">
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-${streamName}.png`}
                alt={`${streamName.charAt(0).toUpperCase()}${streamName.slice(1)}`}
              />
            </a>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

StreamsView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  movie: PropTypes.object,
};

StreamsView.defaultProps = {
  movie: {},
};

// ============================================================
// Ratings
const RatingsView = ({ movie }) => {
  const rtRating = movie.ratings.find(obj => obj.source === 'Rotten Tomatoes');
  const imdbRating = movie.ratings.find(obj => obj.source === 'Internet Movie Database');

  const rtImg =
    rtRating >= '60%'
      ? 'icon-rottentomatoes-fresh.png'
      : 'icon-rottentomatoes-rotten.png';
  return (
    <div id="ratings">
      {rtRating ? (
        <li>
          <a
            href="http://www.rottentomatoes.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/${rtImg}`}
              alt="Rotten Tomatoes"
            />
            {rtRating.value}
          </a>
        </li>
      ) : (
        ''
      )}
      {imdbRating ? (
        <li>
          <a href="http://www.imdb.com" target="_blank" rel="noopener noreferrer">
            <img src={`${process.env.PUBLIC_URL}/images/icon-IMDb.png`} alt="IMDb" />
            {imdbRating.value}
          </a>
        </li>
      ) : (
        ''
      )}
      {/* <li>
      <img src={`${process.env.PUBLIC_URL}/images/icon-star.png`} alt="User Rating" />
      Users: 5/5
    </li> */}
    </div>
  );
};

RatingsView.propTypes = {
  movie: PropTypes.shape({
    ratings: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

// ============================================================
