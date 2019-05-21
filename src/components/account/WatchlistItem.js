import React from 'react';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '../../utils/fontAwesome';

export default class WatchlistItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      render: false,
      set: false,
    }
  }

  componentDidMount() {
    const { speed, multiplier } = this.props;
    setTimeout(() => {
      this.setState({render: true})
    }, speed * multiplier)
  }
  
  render() {
    const { movie, remove, toggleModal} = this.props;
    const { render } = this.state;
    const style = {
      WebkitAnimation: 'fadeIn 2s',
      animation: 'fadeIn 2s',
    }

    return  (
      render && (
        <CSSTransition
        // in={showMessage}
          // timeout={300}
          classNames="collapse-left"
          // unmountOnExit
          // onEnter={() => setShowButton(false)}
          onExited={(e) => remove(e, movie.id)}
        >
          <div className="watchlist-movie" style={style}>
            <img src={movie.images.poster} className="img-fluid" alt="movie" onClick={() => toggleModal(movie._id)} tabIndex={0} />
            <button type="button" className="watchlist-remove-btn" onClick={(e) => remove(e, movie._id)}>
              <FontAwesomeIcon icon={faMinusCircle} /> Remove
            </button>
          </div>
        </CSSTransition>
      )
    )
    
  }
}