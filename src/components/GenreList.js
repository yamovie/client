import React from 'react';
import PropTypes from 'prop-types';
import { moviesAPI } from '../utils';
import '../css/GenreList.css';

// Renders the genre list to the MovieList page. ==================
export default class GenreList extends React.Component {
  static propTypes = {
    style: PropTypes.shape({ display: PropTypes.string }),
    handleSendGenre: PropTypes.func.isRequired,
  };

  static defaultProps = {
    style: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      activeButton: 'all',
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

  handleGenreClick = (genre = { translation: 'all' }) => {
    this.setState({ activeButton: genre.translation });
    const { handleSendGenre } = this.props;
    handleSendGenre(genre._id);
  };

  // ===============================================================

  render() {
    const { style } = this.props;
    const { activeButton, genres } = this.state;

    const activeColor = { backgroundColor: '#88388c' };
    const inactiveColor = { backgroundColor: 'rgba(226, 217, 217, 0.0)' };

    return (
      <div id="list-genres" style={style}>
        <button
          className="single-genre"
          type="button"
          key="all"
          style={activeButton === 'all' ? activeColor : inactiveColor}
          onClick={() => this.handleGenreClick()}
        >
          All
        </button>
        {genres.map(genre => (
          <button
            className="single-genre"
            type="button"
            key={genre.technical_name}
            style={activeButton === genre.translation ? activeColor : inactiveColor}
            onClick={() => this.handleGenreClick(genre)}
          >
            {genre.translation}
          </button>
        ))}
      </div>
    );
  }
}
