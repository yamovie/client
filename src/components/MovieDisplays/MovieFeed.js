import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MovieFeedItem, TrailerModal } from '..';
// import data from '../SeedMovies';

export default class MovieFeed extends Component {
  static propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedTrailerList: [],
      trailerVisible: false,
    };
  }

  toggleTrailer = selectedTrailerList => {
    const { trailerVisible } = this.state;
    if (trailerVisible) {
      this.setState({ trailerVisible: false, selectedTrailerList: [] });
    } else {
      this.setState({ trailerVisible: true, selectedTrailerList });
    }
  };

  render() {
    let { movies } = this.props;
    movies = movies || [];
    const { selectedTrailerList } = this.state;
    return (
      <div className="movie-feed">
        <TrailerModal
          trailerList={selectedTrailerList}
          toggleTrailer={this.toggleTrailer}
        />
        {movies.map(movie => (
          <MovieFeedItem
            movie={movie}
            toggleTrailer={this.toggleTrailer}
            key={movie.title}
          />
        ))}
      </div>
    );
  }
}
