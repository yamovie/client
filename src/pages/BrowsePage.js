/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import MovieList from '../components/MovieList';
import '../css/browse-page.css';


class BrowsePage extends React.Component {

  render() {
    return (
      <div>
        <MovieList class="container" />
      </div>
    );
  }
}

export default BrowsePage;
