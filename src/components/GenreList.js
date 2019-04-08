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
  };

  static defaultProps = {
    style: 'style',
    checkboxesVisible: false,
  };

  constructor(props) {
    super(props);

    // this.state = {
    //   checkboxesVisible: false,
    //   genres: [],
    // };
    this.handleSelectionReset = this.handleSelectionReset.bind(this);
  }

  // =================== Unticks all checked genreboxes ==============

  handleSelectionReset(e) {
    e.target.reset();
    e.preventDefault();
  }

  // ================== Renders the genre list ==================

  render() {
    const { moviesByGenreKey, genres, style, checkboxesVisible } = this.props;
    if (!checkboxesVisible) {
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

    
    return (
      <div>
        <form onSubmit={this.handleSelectionReset}>
          <div id="list-genres">
            {genres.map((genre) => (
              <label className="single-genre checkmark-container" key={genre.id}>
                <input type="checkbox" />
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
}

export default GenreList;
