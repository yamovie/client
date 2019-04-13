/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/GenreList.css';
import axios from 'axios';

class GenreList extends Component {
  static propTypes = {
    genres: PropTypes.arrayOf(PropTypes.object).isRequired,
    moviesByGenreKey: PropTypes.func.isRequired,
    checkboxesVisible: PropTypes.bool,
    style: PropTypes.shape({
      display: PropTypes.string,
    }),
    selectedGenres: [],

  };

  static defaultProps = {
    style: 'style',
    checkboxesVisible: false,
    selectedGenres: [],
  };

  constructor(props) {
    super(props);

    this.handleSelectionReset = this.handleSelectionReset.bind(this);
    this.handlePreferencesChange = this.handlePreferencesChange.bind(this);
  }

  handlePreferencesChange(e, reset) {
    this.props.handleFormChange(e, reset);
  }

  // =================== Unticks all checked genreboxes ==============

  handleSelectionReset(e) {
    e.preventDefault();
    e.target.reset();
    this.handlePreferencesChange(e, true);
  }

  // ================== Renders the genre list ==================

  render() {
    const {
      moviesByGenreKey,
      genres,
      style,
      checkboxesVisible,
      showCertifications,
      handlePreferencesChange,
      selectedGenres,
      selectedCertifications,
    } = this.props;
    const certifications = ['PG', 'PG-13', 'R', 'G', 'NC-17'];

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
