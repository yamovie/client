import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MovieInfoDisplay, MovieFeedItem, TrailerModal } from '..';
import data from '../../SeedMovies';

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
        {/* {data.map(movie => (
          <MovieFeedItem
            movie={movie}
            toggleTrailer={this.toggleTrailer}
            key={movie.title}
          />
        ))} */}
        {data.map(movie => (
          <MovieInfoDisplay type="movie-feed-item" movie={movie} key={movie.title} />
        ))}
      </div>
    );
  }
}
