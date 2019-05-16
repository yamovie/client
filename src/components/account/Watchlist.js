/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../../css/account/Watchlist.css';
import { WatchlistItem } from '..';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';

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
    console.log('did mount');
    const { user } = this.props;
    axios.get(`${REACT_APP_SVR_USERS}/watchlist/${user._id}`)
      .then(res => this.setState({movies: res.data}));
  }

  removeFromWatchlist(e, movieId) {
    const { user } = this.props;
    const { movies } = this.state;
    const newMovies = movies.filter(movie => movie._id !== movieId);
    this.setState({movies: newMovies });
    console.log('removed');

    // axios.delete(`${REACT_APP_SVR_USERS}/watchlist/${user._id}`, {data: { movieId } })
    //   .then(() => {
    //     this.setState({movies: movies.filter(movie => movie._id !== movieId)});
    //   })
    //   .catch(error => {
    //     console.log(`The server responded with error: ${error.response.status}, ${error.response.statusText} `)
    //   });
  }

  render() {
    const { movies } = this.state;

    return (
      <div className="account-pane">
        <h1 className='account-title'>Your Watchlist</h1>
        <TransitionGroup className="watchlist-wrapper" transitionName="item" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
          {movies.length > 1 && (
            movies.map((movie, i) => (
              <WatchlistItem movie={movie} speed={50} multiplier={i} remove={this.removeFromWatchlist} />
            ))
          )}
        </TransitionGroup>
      </div>
    );
  }
}

export default Watchlist;
