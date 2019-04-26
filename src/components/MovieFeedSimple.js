import React, { Component } from 'react';
import MovieFeedItem from './MovieFeedItem';
import TrailerModal from './TrailerModal';
import data from '../SeedMovies';

export default class MovieFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      selectedTrailerList: [],
      trailerVisible: false,
    };
  }

  componentDidMount() {
    this.setState({ movies: data });
  }

  toggleTrailer = selectedTrailerList => {
    const { trailerVisible } = this.state;
    if (trailerVisible) {
      this.setState({ trailerVisible: false, selectedTrailerList: [] });
    } else {
      this.setState({ trailerVisible: true, selectedTrailerList });
    }
    // this.setState(prevState => ({
    //   trailerVisible: !prevState.trailerVisible,
    //   selectedTrailerList,
    // }));
  };

  render() {
    const { movies, selectedTrailerList } = this.state;
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
