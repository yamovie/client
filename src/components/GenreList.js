import React from 'react';
import PropTypes from 'prop-types';
import '../css/GenreList.css';
import axios from 'axios';

// Renders the genre list to the MovieList page. ==================
class GenreList extends React.Component {
  static propTypes = {
    genres: PropTypes.arrayOf(PropTypes.object).isRequired,
    moviesByGenreId: PropTypes.func.isRequired,
    checkboxesVisible: PropTypes.bool,
    style: PropTypes.shape({
      display: PropTypes.string,
    }),
    showCertifications: PropTypes.bool,
    selectedGenres: PropTypes.arrayOf(PropTypes.string),
    selectedCertifications: PropTypes.arrayOf(PropTypes.string),
    handleFormChange: PropTypes.func
  };

  static defaultProps = {
    style: 'style',
    checkboxesVisible: false,
    selectedGenres: [],
    selectedCertifications: [],
    showCertifications: false,
    handleFormChange: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeButton: '',
    }

    this.handleSelectionReset = this.handleSelectionReset.bind(this);
    this.handlePreferencesChange = this.handlePreferencesChange.bind(this);
  }

  handleActiveButton = genreName => {
    const { active } = this.state;
    if (genreName) {
      this.setState({
        activeButton: genreName,
      });
    } else {
      this.setState({
        activeButton: '',
      });
    }
  }

  handlePreferencesChange(e, reset) {
    const { handleFormChange } = this.props;
    handleFormChange(e, reset);
  }

  // =================== Unticks all checked genreboxes ==============

  handleSelectionReset(e) {
    e.preventDefault();
    e.target.reset();
    this.handlePreferencesChange(e, true);
  }
  
  render() {
    const {
      moviesByGenreId,
      genres,
      style,
      checkboxesVisible,
      showCertifications,
      selectedGenres,
      selectedCertifications,
    } = this.props;
    const { activeButton } = this.state;
    const certifications = ['G', 'PG', 'PG-13', 'R', 'NC-17' ];

    if (showCertifications) {
      return (
        <div>
          <form onSubmit={this.handleSelectionReset} id='certificationsForm'>
            <div id="list-genres">
              {certifications.map((certification, i) => (
                <label className="single-genre checkmark-container" key={i}>
                  <input type="checkbox" name="certification" defaultChecked={selectedCertifications.includes(certification)} value={certification} onChange={this.handlePreferencesChange} />
                  <span className="checkmark" />
                  <span className="single-genre">{certification}</span>
                </label>
              ))}
            </div>
            <button className="reset-button" type="submit">reset</button>
          </form>
        </div>
      );
    }
    if (checkboxesVisible) {
      return (
        <div>
          <form onSubmit={this.handleSelectionReset} id='genrePreferencesForm'>
            <div id="list-genres">
              {genres.map(genre => (
                <label className="single-genre checkmark-container" key={genre._id}>
                  <input type="checkbox" name="genre" value={genre._id} defaultChecked={selectedGenres.includes(genre._id)} onChange={this.handlePreferencesChange} />
                  <span className="checkmark" />
                  <span className="single-genre">{genre.name}</span>
                </label>
              ))}
            </div>
            <button className="reset-button" type="submit">reset</button>
          </form>
        </div>
      );
    }

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

export default GenreList;
