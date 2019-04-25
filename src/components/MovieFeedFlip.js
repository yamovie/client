import React, { Component } from 'react';
import MovieFeedItem from './MovieFeedItemFlip';
import data from '../SeedMovies';

export default class MovieFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    this.setState({ movies: data });
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="movie-feed">
        {movies.map(movie => (
          <MovieFeedItem movie={movie} key={movie.title} />
        ))}
      </div>
    );
  }
}
