/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import MovieList from './MovieList';

const WatchListMovies = () => {

};

class Watchlist extends React.Component {
  render() {
    const movies = [
      {
        title: 'The Mule',
        image: 'https://image.tmdb.org/t/p/original/oeZh7yEz3PMnZLgBPhrafFHRbVz.jpg',
      },
      {
        title: 'Bumblebee',
        image: 'https://image.tmdb.org/t/p/original/fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg',
      },
      {
        title: 'Avengers - Infinity War',
        imageL: 'https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
      },
      {
        title: 'Spider Man - Into the spider-verse',
        image: 'https://image.tmdb.org/t/p/original/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
      },
      {
        title: 'The Mule',
        image: 'https://image.tmdb.org/t/p/original/oeZh7yEz3PMnZLgBPhrafFHRbVz.jpg',
      },
      {
        title: 'Bumblebee',
        image: 'https://image.tmdb.org/t/p/original/fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg',
      },
      {
        title: 'Avengers - Infinity War',
        imageL: 'https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
      },
      {
        title: 'Spider Man - Into the spider-verse',
        image: 'https://image.tmdb.org/t/p/original/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
      },
      {
        title: 'The Mule',
        image: 'https://image.tmdb.org/t/p/original/oeZh7yEz3PMnZLgBPhrafFHRbVz.jpg',
      },
      {
        title: 'Bumblebee',
        image: 'https://image.tmdb.org/t/p/original/fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg',
      },
      {
        title: 'Avengers - Infinity War',
        imageL: 'https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
      },
      {
        title: 'Spider Man - Into the spider-verse',
        image: 'https://image.tmdb.org/t/p/original/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
      },
    ];

    return (
      <div className="account-page">
        <h1 className="white">Watchlist</h1>

      </div>
    );
  }
}

export default Watchlist;
