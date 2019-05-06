import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenreList from './GenreList';

import '../../css/SearchBar.css';

export default class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    searchInputValue: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        short_name: PropTypes.string,
        technical_name: PropTypes.string,
        translation: PropTypes.string,
      }),
    ).isRequired,
    showGenreFilter: PropTypes.bool.isRequired,
    handleSendGenre: PropTypes.func.isRequired,
  };

  static defaultProps = {
    searchInputValue: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      intervalId: 0,
    };
  }

  toggleHover = () => {
    const { hover } = this.state;
    this.setState({
      hover: !hover,
    });
  };

  render() {
    const {
      onSubmit,
      onChange,
      genres,
      searchInputValue,
      showGenreFilter,
      handleSendGenre,
    } = this.props;

    // On hover function to display genre list through mega menu
    let hoverStyle;
    const { hover } = this.state;
    if (hover) {
      hoverStyle = { display: 'flex' };
    } else {
      hoverStyle = { display: 'none' };
    }

    return (
      <div id="mega-search-genres">
        <form id="browse-search" onSubmit={onSubmit}>
          <input
            type="text"
            value={searchInputValue}
            onChange={onChange}
            placeholder="Search Movies"
          />
        </form>
        <button
          type="button"
          id="display-genre-button"
          onClick={this.toggleHover}
        >
          Display Genres
        </button>
        {showGenreFilter ? (
          <GenreList
            genres={genres}
            style={hoverStyle}
            toggleHover={this.toggleHover}
            moviesByGenreId={handleSendGenre}
          />
        ) : (
          ' '
        )}
      </div>
    );
  }
}
