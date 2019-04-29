import React from 'react';
import PropTypes from 'prop-types';
import '../css/GenreList.css';
import axios from 'axios';

// Renders the genre list to the MovieList page. ==================
class GenreList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeButton: '',
    };
  }

  handleActiveButton = genreName => {
    if (genreName) {
      this.setState({
        activeButton: genreName,
      });
    } else {
      this.setState({
        activeButton: '',
      });
    }
  };

  render() {
    const { moviesByGenreId, style, genres } = this.props;
    const { activeButton } = this.state;
    return (
      <div id="list-genres" style={style}>
        <button className="single-genre" type="button" onClick={() => moviesByGenreId('all')}>
          All
        </button>
        {genres.map(genre => (
          <button
            className="single-genre"
            type="button"
            key={genre.name}
            style={activeButton === genre.name ? { backgroundColor: '#88388c' } : { backgroundColor: 'rgba(226, 217, 217, 0.0)'} }
            onClick={() => { moviesByGenreId(genre._id); this.handleActiveButton(genre.name); } }
          >
            {genre.name}
          </button>
        ))}
      </div>
    );
  }
}

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
