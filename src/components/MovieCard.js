import React, { Component } from 'react';
import MovieAPI from '../MovieApi.js';
import '../css/MovieCard.css';

class MovieCard extends Component {
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

    return (
      <div className="movie-card">
        <div className="backdrop">
          {/* <div className="overlay" /> */}
          <img src={movie.images.backdrops[0].url} alt="" />
        </div>
        <div className="info">
          <button type="button" className="close-modal" onClick={toggleModal()}>
            &times;
          </button>
          <div className="heading">
            <img className="poster" alt={movie.title} src={movie.images.posters[0].url} />
            <h1>{movie.title}</h1>
            <div id="line2">
              <h4>
                {`${movie.release_date.substring(0, 4)}, ${
                  movie.credits.crew.find(member => member.job === 'Director').name
                }`}
              </h4>
              <RatingsView movie={movie} />
            </div>
            <span className="runtime">{movie.runtime} min</span>
            <p className="genres">Some Genres</p>
          </div>
          <div className="description">
            <p>{movie.overview}</p>
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

const StreamsView = ({ movie }) => (
// const streamOptions = movie.streams;
// const streamKeys = Object.keys(streamOptions);
  <div id="streams">
    <h3>Watch Links Coming Soon!</h3>
    {/* <ul>
        {streamKeys.map(streamName => (
          <li>
            <a href={streamOptions[streamName]} target="_blank" rel="noopener noreferrer">
              <img
                src=`/images/icon-${streamName}.png`
                alt={`${streamName.charAt(0).toUpperCase()}${streamName.slice(1)}`}
              />
            </a>
          </li>
        ))}
      </ul> */}
  </div>
);

// ============================================================
// Ratings
const RatingsView = ({ movie }) => {
  const rtRatingObj = movie.ratings.find(obj => obj.source === 'Rotten Tomatoes');
  const rtRating = rtRatingObj ? rtRatingObj.value : '??';
  const imdbRatingObj = movie.ratings.find(
    obj => obj.source === 'Internet Movie Database',
  );
  const imdbRating = imdbRatingObj ? imdbRatingObj.value : '??';

  const rtImg =
    rtRating >= '60%'
      ? 'icon-rottentomatoes-fresh.png'
      : 'icon-rottentomatoes-rotten.png';
  return (
    <div id="ratings">
      <li>
        <a href="http://www.rottentomatoes.com" target="_blank" rel="noopener noreferrer">
          <img src={`/images/${rtImg}`} alt="Rotten Tomatoes" />
          {rtRating}
        </a>
      </li>
      <li>
        <a href="http://www.imdb.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/icon-IMDb.png" alt="IMDb" />
          {imdbRating}
        </a>
      </li>
      {/* <li>
      <img src="/images/icon-star.png" alt="User Rating" />
      Users: 5/5
    </li> */}
    </div>
  );
};

// ============================================================
