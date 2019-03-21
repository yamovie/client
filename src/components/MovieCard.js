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
    // console.log(movie);
  }

  /**
   * Renders the movie card in HTML on the page. Uses CSS grid to display information
   * in three segments: trailer, descriptive info, and stream links.
   */
  render() {
    const { movie, loading } = this.state;
    const { toggleHidden } = this.props;
    if (loading === true) {
      return <div>Loading...</div>;
    }

    // return <div>Hello</div>;
    // Streaming availability is currently not a property on the movie object..
    // const streamOptions = movie.details.streams;
    const streamOptions = {
      netflix: 'https://www.netflix.com',
      hulu: 'https://www.hulu.com',
      theaters: 'https://www.fandango.com',
    };
    const streamKeys = Object.keys(streamOptions);
    const genreString = movie.genres;

    console.log(movie);

    const rtImg =
      movie.ratings[1].rating >= '60%'
        ? 'icon-rottentomatoes-fresh.png'
        : 'icon-rottentomatoes-rotten.png';
    const rtFresh = movie.ratings[1].rating >= '60%' ? 'Fresh' : 'Rotten';


    return (
      <div className="yamovie-movie-card">
        <div className="grid-item" id="trailer">
          <iframe
            title="movie trailer"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/V75dMMIW2B4"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="grid-item" id="info">
          <div id="headings">
            <button type="button" className="close-modal" onClick={toggleHidden()}>X</button>
            {/* <h1>{`${movie.title} (${movie.releaseYear})`}</h1> */}
            <h1>{movie.title}</h1>

            <h3>{genreString}</h3>
            <h6>{`Runtime: ${movie.runtime}`}</h6>
            {/* <h6>{`Rated ${movie.ratings.mpaa}`}</h6> */}
            {/* <h6>{`Rated ${movie.ratings.mpaa}`</h6> */}
          </div>
          <p>
            {movie.plot}
          </p>
          <div id="ratings">
            <li>
              {/* <a href={`${movie.ratings.rottenTomatoes.link}`} target="_blank" rel="noopener noreferrer"> */}
              <img src={`./images/${rtImg}`} alt="Rotten Tomatoes" />
              {/* {movie.ratings[1].rating} */}
              {rtFresh}
              {/* </a> */}
            </li>
            <li>
              {/* <a href={movie.details.ratings[0]} target="_blank" rel="noopener noreferrer"> */}
              <img src="./images/icon-IMDb.png" alt="IMDb" />
              {/* {movie.ratings[0].rating} */}
              {/* </a> */}
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
            {streamKeys.map((streamName, i) => (
              <a href={streamOptions[streamName]} target="_blank" rel="noopener noreferrer" key={i}>
                <img src={`${process.env.PUBLIC_URL}/images/icon-${streamName}.png`} alt="Theaters" />
                <h3 className="stream-name">{streamName}</h3>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
