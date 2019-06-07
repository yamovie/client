import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring/renderprops';
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
          <Spring
            config={{mass: 50, tension: 280, friction: 120}}
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => <MovieInfoDisplay style={props} type="movie-feed-item" movie={movie} key={movie.title} />}
          </Spring>
        ))}
      </div>
    );
  }
}
