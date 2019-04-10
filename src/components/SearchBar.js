import React, { Component } from 'react'
import PropTypes, { array } from 'prop-types'
import GenreList from "./GenreList";

export default class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    searchInputValue: PropTypes.string.isRequired,
    genres: PropTypes.shape(array).isRequired,
    showGenreFilter: PropTypes.bool.isRequired,
    handleSendGenre: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      hover: false,
    }
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
      handleSendGenre
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
        <button type="button" id="display-genre-button" onClick={this.toggleHover}>
              Display Genres
        </button>
        {showGenreFilter ? (
          <GenreList
            genres={genres}
            style={hoverStyle}
            toggleHover={this.toggleHover}
            moviesByGenreKey={handleSendGenre}
          />
        ) : (
          ' '
        )}
      </div>
    )
  }
}
