/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import MovieList from '../components/MovieList';
// import SearchBar from '../components/SearchBar';
import '../css/BrowsePage.css';

class BrowsePage extends React.Component {

  render() {
    // const { genres, showGenreFilter, handleSendGenre, handleSubmit, handleChange } = this.props;
    return (
      <div>
        <MovieList class="container" />
      </div>
    );
  }
}

export default BrowsePage;
