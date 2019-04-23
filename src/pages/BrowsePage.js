import React from 'react';
import { MovieList } from '../components';
import MovieFeed from '../components/MovieFeed';
import '../css/BrowsePage.css';

const BrowsePage = () => (
  <div>
    {/* <MovieList showGenreFilter results={[{}]} /> */}
    <MovieFeed />
  </div>
);

export default BrowsePage;
