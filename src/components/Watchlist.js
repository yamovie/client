/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import '../css/Watchlist.css';

const WatchListMovies = () => {

};

class Watchlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showWatchedMovies: false,
    };

    this.toggleWatchedMovies = this.toggleWatchedMovies.bind(this);
  }

  toggleWatchedMovies(event) {
    if (event.target.id === 'watched-btn') {
      this.setState({ showWatchedMovies: true });
    } else {
      this.setState({ showWatchedMovies: false });
    }
  }

  render() {
    const { showWatchedMovies } = this.state;
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
        <div className="watchlist-filter">
          <button className="white watchlist-filter-btn" type="button" id="watchlist-btn" onClick={this.toggleWatchedMovies}>Watchlist</button>
          <button className="white watchlist-filter-btn" type="button" id="watched-btn" onClick={this.toggleWatchedMovies}>Watched</button>
        </div>
        {
          <div className="watchlist-wrapper">
            {

              showWatchedMovies ?
                watchedMovies.map(movie => (
                  <div className="watchlist-movie">
                    <img src={movie.image} className="img-fluid" alt="movie" />
                    <div className="watchlist-buttons">
                      <button type="button" className="watchlist-btn">- Remove</button>
                      <button type="button" className="watchlist-btn">+ Watched</button>
                    </div>
                  </div>
                ))
                :
                movies.map(movie => (
                  <div className="watchlist-movie">
                    <img src={movie.image} className="img-fluid" alt="movie" />
                    <div className="watchlist-buttons">
                      <button type="button" className="watchlist-btn">- Remove</button>
                      <button type="button" className="watchlist-btn">+ Watched</button>
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
