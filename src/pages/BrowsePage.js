import React from 'react';
import { MovieList } from '../components';
import MovieFeedFlip from '../components/MovieFeedFlip';
import '../css/BrowsePage.css';

const BrowsePage = () => (
  <div>
    {/* <MovieList showGenreFilter results={[{}]} /> */}
    <MovieFeedFlip />
  </div>
);

export default BrowsePage;
