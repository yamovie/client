/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import '../css/Watchlist.css';

class Watchlist extends React.Component {
  constructor(props) {
    super(props);
  }

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
        image: 'https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
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
        image: 'https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
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
        image: 'https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
      },
      {
        title: 'Spider Man - Into the spider-verse',
        image: 'https://image.tmdb.org/t/p/original/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
      },
      {
        title: 'Spider Man - Into the spider-verse',
        image: 'https://image.tmdb.org/t/p/original/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
      },
      {
        title: 'Spider Man - Into the spider-verse',
        image: 'https://image.tmdb.org/t/p/original/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
      },
      {
        title: 'Spider Man - Into the spider-verse',
        image: 'https://image.tmdb.org/t/p/original/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
      },
    ];

    const watchedMovies = [
     
      {
        title: 'Bumblebee',
        image: 'https://image.tmdb.org/t/p/original/fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg',
      },
      {
        title: 'Avengers - Infinity War',
        image: 'https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
      },
      {
        title: 'Spider Man - Into the spider-verse',
        image: 'https://image.tmdb.org/t/p/original/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
      },
      {
        title: 'Bumblebee',
        image: 'https://image.tmdb.org/t/p/original/fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg',
      },
      {
        title: 'Avengers - Infinity War',
        image: 'https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
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
        image: 'https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
      },
      {
        title: 'Spider Man - Into the spider-verse',
        image: 'https://image.tmdb.org/t/p/original/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
      },
      {
        title: 'Spider Man - Into the spider-verse',
        image: 'https://image.tmdb.org/t/p/original/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
      },
      {
        title: 'Spider Man - Into the spider-verse',
        image: 'https://image.tmdb.org/t/p/original/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
      },
      {
        title: 'Spider Man - Into the spider-verse',
        image: 'https://image.tmdb.org/t/p/original/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
      },
    ];

    return (
      <div className="account-page">
        {
          <div className="watchlist-wrapper">
            {
              movies.map(movie => (
                <div className="watchlist-movie">
                  <img src={movie.image} className="img-fluid" alt="movie" />
                  <div className="watchlist-buttons">
                    <button type="button" className="watchlist-btn">Remove (-)</button>
                  </div>
                </div>
              ))
            }
          </div>
        }
      </div>
    );
  }
}

export default Watchlist;
