import React from 'react';
import PropTypes from 'prop-types';
import '../css/GenreList.css';

// Renders the genre list to the MovieList page. ==================
const GenreList = ({ moviesByGenreId, style, genres }) => (
  <div id="list-genres" style={style}>
    <button className="single-genre" type="button" onClick={() => moviesByGenreId('all')}>
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

GenreList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  moviesByGenreId: PropTypes.func.isRequired,
  style: PropTypes.shape({
    display: PropTypes.string,
  }),
};

GenreList.defaultProps = {
  style: 'style',
};

export default GenreList;
