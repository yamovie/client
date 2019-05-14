import React from 'react';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '../../utils/fontAwesome';

export default class WatchlistItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      render: false,
    }
  }

  componentDidMount() {
    const { speed, multiplier } = this.props;
    setTimeout(() => {
      this.setState({render: true})
    }, speed * multiplier)
  }
  

  render() {
    const { movie, remove } = this.props;
    const { render } = this.state;
    const style = {
      WebkitAnimation: 'fadeIn 2s',
      animation: 'fadeIn 2s',
    }

    return  (
      render && (
        <div className="watchlist-movie" style={style}>
          <img src={movie.images.poster} className="img-fluid" alt="movie" />
          <button type="button" className="watchlist-remove-btn" onClick={() => remove(movie._id)}>
            <FontAwesomeIcon icon={faMinusCircle} /> Remove
          </button>
        </div>
      )
    )
    
  }
}