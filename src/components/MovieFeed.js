import React, { Component } from 'react';
import MovieFeedItem from './MovieFeedItem';
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
      <div style={{ marginTop: '80px' }}>
        {movies.map(movie => (
          <MovieFeedItem movie={movie} key={movie.title} />
        ))}
      </div>
    );
  }
}
