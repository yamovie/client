import React from 'react';
import PropTypes from 'prop-types';
import '../css/Watchlist.css';
import axios from 'axios';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '../utils/fontAwesome';

const { REACT_APP_SVR } = process.env;

class Watchlist extends React.Component {
  static propTypes = {
    user: PropTypes.shape(Object).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      movies: [{images: { poster: ""}}],
    }
  }

  componentDidMount() {
    const { user } = this.props;
    axios.post(`${REACT_APP_SVR}/users/watchlist/movies`, {userId: user._id})
      .then(res => this.setState({movies: res.data}));
  }

  removeFromWatchlist(movieId) {
    const { user } = this.props;
    const { movies } = this.state;
    axios.delete(`${REACT_APP_SVR}/users/watchlist/movies`, { data: {movieId, userId: user._id}})
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
            {
              movies.map(movie => (
                <div className="watchlist-movie">
                  <img src={movie.images.poster} className="img-fluid" alt="movie" />
                  <button type="button" className="watchlist-remove-btn" onClick={() => this.removeFromWatchlist(movie._id)}>
                    <FontAwesomeIcon icon={faMinusCircle} /> Remove
                  </button>
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
