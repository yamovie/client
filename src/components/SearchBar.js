import React, { Component } from 'react'
import PropTypes, { object } from 'prop-types'
import GenreList from "./GenreList";

import '../css/SearchBar.css';

export default class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    searchInputValue: PropTypes.string,
    genres: PropTypes.shape(object).isRequired,
    showGenreFilter: PropTypes.bool.isRequired,
    handleSendGenre: PropTypes.func.isRequired,
  }

  static defaultProps = {
    searchInputValue: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      intervalId: 0,
    }
  }

  // scrollStep= () => {
  //   if (window.pageYOffset === 0) {
  //     clearInterval(this.state.intervalId);
  //   }
  //   window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  // }
  
  // scrollToTop = () => {
  //   const intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
  //   this.setState({ intervalId });
  // }

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
          {/* <form id="browse-search" onSubmit={() => { onSubmit(); this.scrollToTop();}}> */}
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
            moviesByGenreId={handleSendGenre}
          />
        ) : (
          ' '
        )}
      </div>
    )
  }
}
