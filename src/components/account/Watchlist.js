/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../../css/account/Watchlist.css';
import { WatchlistItem } from '..';
// import { watch } from 'fs';

const { REACT_APP_SVR_USERS } = process.env;

class Watchlist extends React.Component {
  static propTypes = {
    user: PropTypes.shape(Object).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    }
    this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    axios.get(`${REACT_APP_SVR_USERS}/watchlist/${user._id}`)
      .then(res => this.setState({movies: res.data}));
  }

  removeFromWatchlist(e, movieId) {
    const { user } = this.props;
    const { movies } = this.state;
    axios.delete(`${REACT_APP_SVR_USERS}/watchlist/${user._id}`, {data: { movieId } })
      .then(() => {
        this.setState({movies: movies.filter(movie => movie._id !== movieId)});
      })
      .catch(error => {
        console.log(`The server responded with error: ${error.response.status}, ${error.response.statusText} `)
      });
  }

  render() {
    const { movies } = this.state;

    return (
      <div className="account-pane">
        <h1 className='account-title'>Your Watchlist</h1>
        {
          <div className="watchlist-wrapper">
            {movies.length > 0 ?
              movies.map((movie, i) => (
                <WatchlistItem movie={movie} speed={50} multiplier={i} remove={this.removeFromWatchlist} />
              ))
              :
              <p className="watchlist-message">Add movies to your watchlist to display them here</p>
            }
          </div>
        }
      </div>
    );
  }
}

export default Watchlist;
