import React from 'react';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '../../utils/fontAwesome';

export default class WatchlistItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMovie: false,
      runRemoveAnimation: false,
    }
  }

  componentDidMount() {
    const { speed, multiplier } = this.props;
    setTimeout(() => {
      this.setState({showMovie: true})
    }, speed * multiplier)
  }

  runRemoveAnimation() {

    this.setState({runRemoveAnimation: true})
  }
  
  render() {
    const { movie, remove } = this.props;
    const { showMovie, runRemoveAnimation } = this.state;
    const style = {
      WebkitAnimation: 'fadeIn 2s',
      animation: 'fadeIn 2s',
    }

    if (!showMovie) {
      return <div />
    }
    
    return  (
      // <CSSTransition
      //   timeout={500}
      //   classNames="item"
      // >
      <div className="watchlist-movie" style={style}>
        <img src={movie.images.poster} className="img-fluid" alt="movie" />
        <button type="button" className="watchlist-remove-btn" onClick={(e) => remove(e, movie._id)}>
          <FontAwesomeIcon icon={faMinusCircle} /> Remove
        </button>
      </div>
      // </CSSTransition>
    );
  }
}