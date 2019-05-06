import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenreList from './GenreList';

import '../css/SearchBar.css';

export default class SearchBar extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleSendGenre: PropTypes.func.isRequired,
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

  handleSearchSubmit = event => {
    event.preventDefault();
    const { handleSubmit } = this.props;
    const { searchInputValue } = this.state;
    handleSubmit(searchInputValue);
    this.setState({ searchInputValue: '' });
  };

  handleChange = event => {
    this.setState({ searchInputValue: event.target.value });
  };

  toggleShowGenres = () => {
    this.setState(prevState => ({ showGenres: !prevState.showGenres }));
  };

  // ===============================================================
  // Render

  render() {
    const { handleSendGenre } = this.props;
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
        <button type="button" id="display-genre-button" onClick={this.toggleShowGenres}>
          Display Genres
        </button>
        <GenreList
          handleSendGenre={handleSendGenre}
          style={{ display: showGenres ? 'flex' : 'none' }}
        />
      </div>
    );
  }
}
