import React, { Component } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class GenreList extends Component {
  static propTypes = {
    genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  // Renders the genre list to the MovieList page. ==================

  render() {
    // const { genres } = this.state;
    const { moviesByGenreKey, genres } = this.props;
    return (
      <div id="list-genres">
        <button
          className="single-genre"
          type="button"
          onClick={() => moviesByGenreKey('all')}
        >
          All
        </button>
        {genres.map(genre => (
          <button
            className="single-genre"
            type="button"
            key={genre.name}
            onClick={() => moviesByGenreKey(genre._id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    );
  }
}

export default GenreList;
