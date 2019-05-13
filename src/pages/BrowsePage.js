import React from 'react';
import { MovieList } from '../components';
import '../css/css-pages/BrowsePage.css';

const BrowsePage = () => (
  <div>
    <MovieList showGenreFilter results={[{}]} />
  </div>
);

export default BrowsePage;
