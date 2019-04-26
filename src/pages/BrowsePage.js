import React from 'react';
import { MovieList } from '../components';
import MovieFeedSimple from '../components/MovieFeedSimple';
import '../css/BrowsePage.css';

const BrowsePage = () => (
  <div>
    {/* <MovieList showGenreFilter results={[{}]} /> */}
    <MovieFeedSimple />
  </div>
);

export default BrowsePage;
