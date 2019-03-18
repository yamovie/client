import React, { Component } from 'react';
import MovieAPI from '../MovieApi.js';
import '../css/movie-card.css';

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
    const { isHidden } = this.props;

    if (loading === true) {
      return <div>Loading...</div>;
    }
    const streamOptions = movie.streams;
    const streamKeys = Object.keys(streamOptions);

    const genreString = movie.tags.genres.join(', ');

    const rtImg =
      movie.ratings.rottenTomatoes.score >= '60%'
        ? 'icon-rottentomatoes-fresh.png'
        : 'icon-rottentomatoes-rotten.png';
    const rtFresh = movie.ratings.rottenTomatoes.score >= '60%' ? 'Fresh' : 'Rotten';


    return (
      <div className="yamovie-movie-card">
        <div className="grid-item" id="trailer">
          <iframe
            title="movie trailer"
            width="100%"
            height="100%"
            src={movie.media.trailerUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="grid-item" id="info">
          <div id="headings">
            <button type="button" className="close-modal" onClick={isHidden()}>X</button>
            <h1>{`${movie.title} (${movie.releaseYear})`}</h1>
            <h3>{genreString}</h3>
            <h6>{`Runtime: ${movie.runtime} minutes`}</h6>
            <h6>{`Rated ${movie.ratings.mpaa}`}</h6>
          </div>
          <p>
            {movie.plot}
          </p>
          <div id="ratings">
            <li>
              <a href={`${movie.ratings.rottenTomatoes.link}`} target="_blank" rel="noopener noreferrer">
                <img src={`./images/${rtImg}`} alt="Rotten Tomatoes" />
                {movie.ratings.rottenTomatoes.score}
                {rtFresh}
              </a>
            </li>
            <li>
              <a href={movie.ratings.imdb.link} target="_blank" rel="noopener noreferrer">
                <img src="./images/icon-IMDb.png" alt="IMDb" />
                {movie.ratings.imdb.score}
                  /10
              </a>
            </li>
            <li>
              <img src="./images/icon-star.png" alt="User Rating" />
                Users: 5/5
            </li>
          </div>
        </div>
        <div className="grid-item" id="watchat">
          <h3>Available to watch here:</h3>
          <div id="streamnav">
            <ul>
              {streamKeys.map(streamName => (
                <li>
                  <a href={streamOptions[streamName]} target="_blank" rel="noopener noreferrer">
                    <img src={`${process.env.PUBLIC_URL}/images/icon-${streamName}.png`} alt="Theaters" />
                  Theaters
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
