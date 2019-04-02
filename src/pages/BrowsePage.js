/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import MovieList from '../components/MovieList';
import Navbar from '../components/Navbar';
import '../css/BrowsePage.css';
import LloydChat from '../components/LloydChat';


class BrowsePage extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <MovieList class="container" />
        <LloydChat />
      </div>
    );
  }
}

export default BrowsePage;
