/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import '../css/Watchlist.css';
import axios from 'axios';

const { REACT_APP_SVR } = process.env;

class Watchlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [{images: { poster: "yo"}}],
      movieDeleted: false,
    }
    this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    axios.post(`${REACT_APP_SVR}/users/watchlist/movies`, {userId: user._id})
      .then(res => this.setState({movies: res.data}));
    // .then(res => console.log(res.data));
  }

  componentDidUpdate() {
    console.log('.....Component did update')
    const { user } = this.props;
    if (this.state.movieDeleted) {
      axios.post(`${REACT_APP_SVR}/users/watchlist/movies`, {userId: user._id})
        // .then(res => this.setState({movies: res.data, movieDeleted: false}));
        .then(res => console.log(res.data));

    }
  }

  async removeFromWatchlist(movieId) {
    const { user } = this.props;
    await axios.delete(`${REACT_APP_SVR}/users/watchlist/movies`, { data: {movieId, userId: user._id}})
    this.setState({movieDeleted: true});
  }

  render() {
    const { movies } = this.state;

    return (
      <div className="account-page">
        <h1 className='account-title'>Your Watchlist</h1>
        {
          <div className="watchlist-wrapper">
            {
              movies.map(movie => (
                <div className="watchlist-movie">
                  <img src={movie.images.poster} className="img-fluid" alt="movie" />
                  <div className="watchlist-buttons">
                    <button type="button" className="watchlist-btn" onClick={() => this.removeFromWatchlist(movie._id)}>Remove (-)</button>
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
