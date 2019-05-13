import React from 'react';
import PropTypes from 'prop-types';
import { moviesAPI } from '../utils';
import '../css/GenreList.css';

// Renders the genre list to the MovieList page. ==================
export default class GenreList extends React.Component {
  static propTypes = {
    style: PropTypes.shape({ display: PropTypes.string }),
    handleSendGenre: PropTypes.func.isRequired,
    activeGenre: PropTypes.string.isRequired,
  };

  static defaultProps = {
    style: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      genres: [],
    };
  }

  componentDidMount() {
    moviesAPI.getGenres().then(genreResp =>
      this.setState({
        genres: genreResp.data,
      }),
    );
  }

  // ===============================================================

  render() {
    const { style, activeGenre, handleSendGenre } = this.props;
    const { genres } = this.state;

    const activeColor = { backgroundColor: '#88388c' };
    const inactiveColor = { backgroundColor: 'rgba(226, 217, 217, 0.0)' };

    return (
      <div id="list-genres" style={style}>
        <button
          className="single-genre"
          type="button"
          key="all"
          style={activeGenre === 'all' ? activeColor : inactiveColor}
          onClick={() => handleSendGenre('all')}
        >
          All
        </button>
        {genres.map(genre => (
          <button
            className="single-genre"
            type="button"
            key={genre.technical_name}
            style={activeGenre === genre._id ? activeColor : inactiveColor}
            onClick={() => handleSendGenre(genre._id)}
          >
            {genre.translation}
          </button>
        ))}
      </div>
    );
  }
}
