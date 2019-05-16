import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MovieInfoDisplay, TrailerModal } from '..';
// import data from '../../SeedMovies';

export default class MovieFeed extends Component {
  static propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    movies: [],
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
    const { movies } = this.props;
    const { selectedTrailerList } = this.state;
    return (
      <div className="movie-feed">
        <TrailerModal
          trailerList={selectedTrailerList}
          toggleTrailer={this.toggleTrailer}
        />
        {movies.map(movie => (
          <MovieInfoDisplay type="movie-feed-item" movie={movie} key={movie.title} />
        ))}
      </div>
    );
  }
}
