/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/GenreList.css';

class GenreList extends Component {
  static propTypes = {
    genres: PropTypes.arrayOf(PropTypes.object).isRequired,
    moviesByGenreId: PropTypes.func.isRequired,
    style: PropTypes.shape({
      display: PropTypes.string,
    }),
  };

  static defaultProps = {
    style: 'style',
  };

  // Renders the genre list to the MovieList page. ==================

  render() {
    const { moviesByGenreId, style, genres } = this.props;
    return (
      <div id="list-genres" style={style}>
        <button
          className="single-genre"
          type="button"
          onClick={() => moviesByGenreId('all')}
        >
          All
        </button>
        {genres.map(genre => (
          <button
            className="single-genre"
            type="button"
            key={genre.name}
            onClick={() => moviesByGenreId(genre._id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    );
  }
}

export default GenreList;
