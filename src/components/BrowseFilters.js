import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenreList from './movie-displays/GenreList';

import '../css/BrowseFilters.css';

export default class BrowseFilters extends Component {
  static propTypes = {
    handleSearchSubmit: PropTypes.func.isRequired,
    handleSendGenre: PropTypes.func.isRequired,
    currentGenreFilter: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      showGenres: false,
      searchInputValue: '',
    };
  }

  // ===============================================================
  // Handlers

  /**
   * Handles submission of a search query. Prevents page refresh, calls the BrowsePage
   * submit function with the current search text, and then clears the text field.
   * @param {Event} event the form submit event
   */
  handleSearchSubmit = event => {
    event.preventDefault();
    const { handleSearchSubmit } = this.props;
    const { searchInputValue } = this.state;
    handleSearchSubmit(searchInputValue);
    this.setState({ searchInputValue: '' });
  };

  /**
   * Handles the change of the input text
   * @param {Event} event the form change event
   */
  handleChange = event => {
    this.setState({ searchInputValue: event.target.value });
  };

  /**
   * Toggles whether the genre selector is visible or not
   */
  toggleShowGenres = () => {
    this.setState(prevState => ({ showGenres: !prevState.showGenres }));
  };

  // ===============================================================
  // Render

  render() {
    const { handleSendGenre, currentGenreFilter } = this.props;
    const { showGenres, searchInputValue } = this.state;

    return (
      <div id="mega-search-genres">
        <form id="browse-search" onSubmit={this.handleSearchSubmit}>
          <input
            type="text"
            value={searchInputValue}
            onChange={this.handleChange}
            placeholder="Search Movies"
          />
        </form>
        <button
          type="button"
          id="display-genre-button"
          onClick={this.toggleShowGenres}
        >
          Display Genres
        </button>
        <GenreList
          handleSendGenre={handleSendGenre}
          activeGenre={currentGenreFilter}
          style={{ display: showGenres ? 'flex' : 'none' }}
        />
      </div>
    );
  }
}
